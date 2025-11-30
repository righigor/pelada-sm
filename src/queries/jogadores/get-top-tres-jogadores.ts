import { db } from "@/firebase/config";
import type { JogadorResponseType } from "@/types/jogadores/Jogador";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

export type KeyType = 'gols' | 'assistencias' | 'golContra';

export default async function getTopTresJogadores(key: KeyType, count = 3): Promise<JogadorResponseType[]> {
  const jogadoresRef = collection(db, "jogadores");

  const q = query(jogadoresRef, orderBy(key, "desc"), limit(count));
  const snapshot = await getDocs(q);

  const topJogadoresList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as Omit<JogadorResponseType, 'id'> }));
  return topJogadoresList as JogadorResponseType[];
}