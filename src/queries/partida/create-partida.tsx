import { db } from "@/firebase/config";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  increment,
} from "firebase/firestore";

interface EstatisticaPartida {
  gols: number;
  assistencias: number;
  golContra: number;
}

export interface PartidaData {
  date: Date;
  jogadoresEstatisticas: { [jogadorId: string]: EstatisticaPartida };
}

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
      }) as Promise<void>
    );
  }

  await Promise.all(jogadorPromises);

  return newPartidaRef.id;
}
