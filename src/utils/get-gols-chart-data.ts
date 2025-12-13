import type { JogadorNameMap } from "@/types/jogadores/Jogador";
import type { EstatisticasInputStore } from "@/types/PartidaStore";

export interface ChartData {
  name: string;
  Gols: number;
  jogadorId: string;
}

export function getGolsChartData(
  estatisticasInput: EstatisticasInputStore,
  jogadorInfo: JogadorNameMap
): ChartData[] {
  const data: ChartData[] = [];

  for (const groupKey in estatisticasInput) {
    const grupoStats =
      estatisticasInput[groupKey as keyof EstatisticasInputStore];

    for (const [jogadorId, stats] of Object.entries(grupoStats.jogadores)) {
      const jogador = jogadorInfo[jogadorId];

      data.push({
        name: jogador ? jogador.nome : "Desconhecido",
        Gols: stats.gols || 0,
        jogadorId: jogadorId,
      });
    }
  }

  return data;
}
