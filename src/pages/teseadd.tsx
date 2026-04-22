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

const partidaId = "VWueyge2B7KlmfV7vYwF";

const listaVotos = [
  // LINHA
  { nome: "Igor Righi", id: "r50iU8vaVnoqlqrAzCdV", opcao: "Linha" },
  { nome: "Lucas Mendes", id: "tcZhOMHksxzfl8VzXnuH", opcao: "Linha" },
  { nome: "João Conrado", id: "HTw2ElISsBAl7bsB8ebL", opcao: "Linha" },
  { nome: "Miguel Sampaio", id: "TbcXB5thmaqpYn4dcSYG", opcao: "Linha" },
  { nome: "Jotinha", id: "diWBQsawoMdNdPDup2Rf", opcao: "Linha" },
  { nome: "João Fantini", id: "ouqFe4oP7hC4VMM8uqKI", opcao: "Linha" },
  { nome: "Paulo Roberto", id: "OVBTIcajKRttjcXd1jsT", opcao: "Linha" },
  { nome: "Lucas Magalhães", id: "efuYzZleA9TVzAp16Q1g", opcao: "Linha" },
  { nome: "Arthur Eduardo", id: "SDluFyflT6mjQjIb9rfM", opcao: "Linha" },
  { nome: "Arthur Vgal", id: "nU7kl6jEaEbxPyBrDgqh", opcao: "Linha" },
  { nome: "Thiago Martins", id: "nNsDArGLXsgZQDZVouvM", opcao: "Linha" },
  { nome: "Pedrin", id: "zoo4UxvBIMUMRtz1DLjH", opcao: "Linha" },

  { nome: "Bruno", id: "vpaUF7YQ6vTSkOkieRsM", opcao: "Linha" },
  { nome: "João Luiz", id: "1Xq2JqoM3negI9nYCBf5", opcao: "Linha" },
  { nome: "Filipe Guimarães", id: "8Rx2NjxNT1YdGuKzo67v", opcao: "Linha" },
  { nome: "Lucas Martins", id: "gjpixSYxjrDAc8PxJcYZ", opcao: "Linha" },
  
  // ESPERA
  { nome: "Vitor Peixoto", id: "rL5DSGaMwdXi4hZrbn5a", opcao: "Espera" },

];


const handleConfirm = async () => {
    setLoading(true);
    try {
      await Promise.all(
        listaVotos.map((voto) => {
          const votoId = `${partidaId}_${voto.id}`;
          const docRef = doc(db, "votos", votoId);
          return setDoc(docRef, {
            partidaId: partidaId,
            jogadorId: voto.id,
            nome: voto.nome,
            opcao: voto.opcao,
            timestamp: Date.now(),
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
