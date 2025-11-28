import type { JogadoresEstatistica } from "@/types/jogadores/Jogador";
import type { Artilheiro } from "./get-artilheiro";


export function getAssistente(estatisticas: JogadoresEstatistica): Artilheiro | null {
    let assistenteId: string | null = null;
    let maxAssists = -1;

    for (const [jogadorId, stats] of Object.entries(estatisticas)) {
        if (stats.assistencias > 0) {
            if (stats.assistencias > maxAssists) {
                maxAssists = stats.assistencias;
                assistenteId = jogadorId;
            }
        }
    }

    if (assistenteId) {
        return {
            jogadorId: assistenteId,
            stat: maxAssists
        };
    }
    
    return null;
}