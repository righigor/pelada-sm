import { Button } from "@/components/ui/button";
import { db } from "@/firebase/config";
import { useGetAllJogadores } from "@/hooks/jogadores/use-get-all-jogadores";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { toast } from "sonner";

// interface Player {
//   jogadorId: string;
//   nome: string;
//   telefone: string;
//   timestamp: number;
// }

export function AddPlayersManual() {
  const [loading, setLoading] = useState(false);
  const { data: jogadores, isPending } = useGetAllJogadores();

  if (isPending) {
    return <p>Carregando...</p>;
  }

  const jogadores2026 = jogadores?.filter((jogador) => {
    const temporada2026 = jogador.stats?.temporadas?.["2026"];

    return temporada2026 && temporada2026.partidas > 0;
  });

  const partidaId = "nyq1J67ORS9jSOBNyGRW";

  const listaVotos = [
    // LINHA
    { nome: "Igor Righi", id: "r50iU8vaVnoqlqrAzCdV", opcao: "Linha" },
    { nome: "Paulo Roberto", id: "OVBTIcajKRttjcXd1jsT", opcao: "Linha" },
    { nome: "Lucas Martins", id: "gjpixSYxjrDAc8PxJcYZ", opcao: "Linha" },
    { nome: "Thiago Martins", id: "nNsDArGLXsgZQDZVouvM", opcao: "Linha" },
    { nome: "João Conrado", id: "HTw2ElISsBAl7bsB8ebL", opcao: "Linha" },
    { nome: "Lucas Magalhães", id: "efuYzZleA9TVzAp16Q1g", opcao: "Linha" },
    { nome: "Arthur Vgal", id: "nU7kl6jEaEbxPyBrDgqh", opcao: "Linha" },
    { nome: "Filipe Guimarães", id: "8Rx2NjxNT1YdGuKzo67v", opcao: "Linha" },
    { nome: "Bruno", id: "vpaUF7YQ6vTSkOkieRsM", opcao: "Linha" },
    { nome: "Jotinha", id: "diWBQsawoMdNdPDup2Rf", opcao: "Linha" },
    { nome: "Miguel Sampaio", id: "TbcXB5thmaqpYn4dcSYG", opcao: "Linha" },
    { nome: "Arthur Eduardo", id: "SDluFyflT6mjQjIb9rfM", opcao: "Linha" },
    { nome: "Dino", id: "U0r8q0BvK9DGvFRT02j2", opcao: "Linha" },
    { nome: "Pedrin", id: "zoo4UxvBIMUMRtz1DLjH", opcao: "Linha" },
    { nome: "Gustavo Guimarães", id: "Oq76rY0Fub6Qxwt9Bb26", opcao: "Linha" },
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
        }),
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
    <div className="mx-auto p-4 flex flex-col">

      <div className="flex justify-center items-center">
        <Button onClick={handleConfirm}>{loading ? "carrgando" : "salvar votos"}</Button>
      </div>
      <div className="p-4 flex items-center justify-center flex-col">
        {jogadores2026?.map((jogador) => (
          <p>{jogador.nome}</p>
        ))}
      </div>
    </div>
  );
}
