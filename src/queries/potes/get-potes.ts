import { db } from "@/firebase/config";
import type { PoteType } from "@/types/potes/Potes";
import { collection, getDocs, query } from "firebase/firestore";

export async function getPotes(): Promise<PoteType[]> {
  const potesRef = collection(db, "potes");
  const q = query(potesRef);
  const querySnapshot = await getDocs(q);

  const potes = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as PoteType[];

  return potes.sort((a, b) => Number(a.id) - Number(b.id));
}
