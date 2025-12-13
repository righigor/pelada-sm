import type { CreateJogadorRequest } from "@/types/jogadores/CreateJogador";
import { uploadFoto } from "../upload-foto";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/config";

export async function createJogador(data: CreateJogadorRequest): Promise<string> {
  let imgUrl = null;
  if (data.foto) {
    imgUrl = await uploadFoto(data.foto, data.nome);
  }

  const jogadoresRef = collection(db, "jogadores");

  const res = await addDoc(jogadoresRef, {
    nome: data.nome,
    fotoUrl: imgUrl,
    gols: 0,
    assistencias: 0,
    golContra: 0,
    partidas: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return res.id;
}