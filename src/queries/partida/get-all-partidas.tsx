import { db } from "@/firebase/config";
import type { PartidaByIDResponseType } from "@/types/partida/PartidaById";

import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

type AllPartidasResponse = Array<PartidaByIDResponseType>; 

export async function getAllPartidas(): Promise<AllPartidasResponse> {
  const partidasRef = collection(db, "partidas");
  const q = query(partidasRef, orderBy("dataPartida", "desc"), limit(1));
  
  const snapshot = await getDocs(q);
  
  const partidasList: AllPartidasResponse = snapshot.docs.map(doc => {
      const data = doc.data(); 
      const partida = { 
          id: doc.id,
          ...data, 
      } as PartidaByIDResponseType; 
      
      return partida;
  });

  return partidasList;
}
