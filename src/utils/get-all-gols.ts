import type { JogadoresEstatistica } from "@/types/jogadores/Jogador";

export function getAllGols(estatisticas: JogadoresEstatistica): number {
    let totalGols = 0;

    for (const stats of Object.values(estatisticas)) {
        totalGols += stats.gols;
    }

    return totalGols;
}