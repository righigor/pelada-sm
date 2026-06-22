import { db } from "@/firebase/config";
import type { JogadorNewResponseType } from "@/types/jogadores/Jogador";
import type { ResultadoPremio } from "@/types/premiacao/Resultado";
import { collection, getDocs } from "firebase/firestore";

const getChaveTemporadaAtual = (): string => {
  return new Date().getFullYear().toString();
};

export type AlgoritmoPremioAssincronoFn = () => Promise<ResultadoPremio | null>;

export const funcoesPremiacoes: Record<string, AlgoritmoPremioAssincronoFn> = {
  calcularArtilheiro: async () => {
    const jogadoresRef = collection(db, "jogadores");
    const querySnapshot = await getDocs(jogadoresRef);

    if (querySnapshot.empty) return null;

    const temporadaAtual = getChaveTemporadaAtual();
    let lider: JogadorNewResponseType | null = null;
    let maxGols = 0;

    querySnapshot.forEach((doc) => {
      const jogador = { id: doc.id, ...doc.data() } as JogadorNewResponseType;

      const statsAno = jogador.stats?.temporadas?.[temporadaAtual];

      if (statsAno && statsAno.gols > maxGols) {
        maxGols = statsAno.gols;
        lider = jogador;
      }
    });

    if (!lider || maxGols === 0) return null;

    return {
      vencedorId: (lider as JogadorNewResponseType).id,
      vencedorNome: (lider as JogadorNewResponseType).nome,
      vencedorFotoUrl: (lider as JogadorNewResponseType).fotoUrl,
      detalhes: `${maxGols} Gols em ${temporadaAtual}`,
    };
  },

  calcularAssistente: async () => {
    const jogadoresRef = collection(db, "jogadores");
    const querySnapshot = await getDocs(jogadoresRef);

    if (querySnapshot.empty) return null;

    const temporadaAtual = getChaveTemporadaAtual();
    let lider: JogadorNewResponseType | null = null;
    let maxAssistencias = 0;

    querySnapshot.forEach((doc) => {
      const jogador = { id: doc.id, ...doc.data() } as JogadorNewResponseType;
      const statsAno = jogador.stats?.temporadas?.[temporadaAtual];

      if (statsAno && statsAno.assistencias > maxAssistencias) {
        maxAssistencias = statsAno.assistencias;
        lider = jogador;
      }
    });

    if (!lider || maxAssistencias === 0) return null;

    return {
      vencedorId: (lider as JogadorNewResponseType).id,
      vencedorNome: (lider as JogadorNewResponseType).nome,
      vencedorFotoUrl: (lider as JogadorNewResponseType).fotoUrl,
      detalhes: `${maxAssistencias} Assistências em ${temporadaAtual}`,
    };
  },

  calcularMVP: async () => {
    const jogadoresRef = collection(db, "jogadores");
    const querySnapshot = await getDocs(jogadoresRef);

    if (querySnapshot.empty) return null;

    const temporadaAtual = getChaveTemporadaAtual();
    let lider: JogadorNewResponseType | null = null;
    let maiorPontuacao = 0;

    querySnapshot.forEach((doc) => {
      const jogador = { id: doc.id, ...doc.data() } as JogadorNewResponseType;
      const statsAno = jogador.stats?.temporadas?.[temporadaAtual];

      if (statsAno) {

        const gols = statsAno.gols || 0;
        const assistencias = statsAno.assistencias || 0;
        const mvpsPorTime = statsAno.mvpsPorTime || 0;
        const mvpsGeral = statsAno.mvpsGeral || 0;

        const pontuacaoAtual =
          gols + assistencias + (mvpsPorTime * 2) + (mvpsGeral * 3);

        if (pontuacaoAtual > maiorPontuacao) {
          maiorPontuacao = pontuacaoAtual;
          lider = jogador;
        }
      }
    });

    if (!lider || maiorPontuacao === 0) return null;

    const statsLider = (lider as JogadorNewResponseType).stats.temporadas[
      temporadaAtual
    ];

    return {
      vencedorId: (lider as JogadorNewResponseType).id,
      vencedorNome: (lider as JogadorNewResponseType).nome,
      vencedorFotoUrl: (lider as JogadorNewResponseType).fotoUrl,
      detalhes: `${maiorPontuacao} pts (${statsLider.gols}G, ${statsLider.assistencias}A, ${statsLider.mvpsPorTime}Mvps time, ${statsLider.mvpsGeral}Mvps gerais)`,
    };
  },
};
