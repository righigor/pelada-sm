import type { EstatisticasInputStore } from "@/types/PartidaStore";
import type {
  JogadorNameMap,
} from "@/types/jogadores/Jogador";

export interface JogadorInfo {
  id: string;
  nome: string;
  fotoUrl: string | null;
  gols: number;
  assistencias: number;
  golsContra: number;
  partidas: number;
  times: Record<string, string[]>;
  companheiros: Record<string, number>;
}

export function getListaCompleta(
  estatisticasInput: EstatisticasInputStore | undefined,
  jogadorInfo: JogadorNameMap
): JogadorInfo[] {
  const lista: JogadorInfo[] = [];

  if (!estatisticasInput) {
    return [];
  }


  for (const groupKey in estatisticasInput) {
    const grupoStats =
      estatisticasInput[groupKey as keyof EstatisticasInputStore];

    for (const [jogadorId, stats] of Object.entries(grupoStats.jogadores)) {
      const info = jogadorInfo[jogadorId];

      if (info) {
        lista.push({
          id: jogadorId,
          nome: info.nome,
          fotoUrl: info.fotoUrl,
          gols: stats.gols || 0,
          assistencias: stats.assistencias || 0,
          golsContra: stats.golsContra || 0,
          partidas: 1,
          times: {},
          companheiros: {},
        });
      }
    }
  }

  lista.sort((a, b) => {
    if (b.gols !== a.gols) {
      return b.gols - a.gols;
    }
    return b.assistencias - a.assistencias;
  });

  return lista;
}
