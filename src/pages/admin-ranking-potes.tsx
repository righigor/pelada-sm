/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { PoteColuna } from "@/components/pote-coluna";
import { useGetPotes } from "@/hooks/potes/use-get-potes";
import { useUpdatePotes } from "@/hooks/potes/use-update-potes";
import type { PoteType } from "@/types/potes/Potes";
import { Card } from "@/components/ui/card";
import LoadingButton from "@/components/loading-button";

export default function AdminRankingPage() {
  const { data: potesDB, isLoading } = useGetPotes();
  const { mutate: updatePotes, isPending } = useUpdatePotes();
  const [potes, setPotes] = useState<PoteType[]>([]);

  useEffect(() => {
    if (potesDB) setPotes(potesDB);
  }, [potesDB]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const novosPotes = potes.map((pote) => ({
      ...pote,
      jogadores: [...pote.jogadores],
    }));

    const pOrigemIndex = novosPotes.findIndex(
      (p) => p.id === source.droppableId
    );
    const pDestinoIndex = novosPotes.findIndex(
      (p) => p.id === destination.droppableId
    );

    const [jogadorMovido] = novosPotes[pOrigemIndex].jogadores.splice(
      source.index,
      1
    );

    const jogadorAtualizado = {
      ...jogadorMovido,
      pote: Number(destination.droppableId),
    };

    novosPotes[pDestinoIndex].jogadores.splice(
      destination.index,
      0,
      jogadorAtualizado
    );

    const resultadoFinal = novosPotes.map((pote) => ({
      ...pote,
      jogadores: pote.jogadores.map((j, idx) => ({
        ...j,
        rankNoPote: idx + 1,
      })),
    }));

    setPotes(resultadoFinal);
  };

  if (isLoading)
    return (
      <div className="p-10 text-zinc-500 text-center">
        Carregando estrutura...
      </div>
    );

  const handleAdicionarJogadorNoPote = (
    poteDestinoId: string,
    jogadorId: string,
    nome: string
  ) => {
    setPotes((prevPotes) => {
      const novosPotes = prevPotes.map((pote) => ({
        ...pote,
        jogadores: pote.jogadores.filter((j) => j.id !== jogadorId),
      }));

      const idxDestino = novosPotes.findIndex((p) => p.id === poteDestinoId);

      if (idxDestino !== -1) {
        novosPotes[idxDestino].jogadores.push({
          id: jogadorId,
          nome: nome,
          pote: Number(poteDestinoId),
          rankNoPote: novosPotes[idxDestino].jogadores.length + 1,
        });

        return novosPotes.map((pote) => ({
          ...pote,
          jogadores: pote.jogadores.map((j, idx) => ({
            ...j,
            rankNoPote: idx + 1,
          })),
        }));
      }

      return novosPotes;
    });
  };

  return (
    <div className="flex flex-col mt-8 container mx-auto px-8 py-8 space-y-4">
      <Card className="shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between py-2 px-6 gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-zinc-100 tracking-tight">
              Organizar Potes
            </h1>
            <p className="text-sm text-zinc-500 max-w-md">
              Arraste os jogadores para reordenar o ranking ou mudar de pote. As
              alterações são salvas ao clicar no botão ao lado.
            </p>
          </div>

          <div className="flex items-center shrink-0">
            <LoadingButton
              onClick={() => updatePotes(potes)}
              isLoading={isPending}
              className="w-full md:w-auto gap-2"
            >
              <IconDeviceFloppy size={20} />
              Salvar Ranking
            </LoadingButton>
          </div>
        </div>
      </Card>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {potes.map((pote) => (
            <PoteColuna
              key={pote.id}
              pote={pote}
              onAdicionarJogador={handleAdicionarJogadorNoPote}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
