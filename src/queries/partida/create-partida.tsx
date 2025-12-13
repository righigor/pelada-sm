import { db } from "@/firebase/config";
import type { JogadorUpdate } from "@/types/partida/CreatePartida";
import type { PartidaKey, PartidaPayload } from "@/types/PartidaStore";
import { getAllGols } from "@/utils/get-all-gols";
import { getDestaque } from "@/utils/get-destaque";
import { getMvps } from "@/utils/get-mvp";
import getTotalJogadores from "@/utils/get-total-jogadores";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  increment,
} from "firebase/firestore";

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

  const artilheiro = getDestaque(data.timeEstatisticas, "gols");
  const maiorAssistente = getDestaque(data.timeEstatisticas, "assistencias");
  const bagre = getDestaque(data.timeEstatisticas, "golContra");
  const golsTotais = getAllGols(data.timeEstatisticas);
  const jogadoresTotais = getTotalJogadores(data.timeEstatisticas);
  const { mvpGeral, mvpPorTime } = getMvps(data.timeEstatisticas);
  const resumoPartida = {
    artilheiro,
    maiorAssistente,
    bagre,
    golsTotais,
    jogadoresTotais,
    mvpGeral,
    mvpPorTime,
  };

  const newPartidaRef = await addDoc(partidasRef, {
    dataPartida: data.date,
    local: "Colégio Santa Maria - Nova Suíça",
    timesEstatisticas: data.timeEstatisticas,
    resumoPartida,
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
