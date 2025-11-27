import { db } from "@/firebase/config";
import type { JogadorResponseType } from "@/types/jogadores/Jogador";
import { collection, getDocs } from "firebase/firestore";

export async function getAllJogadores(): Promise<JogadorResponseType[]> {
  const jogadoresRef = collection(db, "jogadores");
  const snapshot = await getDocs(jogadoresRef);
  const jogadoresList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as Omit<JogadorResponseType, 'id'> }));
  return jogadoresList as JogadorResponseType[];
}