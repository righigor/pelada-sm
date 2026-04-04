import type { JogadorNoPote } from "@/types/potes/Potes";
import { Draggable } from "@hello-pangea/dnd";

interface Props {
  jogador: JogadorNoPote;
  index: number;
}

export function JogadorCardPote({ jogador, index }: Props) {
  return (
    <Draggable draggableId={jogador.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-800 mb-2 transition-shadow ${
            snapshot.isDragging ? "shadow-2xl border-primary ring-1 ring-primary/50" : ""
          }`}
        >
          <div className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-zinc-800 text-[10px] font-bold text-zinc-400">
            {jogador.rankNoPote}
          </div>
          <span className="text-sm font-medium text-zinc-200 truncate">
            {jogador.nome}
          </span>
        </div>
      )}
    </Draggable>
  );
}