import { db } from "@/firebase/config";
import { storage } from "@/firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { deleteFoto } from "./delete-foto";
import processFileToWebP from "@/utils/convert-to-webp";

export async function updateJogadorPhoto(
  jogadorId: string,
  jogadorNome: string,
  fotoFile: File
): Promise<void> {
  const jogadorRef = doc(db, "jogadores", jogadorId);
  const webpFile = await processFileToWebP(fotoFile);
  const jogadorSnap = await getDoc(jogadorRef);
  const oldFotoUrl = jogadorSnap.exists() ? jogadorSnap.data()?.fotoUrl : null;

  const storageRef = ref(storage, `fotos/${jogadorNome}-${Date.now()}`);
  const snapshot = await uploadBytes(storageRef, webpFile);
  const newFotoUrl = await getDownloadURL(snapshot.ref);

  await updateDoc(jogadorRef, {
    fotoUrl: newFotoUrl,
    updatedAt: new Date(),
  });

  if (oldFotoUrl) {
    await deleteFoto(oldFotoUrl);
  }
}
