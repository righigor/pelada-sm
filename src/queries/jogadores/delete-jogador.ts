import { db } from "@/firebase/config";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { deleteFoto } from "./delete-foto";

export async function deleteJogador(jogadorId: string): Promise<void> {
  const jogadorRef = doc(db, "jogadores", jogadorId);
  const jogadorSnap = await getDoc(jogadorRef);

  if (!jogadorSnap.exists()) {
    throw new Error("Jogador não encontrado.");
  }

  const data = jogadorSnap.data();
  const oldFotoUrl = data.fotoUrl;

  if (oldFotoUrl) {
    await deleteFoto(oldFotoUrl);
  }

  await deleteDoc(jogadorRef);
}
