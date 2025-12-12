import type { EstatisticasInputStore } from "@/types/PartidaStore";

export function getAllGols(estatisticasInput: EstatisticasInputStore): number {
  let totalGols = 0;

  for (const groupKey in estatisticasInput) {
    const grupoStats =
      estatisticasInput[groupKey as keyof EstatisticasInputStore];

    for (const stats of Object.values(grupoStats.jogadores)) {
      totalGols += stats.gols;
    }
  }

  return totalGols;
}
