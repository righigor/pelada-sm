import type { PartidaKey } from "@/types/PartidaStore";
import type { DestaquePartida } from "@/types/destaques/Destaque";
import type { TimeData } from "@/types/partida/Estatisticas";

interface MvpDestaques {
  mvpGeral: DestaquePartida | null;
  mvpPorTime: Record<PartidaKey, DestaquePartida | null>;
}

const PESOS_MVP = {
  GOL: 3,
  ASSISTENCIA: 2,
  DD: 1.5,
  GOL_CONTRA: 4,
};

export function getMvps(
  estatisticasInput: Record<PartidaKey, TimeData>
): MvpDestaques {
  let maxMvpScoreGeral = -Infinity;
  let mvpGeral: DestaquePartida | null = null;

  const mvpPorTime: Record<PartidaKey, DestaquePartida | null> = {
    azul: null,
    preto: null,
    branco: null,
    vermelho: null,
    goleiros: null,
  };

  const maxScorePorTime: Record<PartidaKey, number> = {
    azul: -Infinity,
    preto: -Infinity,
    branco: -Infinity,
    vermelho: -Infinity,
    goleiros: -Infinity,
  };

  for (const groupKey in estatisticasInput) {
    const key = groupKey as PartidaKey;
    const grupoStats = estatisticasInput[key];


    for (const [jogadorId, stats] of Object.entries(grupoStats.jogadores)) {
      const mvpScore =
        (stats.gols || 0) * PESOS_MVP.GOL +
        (stats.assistencias || 0) * PESOS_MVP.ASSISTENCIA +
        (stats.dd || 0) * PESOS_MVP.DD -
        (stats.golsContra || 0) * PESOS_MVP.GOL_CONTRA;

      if (mvpScore > maxMvpScoreGeral) {
        maxMvpScoreGeral = mvpScore;
        mvpGeral = { jogadorId, nome: stats.nome, stat: mvpScore };
      }

      if (mvpScore > maxScorePorTime[key]) {
        maxScorePorTime[key] = mvpScore;
        mvpPorTime[key] = { jogadorId, nome: stats.nome, stat: mvpScore };
      }
    }
  }

  return { 
    mvpGeral: maxMvpScoreGeral > 0 ? mvpGeral : null, 
    mvpPorTime 
  };
}
