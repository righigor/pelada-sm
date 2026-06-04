import { db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";

export interface VotoPremiado {
  jogadorId: string;
  nome: string;
  fotoUrl: string | null;
  votos?: number;
}

export interface PremiacaoVotos {
  craqueGalera: VotoPremiado | null;
  bagreGalera: VotoPremiado | null;
}

export async function getVotosPremiacao(temporada: string): Promise<PremiacaoVotos> {
  const snap = await getDoc(doc(db, "premiacao", temporada));
  if (!snap.exists()) return { craqueGalera: null, bagreGalera: null };
  const data = snap.data();
  return {
    craqueGalera: data.craqueGalera ?? null,
    bagreGalera: data.bagreGalera ?? null,
  };
}
