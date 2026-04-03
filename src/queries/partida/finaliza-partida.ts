/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/firebase/config";
import {
  doc,
  writeBatch,
  increment,
  serverTimestamp,
} from "firebase/firestore";
import { getDestaque } from "@/utils/get-destaque";
import { getMvps } from "@/utils/get-mvp";
import { getAllGols } from "@/utils/get-all-gols";
import getTotalJogadores from "@/utils/get-total-jogadores";
import type { PartidaByIDResponseType } from "@/types/partida/PartidaById";
import { PARTIDA_STATUS } from "@/utils/constants";
import type { PartidaKey } from "@/types/PartidaStore";

export async function finalizePartida(partida: PartidaByIDResponseType) {
  const batch = writeBatch(db);
  const dateObj =
    typeof partida.dataPartida.toDate === "function"
      ? partida.dataPartida.toDate()
      : new Date(partida.dataPartida.seconds * 1000);

  const anoDaPartida = dateObj.getFullYear().toString();

  const { timesEstatisticas, id: partidaId } = partida;

  const artilheiro = getDestaque(timesEstatisticas, "gols");
  const maiorAssistente = getDestaque(timesEstatisticas, "assistencias");
  const bagre = getDestaque(timesEstatisticas, "golsContra");
  const paredao = getDestaque(timesEstatisticas, "dd");
  const golsTotais = getAllGols(timesEstatisticas);
  const jogadoresTotais = getTotalJogadores(timesEstatisticas);
  const { mvpGeral, mvpPorTime } = getMvps(timesEstatisticas);

  const resumoPartida = {
    artilheiro,
    maiorAssistente,
    bagre,
    paredao,
    golsTotais,
    jogadoresTotais,
    mvpGeral,
    mvpPorTime,
  };

  const partidaRef = doc(db, "partidas", partidaId);
  batch.update(partidaRef, {
    resumoPartida,
    status: PARTIDA_STATUS.FINALIZADO,
    updatedAt: serverTimestamp(),
  });

  Object.entries(timesEstatisticas).forEach(([timeKey, timeData]) => {
    const jogadoresNoTime = Object.keys(timeData.jogadores);

    jogadoresNoTime.forEach((jogadorId) => {
      const statsPartida = timeData.jogadores[jogadorId];
      const jogadorRef = doc(db, "jogadores", jogadorId);

      const eMvpGeral = mvpGeral?.jogadorId === jogadorId;
      const eMvpDoTime =
        mvpPorTime[timeKey as PartidaKey]?.jogadorId === jogadorId;

      const updates: Record<string, any> = {
        "stats.gols": increment(statsPartida.gols || 0),
        "stats.assistencias": increment(statsPartida.assistencias || 0),
        "stats.golsContra": increment(statsPartida.golsContra || 0),
        "stats.defesasDificeis": increment(statsPartida.dd || 0),
        "stats.partidas": increment(1),
        "stats.mvpsGeral": increment(eMvpGeral ? 1 : 0),
        "stats.mvpsPorTime": increment(eMvpDoTime ? 1 : 0),

        [`stats.times.${timeKey}`]: increment(1),

        [`stats.temporadas.${anoDaPartida}.gols`]: increment(
          statsPartida.gols || 0
        ),
        [`stats.temporadas.${anoDaPartida}.assistencias`]: increment(
          statsPartida.assistencias || 0
        ),
        [`stats.temporadas.${anoDaPartida}.golsContra`]: increment(
          statsPartida.golsContra || 0
        ),
        [`stats.temporadas.${anoDaPartida}.defesasDificeis`]: increment(
          statsPartida.dd || 0
        ),
        [`stats.temporadas.${anoDaPartida}.partidas`]: increment(1),
        [`stats.temporadas.${anoDaPartida}.times.${timeKey}`]: increment(1),
        [`stats.temporadas.${anoDaPartida}.mvpsGeral`]: increment(eMvpGeral ? 1 : 0),
        [`stats.temporadas.${anoDaPartida}.mvpsPorTime`]: increment(eMvpDoTime ? 1 : 0),

        updatedAt: serverTimestamp(),
      };

      const companheirosIds = jogadoresNoTime.filter((id) => id !== jogadorId);

      companheirosIds.forEach((compId) => {
        updates[`stats.companheiros.${compId}`] = increment(1);
        updates[`stats.temporadas.${anoDaPartida}.companheiros.${compId}`] =
          increment(1);
      });

      batch.update(jogadorRef, updates);
    });
  });

  await batch.commit();
}
