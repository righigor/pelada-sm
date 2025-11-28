import { db } from "@/firebase/config";
import type {
  JogadorNameMap,
  JogadorResponseType,
} from "@/types/jogadores/Jogador";
import { collection, getDocs } from "firebase/firestore";

export async function getAllNameJogadores(): Promise<JogadorNameMap> {
  const jogadoresRef = collection(db, "jogadores");
  const snapshot = await getDocs(jogadoresRef);
  const jogadoresNameMap: JogadorNameMap = {};

  snapshot.forEach((doc) => {
    const data = doc.data() as JogadorResponseType;
    jogadoresNameMap[doc.id] = { nome: data.nome, fotoUrl: data.fotoUrl };
  });

  return jogadoresNameMap;
}
