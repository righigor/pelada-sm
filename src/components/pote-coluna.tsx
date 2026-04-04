import { Droppable } from "@hello-pangea/dnd";
import type { PoteType } from "@/types/potes/Potes";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JogadorCardPote } from "./jogador-card-pote";
import { AddJogadorDialog } from "./dialog-add-jogador-pote";

interface Props {
  pote: PoteType;
  onAdicionarJogador: (poteId: string, jogadorId: string, nome: string) => void;
}

export function PoteColuna({ pote, onAdicionarJogador }: Props) {
  return (
    <Card className="flex flex-col h-full min-h-[500px]">
      <CardHeader className="p-4 border-b border-zinc-800 space-y-0 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <CardTitle className="text-md font-bold text-zinc-100">
            {pote.nome}
          </CardTitle>
          <Badge
            variant="secondary"
            className="text-zinc-200 text-[10px] px-1.5 py-0"
          >
            {pote.jogadores.length}
          </Badge>
        </div>

        <div className="flex items-center">
          <AddJogadorDialog
            onAdicionar={(id, nome) => onAdicionarJogador(pote.id, id, nome)}
          />
        </div>
      </CardHeader>

      <Droppable droppableId={pote.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 p-3 transition-colors ${
              snapshot.isDraggingOver ? "bg-zinc-900/30" : ""
            }`}
          >
            {pote.jogadores.map((jogador, index) => (
              <JogadorCardPote
                key={jogador.id}
                jogador={jogador}
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Card>
  );
}
