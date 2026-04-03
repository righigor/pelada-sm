import type { PartidaByIDResponseType } from "@/types/partida/PartidaById";
import { TrophyIcon } from "lucide-react";

interface ExibeMVPPartidaCardProps {
  partida: PartidaByIDResponseType;
}

export function ExibeMVPPartidaCard({ partida }: ExibeMVPPartidaCardProps) {
  return (
    <div>
      {partida.resumoPartida.artilheiro ? (
        <div className="text-xs md:text-lg flex items-center flex-col gap-2 md:flex-row">
          <TrophyIcon className="inline-block size-5 md:w-5 md:h-5 mr-1 text-yellow-500" />
          <span className="md:font-semibold">{`MVP: ${partida.resumoPartida.mvpGeral?.nome}`}</span>
        </div>
      ) : (
        <p className="text-xs md:text-lg">Ninguém foi eleito MVP</p>
      )}
    </div>
  );
}
