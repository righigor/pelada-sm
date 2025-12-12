import { db } from "@/firebase/config";
import type { PartidaKey, PartidaPayload } from "@/types/PartidaStore";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  increment,
  FieldValue,
} from "firebase/firestore";

interface JogadorUpdate {
  gols?: FieldValue;
  assistencias?: FieldValue;
  golContra?: FieldValue;
  partidas?: FieldValue;
  updatedAt?: Date;
  [key: string]: FieldValue | Date | undefined;
}

export async function createNewPartida(data: PartidaPayload): Promise<string> {
  const partidasRef = collection(db, "partidas");

  const jogadorGrupoMap: Record<string, PartidaKey> = {};
  const grupoJogadoresMap: Record<PartidaKey, string[]> = {
    azul: [],
    preto: [],
    branco: [],
    vermelho: [],
    goleiros: [],
  } as Record<PartidaKey, string[]>;

  for (const groupKey in data.timeEstatisticas) {
    const key = groupKey as PartidaKey;
    const grupoStats = data.timeEstatisticas[key];

    for (const jogadorId of Object.keys(grupoStats.jogadores)) {
      jogadorGrupoMap[jogadorId] = key;
      grupoJogadoresMap[key].push(jogadorId);
    }
  }

  const newPartidaRef = await addDoc(partidasRef, {
    dataPartida: data.date,
    local: "Colégio Santa Maria - Nova Suíça",
    timesEstatisticas: data.timeEstatisticas,
  });

  const jogadorPromises: Promise<void>[] = [];

  for (const [jogadorId, grupoKey] of Object.entries(jogadorGrupoMap)) {
    const stats = data.timeEstatisticas[grupoKey].jogadores[jogadorId];
    const jogadorRef = doc(db, "jogadores", jogadorId);

    const updates: JogadorUpdate = {
      gols: increment(stats.gols),
      assistencias: increment(stats.assistencias),
      golContra: increment(stats.golContra),
      partidas: increment(1),
      updatedAt: new Date(),

      [`times.${grupoKey}`]: increment(1),
    };

    const companheirosIds = grupoJogadoresMap[grupoKey].filter(
      (id) => id !== jogadorId
    );

    for (const companheiroId of companheirosIds) {
      updates[`companheiros.${companheiroId}`] = increment(1);
    }

    jogadorPromises.push(updateDoc(jogadorRef, updates) as Promise<void>);
  }


  await Promise.all(jogadorPromises);

  return newPartidaRef.id;
}
