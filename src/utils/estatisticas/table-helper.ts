import type { JogadorNewResponseType } from "@/types/jogadores/Jogador";

export interface JogadorStatRow {
  id: string;
  nome: string;
  fotoUrl: string | null;
  partidas: number;
  gols: number;
  assistencias: number;
  golsContra: number;
  defesasDificeis: number;
  gaTotal: number;
  gaMedio: number;
  mvpsGeral: number;
  mvpsPorTime: number;
}

/**
 * Transforma a lista de jogadores nas linhas da tabela estatística.
 * Calcula o G/A e G/A Médio, e exclui quem não jogou.
 */
export function getTabelaEstatisticas(
  jogadores: JogadorNewResponseType[]
): JogadorStatRow[] {
  return jogadores
    .filter((j) => (j.stats?.partidas ?? 0) > 0)
    .map((j) => {
      const gols = j.stats?.gols ?? 0;
      const assistencias = j.stats?.assistencias ?? 0;
      const partidas = j.stats?.partidas ?? 1; // Evita divisão por zero

      return {
        id: j.id,
        nome: j.nome,
        fotoUrl: j.fotoUrl ?? null,
        partidas: j.stats?.partidas ?? 0,
        gols,
        assistencias,
        golsContra: j.stats?.golsContra ?? 0,
        defesasDificeis: j.stats?.defesasDificeis ?? 0,
        gaTotal: gols + assistencias,
        gaMedio: parseFloat(((gols + assistencias) / partidas).toFixed(2)),
        mvpsGeral: j.stats?.mvpsGeral ?? 0,
        mvpsPorTime: j.stats?.mvpsPorTime ?? 0,
      };
    })
    // Ordenação padrão inicial: 1. Partidas (decrescente), 2. Gols (decrescente)
    .sort((a, b) => {
      if (b.partidas !== a.partidas) return b.partidas - a.partidas;
      return b.gols - a.gols;
    });
}