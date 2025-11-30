import { db } from "@/firebase/config";
import { storage } from "@/firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function updateJogadorPhoto(
  jogadorId: string,
  fotoFile: File
): Promise<void> {
  const storageRef = ref(storage, `fotos/${jogadorId}_${Date.now()}`);

  const snapshot = await uploadBytes(storageRef, fotoFile);

  const fotoUrl = await getDownloadURL(snapshot.ref);

  const jogadorRef = doc(db, "jogadores", jogadorId);

  await updateDoc(jogadorRef, {
    fotoUrl: fotoUrl,
  });
}
