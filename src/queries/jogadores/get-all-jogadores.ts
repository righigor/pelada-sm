import { db } from "@/firebase/config";
import type { JogadorNewResponseType } from "@/types/jogadores/Jogador";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export async function getAllJogadores(): Promise<JogadorNewResponseType[]> {
  const jogadoresRef = query(collection(db, "jogadores"), orderBy("nome", "asc"));
  const snapshot = await getDocs(jogadoresRef);
  const jogadoresList = snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<JogadorNewResponseType, 'id'>) }));

  jogadoresList.sort((a, b) => {
    const nameA = ((a as JogadorNewResponseType).nome ?? (a as JogadorNewResponseType).nome ?? "").toString().toLowerCase();
    const nameB = ((b as JogadorNewResponseType).nome ?? (b as JogadorNewResponseType).nome ?? "").toString().toLowerCase();
    return nameA.localeCompare(nameB, "pt-BR");
  });

  return jogadoresList as JogadorNewResponseType[];
}