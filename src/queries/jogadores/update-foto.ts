import { db } from "@/firebase/config";
import { storage } from "@/firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { deleteFoto } from "./delete-foto";

export async function updateJogadorPhoto(
  jogadorId: string,
  fotoFile: File
): Promise<void> {
const jogadorRef = doc(db, "jogadores", jogadorId);
    const jogadorSnap = await getDoc(jogadorRef);
    const oldFotoUrl = jogadorSnap.exists() ? jogadorSnap.data()?.fotoUrl : null;

    const storageRef = ref(storage, `fotos/${jogadorId}_${Date.now()}`);
    const snapshot = await uploadBytes(storageRef, fotoFile);
    const newFotoUrl = await getDownloadURL(snapshot.ref);

    await updateDoc(jogadorRef, {
        fotoUrl: newFotoUrl,
    });

    if (oldFotoUrl) {
        await deleteFoto(oldFotoUrl);
    }
}
