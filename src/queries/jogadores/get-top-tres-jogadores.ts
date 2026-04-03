import { db } from "@/firebase/config";
import type { JogadorNewResponseType } from "@/types/jogadores/Jogador";
import type { StatField } from "@/types/partida/Estatisticas";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";

export default async function getTopTresJogadores(
  field: StatField, 
  count = 3,
  temporada?: string
): Promise<JogadorNewResponseType[]> {
  const jogadoresRef = collection(db, "jogadores");

  const orderPath = temporada 
    ? `stats.temporadas.${temporada}.${field}` 
    : `stats.${field}`;

  const q = query(
    jogadoresRef, 
    orderBy(orderPath, "desc"), 
    limit(count)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as JogadorNewResponseType[];
}