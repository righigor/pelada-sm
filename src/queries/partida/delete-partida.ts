/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/firebase/config";
import { doc, increment, writeBatch, getDoc } from "firebase/firestore";

export async function deletePartidaAndRollbackStats(partidaId: string): Promise<void> {
  const batch = writeBatch(db);
  const partidaRef = doc(db, "partidas", partidaId);
  const partidaSnap = await getDoc(partidaRef);

  if (!partidaSnap.exists()) {
    throw new Error("Partida não encontrada.");
  }

  const partidaData = partidaSnap.data();
  const dataPartida = partidaData.dataPartida; 
  const anoPartida = new Date(dataPartida).getFullYear().toString();
  const timesEstatisticas = partidaData.timesEstatisticas;

  const todosJogadoresIds: string[] = [];
  const jogadoresInfo: Record<string, { time: string; gols: number; assistencias: number; golsContra: number; defesasDificeis: number; mvpGeral: boolean; mvpTime: boolean }> = {};

  for (const [timeKey, info] of Object.entries(timesEstatisticas)) {
    const timeStats = info as any;
    for (const [jogId, s] of Object.entries(timeStats.jogadores)) {
      const stats = s as any;
      todosJogadoresIds.push(jogId);
      jogadoresInfo[jogId] = {
        time: timeKey,
        gols: stats.gols || 0,
        assistencias: stats.assistencias || 0,
        golsContra: stats.golsContra || 0,
        defesasDificeis: stats.defesasDificeis || 0,
        mvpGeral: partidaData.mvpGeral === jogId,
        mvpTime: timeStats.mvpTime === jogId
      };
    }
  }

  for (const jogadorId of todosJogadoresIds) {
    const info = jogadoresInfo[jogadorId];
    const jogadorRef = doc(db, "jogadores", jogadorId);

    const companheirosIds = todosJogadoresIds.filter(id => 
      id !== jogadorId && jogadoresInfo[id].time === info.time
    );

    const updates: any = {};

    updates[`stats.gols`] = increment(-info.gols);
    updates[`stats.assistencias`] = increment(-info.assistencias);
    updates[`stats.golsContra`] = increment(-info.golsContra);
    updates[`stats.defesasDificeis`] = increment(-info.defesasDificeis);
    updates[`stats.partidas`] = increment(-1);
    updates[`stats.mvpsGeral`] = increment(info.mvpGeral ? -1 : 0);
    updates[`stats.mvpsPorTime`] = increment(info.mvpTime ? -1 : 0);
    updates[`stats.times.${info.time}`] = increment(-1);

    for (const compId of companheirosIds) {
      updates[`stats.companheiros.${compId}`] = increment(-1);
    }

    const pathTemp = `stats.temporadas.${anoPartida}`;
    updates[`${pathTemp}.gols`] = increment(-info.gols);
    updates[`${pathTemp}.assistencias`] = increment(-info.assistencias);
    updates[`${pathTemp}.golsContra`] = increment(-info.golsContra);
    updates[`${pathTemp}.defesasDificeis`] = increment(-info.defesasDificeis);
    updates[`${pathTemp}.partidas`] = increment(-1);
    updates[`${pathTemp}.mvpsGeral`] = increment(info.mvpGeral ? -1 : 0);
    updates[`${pathTemp}.mvpsPorTime`] = increment(info.mvpTime ? -1 : 0);
    updates[`${pathTemp}.times.${info.time}`] = increment(-1);

    for (const compId of companheirosIds) {
      updates[`${pathTemp}.companheiros.${compId}`] = increment(-1);
    }

    batch.update(jogadorRef, updates);
  }

  batch.delete(partidaRef);

  await batch.commit();
}