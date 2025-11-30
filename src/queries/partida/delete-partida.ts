import { db } from "@/firebase/config";
import { doc, increment, runTransaction } from "firebase/firestore";
import type { EstatisticaPartida } from "@/types/Partida";

export async function deletePartidaAndRollbackStats(
  partidaId: string
): Promise<void> {
  await runTransaction(db, async (transaction) => {
    const partidaRef = doc(db, "partidas", partidaId);

    const partidaSnap = await transaction.get(partidaRef);

    if (!partidaSnap.exists()) {
      throw new Error("Partida não encontrada para o ID fornecido.");
    }

    const partidaData = partidaSnap.data() as {
      jogadoresEstatisticas: { [jogadorId: string]: EstatisticaPartida };
    };

    const statsToRevert = partidaData.jogadoresEstatisticas;

    for (const [jogadorId, stats] of Object.entries(statsToRevert)) {
      const jogadorRef = doc(db, "jogadores", jogadorId);

      transaction.update(jogadorRef, {
        gols: increment(-stats.gols),
        assistencias: increment(-stats.assistencias),
        golContra: increment(-stats.golContra),
      });
    }
    transaction.delete(partidaRef);
  });
}
