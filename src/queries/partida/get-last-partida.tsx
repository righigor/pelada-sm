import { db } from "@/firebase/config";
import type { PartidaByIDResponseType } from "@/types/partida/PartidaById";
import { PARTIDA_STATUS } from "@/utils/constants";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";

export async function getLastPartida() {
  const partidasRef = collection(db, "partidas");
  const q = query(partidasRef, where("status", "==", PARTIDA_STATUS.FINALIZADO) ,orderBy('dataPartida', 'desc'), limit(1));
  const snapshot = await getDocs(q);
  const data = snapshot.docs[0].data() as Omit<PartidaByIDResponseType, 'id'>;
  return {
    id: snapshot.docs[0].id,
    ...data,
  }
}