import { db } from "@/firebase/config";
import type { PartidaData } from "@/types/Partida";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  increment,
} from "firebase/firestore";


export async function createNewPartida(data: PartidaData): Promise<string> {
  const partidasRef = collection(db, "partidas");

  const newPartidaRef = await addDoc(partidasRef, {
    dataPartida: data.date,
    local: "Colégio Santa Maria - Nova Suíça",
    jogadoresEstatisticas: data.jogadoresEstatisticas,
  });

  const jogadorPromises: Promise<void>[] = [];

  for (const [jogadorId, stats] of Object.entries(data.jogadoresEstatisticas)) {
    const jogadorRef = doc(db, "jogadores", jogadorId);
    jogadorPromises.push(
      updateDoc(jogadorRef, {
        gols: increment(stats.gols),
        assistencias: increment(stats.assistencias),
        golContra: increment(stats.golContra),
        partidas: increment(1),
      }) as Promise<void>
    );
  }

  await Promise.all(jogadorPromises);

  return newPartidaRef.id;
}
