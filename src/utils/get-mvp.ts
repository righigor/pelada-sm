import type { EstatisticasInputStore, PartidaKey } from "@/types/PartidaStore";
import type { DestaquePartida } from "@/types/destaques/Destaque";

interface MvpDestaques {
  mvpGeral: DestaquePartida | null;
  mvpPorTime: Record<PartidaKey, DestaquePartida | null>;
}

const PESOS_MVP = {
  GOL: 3,
  ASSISTENCIA: 1,
  GOL_CONTRA: 4,
};

export function getMvps(
  estatisticasInput: EstatisticasInputStore
): MvpDestaques {
  let maxMvpScoreGeral = -Infinity;
  let mvpGeral: DestaquePartida | null = null;

  const mvpPorTime: Record<PartidaKey, DestaquePartida | null> = {
    azul: null,
    preto: null,
    branco: null,
    vermelho: null,
    goleiros: null,
  } as Record<PartidaKey, DestaquePartida | null>;

  const maxScorePorTime: Record<PartidaKey, number> = {
    azul: -Infinity,
    preto: -Infinity,
    branco: -Infinity,
    vermelho: -Infinity,
    goleiros: -Infinity,
  } as Record<PartidaKey, number>;

  for (const groupKey in estatisticasInput) {
    const key = groupKey as PartidaKey;
    const grupoStats = estatisticasInput[key];

    let maxScoreTimeAtual = maxScorePorTime[key];

    for (const [jogadorId, stats] of Object.entries(grupoStats.jogadores)) {
      const mvpScore =
        stats.gols * PESOS_MVP.GOL +
        stats.assistencias * PESOS_MVP.ASSISTENCIA -
        stats.golContra * PESOS_MVP.GOL_CONTRA;

      if (mvpScore > maxMvpScoreGeral) {
        maxMvpScoreGeral = mvpScore;
        mvpGeral = { jogadorId, nome: stats.nome, stat: mvpScore };
      }

      if (mvpScore > maxScoreTimeAtual) {
        maxScoreTimeAtual = mvpScore;

        mvpPorTime[key] = { jogadorId, nome: stats.nome, stat: mvpScore };
        maxScorePorTime[key] = mvpScore; // Atualiza o rastreamento
      }
    }
  }

  const mvpGeralFinal = maxMvpScoreGeral > 0 ? mvpGeral : null;

  return { mvpGeral: mvpGeralFinal, mvpPorTime };
}
