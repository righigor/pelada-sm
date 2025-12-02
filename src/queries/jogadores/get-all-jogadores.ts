import { db } from "@/firebase/config";
import type { JogadorResponseType } from "@/types/jogadores/Jogador";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export async function getAllJogadores(): Promise<JogadorResponseType[]> {
  const jogadoresRef = query(collection(db, "jogadores"), orderBy("nome", "asc"));
  const snapshot = await getDocs(jogadoresRef);
  const jogadoresList = snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<JogadorResponseType, 'id'>) }));

  jogadoresList.sort((a, b) => {
    const nameA = ((a as JogadorResponseType).nome ?? (a as JogadorResponseType).nome ?? "").toString().toLowerCase();
    const nameB = ((b as JogadorResponseType).nome ?? (b as JogadorResponseType).nome ?? "").toString().toLowerCase();
    return nameA.localeCompare(nameB, "pt-BR");
  });

  return jogadoresList as JogadorResponseType[];
}