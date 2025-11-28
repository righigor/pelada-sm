import type { GetAllPartidaResponseType } from "@/types/Partida";

export type Artilheiro = {
  jogadorId: string;
  gols: number;
};

export type JogadoresEstatistica = GetAllPartidaResponseType['jogadoresEstatisticas'];

export default function getArtilheiro(estatisticas: JogadoresEstatistica): Artilheiro | null {
  let artilheiroId: string | null = null;
  let maxGols = -1;

  for (const [jogadorId, stats] of Object.entries(estatisticas)) {
        if (stats.gols > 0) {
            if (stats.gols > maxGols) {
                maxGols = stats.gols;
                artilheiroId = jogadorId;
            }
        }
    }

    if (artilheiroId) {
        return {
            jogadorId: artilheiroId,
            gols: maxGols
        };
    }
    
    return null;
}