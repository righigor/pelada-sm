import type { EstatisticasInputStore } from "@/types/PartidaStore";

export default function getTotalJogadores(
  estatisticasInput: EstatisticasInputStore
): number {
  let totalJogadores = 0;

  for (const groupKey in estatisticasInput) {
    const grupoStats =
      estatisticasInput[groupKey as keyof EstatisticasInputStore];

    totalJogadores += Object.keys(grupoStats.jogadores).length;
  }

  return totalJogadores;
}
