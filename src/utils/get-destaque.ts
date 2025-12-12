import type { DestaquePartida } from "@/types/destaques/Destaque";
import type { EstatisticaKeyType } from "@/types/Partida";
import type { EstatisticasInputStore } from "@/types/PartidaStore";

export function getDestaque(
  estatisticasInput: EstatisticasInputStore,
  statKey: EstatisticaKeyType
): DestaquePartida | null {
  let melhorJogadorId: string | null = null;
  let nomeJogador: string | null = null;
  let maxStat = -1;

  for (const groupKey in estatisticasInput) {
    const grupoStats =
      estatisticasInput[groupKey as keyof EstatisticasInputStore];

    for (const [jogadorId, stats] of Object.entries(grupoStats.jogadores)) {
      const currentStat = stats[statKey];

      if (currentStat > 0) {
        if (currentStat > maxStat) {
          maxStat = currentStat;
          melhorJogadorId = jogadorId;
          nomeJogador = stats.nome;
        }
      }
    }
  }

  if (melhorJogadorId && nomeJogador && maxStat > 0) {
    return {
      jogadorId: melhorJogadorId,
      nome: nomeJogador,
      stat: maxStat,
    };
  }

  return null;
}
