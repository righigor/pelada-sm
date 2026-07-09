import { db } from "@/firebase/config";
import type { JogadorNewResponseType } from "@/types/jogadores/Jogador";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export async function getAllJogadores(): Promise<JogadorNewResponseType[]> {
  const jogadoresRef = query(
    collection(db, "jogadores"),
    orderBy("nome", "asc"),
  );
  const snapshot = await getDocs(jogadoresRef);
  const jogadoresList = snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      ...data,
      id: doc.id,
    };
  }) as JogadorNewResponseType[];

  jogadoresList.sort((a, b) => {
    const nameA = (a.nome ?? "").toString().toLowerCase();
    const nameB = (b.nome ?? "").toString().toLowerCase();
    return nameA.localeCompare(nameB, "pt-BR");
  });
  return jogadoresList as JogadorNewResponseType[];
}
