import { db } from "@/firebase/config";
import type { PoteType } from "@/types/potes/Potes";
import { doc, writeBatch } from "firebase/firestore";

export async function updatePotes(novosPotes: PoteType[]) {
  const batch = writeBatch(db);

  novosPotes.forEach((pote) => {
    const poteRef = doc(db, "potes", pote.id);

    batch.update(poteRef, {
      jogadores: pote.jogadores,
    });
  });

  await batch.commit();
}
