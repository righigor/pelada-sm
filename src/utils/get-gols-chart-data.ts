import type {
  JogadoresEstatistica,
  JogadorNameMap,
} from "@/types/jogadores/Jogador";

export interface ChartData {
  name: string;
  Gols: number;
  fotoUrl: string | null;
  jogadorId: string;
}

export function getGolsChartData(
  estatisticas: JogadoresEstatistica,
  jogadorInfo: JogadorNameMap
): ChartData[] {
  const data: ChartData[] = [];

  for (const [jogadorId, stats] of Object.entries(estatisticas)) {
    const jogador = jogadorInfo[jogadorId];

    data.push({
      name: jogador ? jogador.nome : "Desconhecido",
      Gols: stats.gols || 0,
      fotoUrl: jogador ? jogador.fotoUrl : null,
      jogadorId: jogadorId,
    });
  }

  return data;
}
