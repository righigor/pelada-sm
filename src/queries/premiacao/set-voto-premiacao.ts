import { db } from "@/firebase/config";
import { doc, setDoc } from "firebase/firestore";
import type { VotoPremiado } from "./get-votos-premiacao";

export async function setVotoPremiacao(
  temporada: string,
  campo: "craqueGalera" | "bagreGalera",
  voto: VotoPremiado
): Promise<void> {
  await setDoc(doc(db, "premiacao", temporada), { [campo]: voto }, { merge: true });
}
