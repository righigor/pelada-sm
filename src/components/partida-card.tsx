import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "./ui/avatar";
import { TrophyIcon } from 'lucide-react'
import { formatDate } from "@/utils/format-date";
import type { PartidaByIDResponseType } from "@/types/partida/PartidaById";

interface PartidaCardProps {
  partida: PartidaByIDResponseType;
}

export default function PartidaCard({ partida }: PartidaCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      className="mb-4 p-4 flex flex-row justify-between items-center cursor-pointer hover:scale-105 transition-transform duration-500"
      onClick={() => navigate(`/partida/${partida.id}`)}
    >
      <div className="flex gap-2 md:gap-4 items-center">
        <Avatar className="size-18 rounded-sm ">
          <AvatarImage src="/sm.webp" className="object-cover" />
        </Avatar>
        <h2 className="text-sm md:text-2xl font-bold">
          {formatDate(partida.dataPartida)}
        </h2>
      </div>

      <div>
        {partida.resumoPartida.artilheiro ? (
          <div className="text-xs md:text-lg flex items-center flex-col gap-2 md:flex-row">
            <TrophyIcon className="inline-block size-5 md:w-5 md:h-5 mr-1 text-yellow-500" />
            <span className="md:font-semibold">{partida.resumoPartida.artilheiro?.nome} ({partida.resumoPartida.artilheiro?.stat} gols)</span>
          </div>
        ) : (
          <p className="text-xs md:text-lg">Sem artilheiro</p>
        )}
      </div>
    </Card>
  );
}
