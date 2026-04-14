import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, GripVertical } from "lucide-react";
import type {
  JogadorEstatistica,
  TimeData,
} from "@/types/partida/Estatisticas";
import type { PartidaKey } from "@/types/PartidaStore";
import type { JogadorNewResponseType } from "@/types/jogadores/Jogador";
import { DialogAdicionarJogador } from "./dialog-adicionar-jogador";

interface JogadorComId extends JogadorEstatistica {
  id: string;
}

interface QuadroProps {
  times: Record<PartidaKey, TimeData>;
  setTimes: (times: Record<PartidaKey, TimeData>) => void;
  listaAtletas: JogadorNewResponseType[];
  removerJogador: (timeKey: PartidaKey, jogadorId: string) => void;
  adicionarJogador: (timeKey: PartidaKey, atletaId: string) => void;
}

const useStrictModeDroppable = () => {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);
  return enabled;
};

export function QuadroEdicaoTimes({
  times,
  setTimes,
  listaAtletas,
  removerJogador,
  adicionarJogador,
}: QuadroProps) {
  const enabled = useStrictModeDroppable();
  const nomesTimes: PartidaKey[] = [
    "azul",
    "preto",
    "branco",
    "vermelho",
    "goleiros",
  ];

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const sourceKey = source.droppableId as PartidaKey;
    const destKey = destination.droppableId as PartidaKey;
    const sourceArray: JogadorComId[] = Object.entries(
      times[sourceKey].jogadores
    ).map(([id, dados]) => ({ id, ...dados }));

    const destArray: JogadorComId[] =
      sourceKey === destKey
        ? sourceArray
        : Object.entries(times[destKey].jogadores).map(([id, dados]) => ({
            id,
            ...dados,
          }));
    const [movedItem] = sourceArray.splice(source.index, 1);
    destArray.splice(destination.index, 0, movedItem);

    const extrairDados = (arr: JogadorComId[]) => {
      return Object.fromEntries(arr.map(({ id, ...rest }) => [id, rest]));
    };

    const novosTimes: Record<PartidaKey, TimeData> = { ...times };

    novosTimes[sourceKey] = {
      ...novosTimes[sourceKey],
      jogadores: extrairDados(sourceArray),
    };

    novosTimes[destKey] = {
      ...novosTimes[destKey],
      jogadores: extrairDados(destArray),
    };

    setTimes(novosTimes);
  };

  if (!enabled) return null;

  const obterAtletasDisponiveis = () => {
    const idsEscalados = new Set(
      Object.values(times).flatMap((time) => Object.keys(time.jogadores))
    );
    return listaAtletas.filter((atleta) => !idsEscalados.has(atleta.id));
  };

  const disponiveis = obterAtletasDisponiveis();

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {nomesTimes.map((cor) => {
          const jogadores = Object.entries(times[cor].jogadores).map(
            ([id, dados]) => ({ id, ...dados })
          );

          return (
            <Card
              key={cor}
              className="overflow-hidden border-2 bg-slate-900 border-slate-800 flex flex-col"
            >
              <CardHeader className="py-3 px-4 border-b border-slate-800">
                <CardTitle className="text-lg font-bold uppercase flex justify-between items-center tracking-tighter">
                  {cor}
                  <Badge
                    variant="secondary"
                    className="bg-slate-700 text-white border-none font-mono"
                  >
                    {jogadores.length}
                  </Badge>
                </CardTitle>
              </CardHeader>

              <Droppable droppableId={cor}>
                {(provided, snapshot) => (
                  <CardContent
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`p-2 space-y-2 min-h-[400px] grow flex flex-col transition-colors ${
                      snapshot.isDraggingOver
                        ? "bg-slate-800/60"
                        : "bg-slate-850"
                    }`}
                  >
                    {jogadores.map((jog, index) => (
                      <Draggable
                        key={jog.id}
                        draggableId={jog.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`flex items-center justify-between p-3 border rounded-lg shadow-xl transition-all ${
                              snapshot.isDragging
                                ? " bg-slate-700 scale-105 z-50"
                                : "border-slate-700 bg-slate-800 hover:border-slate-500"
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <GripVertical className="h-4 w-4 text-slate-500 shrink-0" />
                              <span className="text-sm truncate tracking-tight">
                                {jog.nome}
                              </span>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removerJogador(cor, jog.id)}
                              className="h-8 w-8 text-slate-500 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}

                    <DialogAdicionarJogador
                      disponiveis={disponiveis}
                      onAdicionar={(atletaId) =>
                        adicionarJogador(cor, atletaId)
                      }
                    />
                  </CardContent>
                )}
              </Droppable>
            </Card>
          );
        })}
      </div>
    </DragDropContext>
  );
}
