import { db } from "@/firebase/config";
import type { JogadorStatus } from "@/types/jogadores/Jogador";
import { doc, updateDoc } from "firebase/firestore";

interface UpdateJogadorStatusParams {
  jogadorId: string;
  status: JogadorStatus;
}

export async function updateJogadorStatus({
  jogadorId,
  status,
}: UpdateJogadorStatusParams): Promise<void> {
  const jogadorRef = doc(db, "jogadores", jogadorId);

  await updateDoc(jogadorRef, {
    status,
    updatedAt: new Date().toISOString(),
  });
}