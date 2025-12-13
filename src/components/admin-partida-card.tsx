import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage } from "./ui/avatar";
import { formatDate } from "@/utils/format-date";
import { useDeletePartida } from "@/hooks/partida/use-delete-partida";
import { ConfirmDeletePartida } from "./confirm-delete-partida";
import type { PartidaByIDResponseType } from "@/types/partida/PartidaById";

interface PartidaCardProps {
  partida: PartidaByIDResponseType;
}

export default function AdminPartidaCard({ partida }: PartidaCardProps) {
  const { mutate, isPending } = useDeletePartida();
  
  return (
    <Card className="mb-4 p-4 flex flex-row justify-between items-center transition-transform duration-500">
      <div className="flex gap-2 md:gap-4 items-center">
        <Avatar className="size-18 rounded-sm ">
          <AvatarImage src="/sm.webp" className="object-cover" />
        </Avatar>
        <h2 className="text-sm md:text-2xl font-bold">
          {formatDate(partida.dataPartida)}
        </h2>
      </div>

      <div>
        <ConfirmDeletePartida
          mutate={mutate}
          isLoading={isPending}
          partidaId={partida.id}
        />
      </div>
    </Card>
  );
}
