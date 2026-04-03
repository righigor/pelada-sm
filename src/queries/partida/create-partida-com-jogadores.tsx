import { db } from "@/firebase/config";
import { STEPS } from "@/pages/selecionar-jogadores";
import type {
  CreatePartidaComJogadoresPayload,
  TimesEstatisticasType,
} from "@/types/partida/CreatePartidaComJogadores";
import { LOCAL_SM, PARTIDA_STATUS } from "@/utils/constants";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export async function createPartidaComJogadores(
  data: CreatePartidaComJogadoresPayload
) {
  const resultado: TimesEstatisticasType = {
    timesEstatisticas: {
      azul: { vitorias: 0, jogadores: {} },
      preto: { vitorias: 0, jogadores: {} },
      branco: { vitorias: 0, jogadores: {} },
      vermelho: { vitorias: 0, jogadores: {} },
      goleiros: { vitorias: 0, jogadores: {} },
    },
  };

  STEPS.forEach((time) => {
    const jogadoresNoTime = data[time] || [];

    jogadoresNoTime.forEach((jogador) => {
      if (resultado.timesEstatisticas[time]) {
        resultado.timesEstatisticas[time]!.jogadores[jogador.id] = {
          gols: 0,
          assistencias: 0,
          golsContra: 0,
          dd: 0,
          nome: jogador.nome,
        };
      }
    });
  });

  const documentoPartida = {
    dataPartida: new Date(),
    local: LOCAL_SM,
    status: PARTIDA_STATUS.AGUARDANDO,
    timesEstatisticas: resultado.timesEstatisticas,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const partidaRef = collection(db, "partidas");

  const newPartidaRef = await addDoc(partidaRef, documentoPartida);

  return newPartidaRef.id;
}
