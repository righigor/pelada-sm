import { db } from "@/firebase/config";
import { doc, increment, runTransaction } from "firebase/firestore";
import type { EstatisticasInputStore, PartidaKey } from "@/types/PartidaStore";
import type { JogadorUpdate } from "@/types/partida/CreatePartida";

interface PartidaDataRollback {
  timesEstatisticas: EstatisticasInputStore
}

export async function deletePartidaAndRollbackStats(
  partidaId: string
): Promise<void> {
  await runTransaction(db, async (transaction) => {
    const partidaRef = doc(db, "partidas", partidaId);

    const partidaSnap = await transaction.get(partidaRef);

    if (!partidaSnap.exists()) {
      throw new Error("Partida não encontrada para o ID fornecido.");
    }

    const partidaData = partidaSnap.data() as PartidaDataRollback;

    const estatisticasPartida = partidaData.timesEstatisticas;

    const jogadorGrupoMap: Record<string, PartidaKey> = {};
    const grupoJogadoresMap: Record<PartidaKey, string[]> = {
        azul: [], preto: [], branco: [], vermelho: [], goleiros: [],
    } as Record<PartidaKey, string[]>;

    for (const groupKey in estatisticasPartida) {
        const key = groupKey as PartidaKey;
        const grupoStats = estatisticasPartida[key];

        for (const jogadorId of Object.keys(grupoStats.jogadores)) {
            jogadorGrupoMap[jogadorId] = key;
            grupoJogadoresMap[key].push(jogadorId);
        }
    }

    for (const [jogadorId, grupoKey] of Object.entries(jogadorGrupoMap)) {
      const grupoStats = estatisticasPartida[grupoKey];
      const stats = grupoStats.jogadores[jogadorId];
      const jogadorRef = doc(db, "jogadores", jogadorId);

      const updates: JogadorUpdate = {
        gols: increment(-stats.gols),
        assistencias: increment(-stats.assistencias),
        golContra: increment(-stats.golContra),
        partidas: increment(-1),

        [`times.${grupoKey}`]: increment(-1),
      };

      const companheirosIds = grupoJogadoresMap[grupoKey].filter(
        (id) => id !== jogadorId
      );

      for (const companheiroId of companheirosIds) {
        updates[`companheiros.${companheiroId}`] = increment(-1);
      }
      transaction.update(jogadorRef, updates);
    }
    transaction.delete(partidaRef);
  });
}
