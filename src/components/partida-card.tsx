import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "./ui/avatar";
import { formatDate } from "@/utils/format-date";
import type { PartidaByIDResponseType } from "@/types/partida/PartidaById";
import { PARTIDA_STATUS } from "@/utils/constants";
import { ExibeMVPPartidaCard } from "./exibe-mvp-partida-card";
import { RegistraStatsPartidaCardBtn } from "./registra-stats-partida-card-btn";

interface PartidaCardProps {
  partida: PartidaByIDResponseType;
}

export default function PartidaCard({ partida }: PartidaCardProps) {
  const navigate = useNavigate();
  const isFinalizada = partida.status === PARTIDA_STATUS.FINALIZADO;

  const handleCardClick = () => {
    if (isFinalizada) {
      navigate(`/partida/${partida.id}`);
    }else {
      navigate(`/partida/registrar-stats/${partida.id}`);
    }
  };

  return (
    <Card
      className={`mb-4 p-4 flex flex-row justify-between items-center transition-all duration-300 cursor-pointer ${
        isFinalizada ? "hover:scale-[1.02] hover:bg-slate-700/50" : ""
      }`}
      onClick={handleCardClick}
    >
      <div className="flex gap-2 md:gap-4 items-center">
        <Avatar className="size-12 md:size-16 rounded-sm">
          <AvatarImage src="/sm.webp" className="object-cover" />
        </Avatar>
        <div className="flex flex-col">
          <h2 className="text-sm md:text-xl font-bold">
            {formatDate(partida.dataPartida)}
          </h2>
          <span className="text-[10px] md:text-xs uppercase text-gray-200 font-medium">
            {isFinalizada ? null : "Em Aberto"}
          </span>
        </div>
      </div>

      <div onClick={(e) => e.stopPropagation()}>
        {isFinalizada ? (
          <ExibeMVPPartidaCard partida={partida} />
        ) : (
          <RegistraStatsPartidaCardBtn />
        )}
      </div>
    </Card>
  );
}