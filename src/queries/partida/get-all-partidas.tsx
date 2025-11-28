import { db } from "@/firebase/config";
import type { GetAllPartidaResponseType } from "@/types/Partida";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export async function getAllPartidas() {
  const partidasRef = collection(db, "partidas");
  const q = query(partidasRef, orderBy("dataPartida", "desc"));
  const snapshot = await getDocs(q);
  const partidasList = snapshot.docs.map(doc => ({ id: doc.id,
    ...doc.data() as Omit<GetAllPartidaResponseType, 'id'> }));
  return partidasList as GetAllPartidaResponseType[];
}