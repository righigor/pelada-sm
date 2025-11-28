import type { JogadoresEstatistica } from "@/types/jogadores/Jogador";
import type { Artilheiro } from "./get-artilheiro";

export function getBagre(estatisticas: JogadoresEstatistica): Artilheiro | null {
    let golContraId: string | null = null;
    let maxGolsContra = -1;

    for (const [jogadorId, stats] of Object.entries(estatisticas)) {
        if (stats.golContra > 0) {
            if (stats.golContra > maxGolsContra) {
                maxGolsContra = stats.golContra;
                golContraId = jogadorId;
            }
        }
    }

    if (golContraId) {
        return {
            jogadorId: golContraId,
            stat: maxGolsContra
        };
    }
    
    return null;
}