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
    telefone: data.telefone,
    stats: {
      gols: 0,
      assistencias: 0,
      golsContra: 0,
      partidas: 0,
      defesasDificeis: 0,
      mvpsGeral: 0,
      mvpsPorTime: 0,
      times: {
        azul: 0,
        preto: 0,
        branco: 0,
        vermelho: 0,
        goleiros: 0,
      },
      companheiros: {},
      temporadas: {},
    },
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return res.id;
}