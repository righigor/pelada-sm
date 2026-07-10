import type { JogadorNewResponseType } from "@/types/jogadores/Jogador";

export interface RankingItem {
  jogadorId: string;
  nome: string;
  fotoUrl: string | null;
  valor: number;
}

/**
 * Pega os N jogadores com maior valor em uma stat específica.
 */
export function getTopNRanking(
  jogadores: JogadorNewResponseType[],
  statKey: "mvpsGeral" | "mvpsPorTime",
  limit: number = 5
): RankingItem[] {
  return jogadores
    .filter((j) => (j.stats?.[statKey] ?? 0) > 0)
    .map((j) => ({
      jogadorId: j.id,
      nome: j.nome,
      fotoUrl: j.fotoUrl ?? null,
      valor: j.stats?.[statKey] ?? 0,
    }))
    .sort((a, b) => b.valor - a.valor)
    .slice(0, limit);
}