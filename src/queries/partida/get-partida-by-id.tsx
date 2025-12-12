import { db } from "@/firebase/config";
import type { PartidaByIDResponseType } from "@/types/partida/PartidaById";

import { doc, getDoc } from "firebase/firestore";

export default async function getPartidaByID(partidaId: string): Promise<PartidaByIDResponseType> {
  if (!partidaId) {
    throw new Error("partidaId is required");
  }

  const partidaRef = doc(db, "partidas", partidaId);
  const snapshot = await getDoc(partidaRef);

  if (!snapshot.exists()) {
    throw new Error("Partida not found");
  }
  
  return { id: snapshot.id, ...snapshot.data() } as PartidaByIDResponseType;
}