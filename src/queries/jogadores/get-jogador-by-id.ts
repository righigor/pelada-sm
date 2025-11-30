import { db } from "@/firebase/config";
import type { JogadorResponseType } from "@/types/jogadores/Jogador";
import { doc, getDoc } from "firebase/firestore";

export interface JogadorDetails extends JogadorResponseType {
    mediaGols: number;
    mediaAssistencias: number;
    mediaGolContra: number;
}

export const getJogadorById = async (jogadorId: string): Promise<JogadorDetails> => {
    const jogadorRef = doc(db, 'jogadores', jogadorId);
    const docSnap = await getDoc(jogadorRef);

    if (!docSnap.exists()) {
        throw new Error("Jogador não encontrado.");
    }

    const data = { id: docSnap.id, ...docSnap.data() } as JogadorResponseType;
    
    const partidas = data.partidas || 0;

    const mediaGols = partidas > 0 ? (data.gols / partidas) : 0;
    const mediaAssistencias = partidas > 0 ? (data.assistencias / partidas) : 0;
    const mediaGolContra = partidas > 0 ? (data.golContra / partidas) : 0;

    return {
        ...data,
        mediaGols: parseFloat(mediaGols.toFixed(2)),
        mediaAssistencias: parseFloat(mediaAssistencias.toFixed(2)),
        mediaGolContra: parseFloat(mediaGolContra.toFixed(2)),
    };
};