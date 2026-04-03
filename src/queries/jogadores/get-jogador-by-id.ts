import { db } from "@/firebase/config";
import type { JogadorNewResponseType, StatsJogadorType } from "@/types/jogadores/Jogador";
import { doc, getDoc } from "firebase/firestore";

export interface JogadorDetails extends JogadorNewResponseType {
    mediaGols: number;
    mediaAssistencias: number;
    mediaGolsContra: number;
    mediaDefesas: number;
}

export const getJogadorById = async (jogadorId: string): Promise<JogadorDetails> => {
    const jogadorRef = doc(db, 'jogadores', jogadorId);
    const docSnap = await getDoc(jogadorRef);

    if (!docSnap.exists()) {
        throw new Error("Jogador não encontrado.");
    }

    const rawData = docSnap.data();

    const stats: StatsJogadorType = rawData.stats || {
        gols: 0,
        assistencias: 0,
        golsContra: 0,
        partidas: 0,
        defesasDificeis: 0,
        times: { azul: 0, preto: 0, branco: 0, vermelho: 0, goleiros: 0 },
        companheiros: {},
        temporadas: {}
    };

    const data = { 
        id: docSnap.id, 
        ...rawData,
        stats
    } as JogadorNewResponseType;
    
    const totalPartidas = stats.partidas || 0;

    const calcularMedia = (valor: number) => 
        totalPartidas > 0 ? parseFloat((valor / totalPartidas).toFixed(2)) : 0;

    return {
        ...data,
        mediaGols: calcularMedia(stats.gols),
        mediaAssistencias: calcularMedia(stats.assistencias),
        mediaGolsContra: calcularMedia(stats.golsContra),
        mediaDefesas: calcularMedia(stats.defesasDificeis),
    };
};