import {
  doc,
  // getDoc,
  // updateDoc,
  // arrayUnion,
  // deleteField,
  setDoc,
} from "firebase/firestore";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2, UserCheck } from "lucide-react";
import { db } from "@/firebase/config";
import { toast } from "sonner";

// interface Player {
//   jogadorId: string;
//   nome: string;
//   telefone: string;
//   timestamp: number;
// }

export function AddPlayersManual() {
  const [loading, setLoading] = useState(false);

const partidaId = "BMy1XXD6kQc4NN9doVf6"; // Substitua pelo ID real da partida no Firestore

const listaVotos = [
  // LINHA
  // { nome: "Igor Righi", id: "r50iU8vaVnoqlqrAzCdV", opcao: "Linha" },
  // { nome: "Samuel Salmandra", id: "tfCQMLj8maxz3KVnuydI", opcao: "Linha" },
  // { nome: "Bruno", id: "vpaUF7YQ6vTSkOkieRsM", opcao: "Linha" },
  // { nome: "Daniel Magalhaes", id: "iATCo2TYcTvT8lWKh1Ei", opcao: "Linha" }, // Verifique se é Daniel Magalhães
  // { nome: "Jotinha", id: "diWBQsawoMdNdPDup2Rf", opcao: "Linha" }, // João Luiz (Jotinha)
  // { nome: "Bernardo Caldeira", id: "UxCE4gbzCHGlOYpC5sNx", opcao: "Linha" },
  // { nome: "Leandro Rocha", id: "FPP0PaxP4LMRNcRowWmn", opcao: "Linha" },
  // { nome: "Lucas Magalhães", id: "efuYzZleA9TVzAp16Q1g", opcao: "Linha" },
  // { nome: "Vitor Peixoto", id: "rL5DSGaMwdXi4hZrbn5a", opcao: "Linha" },
  // { nome: "Miguel Sampaio", id: "TbcXB5thmaqpYn4dcSYG", opcao: "Linha" },
  // { nome: "Paulo Roberto", id: "OVBTIcajKRttjcXd1jsT", opcao: "Linha" },
  // { nome: "Arthur Eduardo", id: "SDluFyflT6mjQjIb9rfM", opcao: "Linha" },
  // { nome: "Thiago Martins", id: "nNsDArGLXsgZQDZVouvM", opcao: "Linha" },
  // { nome: "Arthur Vgal", id: "nU7kl6jEaEbxPyBrDgqh", opcao: "Linha" },
  // { nome: "Gustavo Guimaraes", id: "Oq76rY0Fub6Qxwt9Bb26", opcao: "Linha" },
  // { nome: "Pedrin", id: "zoo4UxvBIMUMRtz1DLjH", opcao: "Linha" },

  // ESPERA
  { nome: "Petw", id: "yjIvnDfG0YZPOQbWxvyx", opcao: "Espera" },
  // { nome: "Joao Conrado", id: "HTw2ElISsBAl7bsB8ebL", opcao: "Espera" }
];


const handleConfirm = async () => {
    setLoading(true);
    try {
      // Usamos um Promise.all para disparar todas as gravações simultaneamente
      await Promise.all(
        listaVotos.map((voto, index) => {
          const votoId = `${partidaId}_${voto.id}`;
          const docRef = doc(db, "votos", votoId);

          // Salvando no formato "flat" (limpo), que é o padrão do SDK Web
          // O Firestore lida com isso melhor do que o formato de fields da API REST
          return setDoc(docRef, {
            partidaId: partidaId,
            jogadorId: voto.id,
            nome: voto.nome,
            opcao: voto.opcao,
            timestamp: Date.now() + index,
          });
        })
      );

      toast.success("Todos os votos foram injetados com sucesso!");
    } catch (error) {
      console.error("Erro ao injetar votos:", error);
      toast.error("Erro ao injetar votos no banco.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <Button
      onClick={handleConfirm}
      disabled={loading}
      variant="outline"
      className="mt-50"
    >
      {loading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <UserCheck className="mr-2 h-4 w-4" />
      )}
      Confirmar Grupo no Firestore
    </Button>
  );
}
