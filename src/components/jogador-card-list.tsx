import { Card } from "@/components/ui/card";
import { IconBallFootball, IconShield, IconShoe } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import AvatarLoad from "./avatar-load";
import type { JogadorNewResponseType } from "@/types/jogadores/Jogador";

interface JogadorItemProps {
  jogador: JogadorNewResponseType;
}

export default function JogadorCardList({ jogador }: JogadorItemProps) {
  const navigate = useNavigate();
  const avatarSizeClasses = "w-14 h-14 md:w-20 md:h-20";

  const stats = jogador.stats || {
    gols: 0,
    assistencias: 0,
    golsContra: 0,
    defesasDificeis: 0,
  };

  return (
    <Card className="mb-4 p-4 flex flex-row justify-between items-center cursor-pointer hover:scale-105 transition-transform duration-500" onClick={() => navigate(`/jogadores/${jogador.id}`)}>
      <div className="flex gap-2 md:gap-4 items-center">
        <AvatarLoad jogador={jogador} avatarSizeClasses={avatarSizeClasses} />
        <h2 className="md:text-xl text-xs font-bold">{jogador.nome}
        </h2>
      </div>

      <div className="flex gap-4 items-center md:gap-8">
        <div className="flex items-center">
          <strong className="text-xs md:text-xl">{stats.gols}</strong>
          <IconBallFootball className="inline-block ml-1 size-4 md:size-6" />
        </div>
        <div className="flex items-center">
          <strong className="text-xs md:text-xl">{stats.assistencias}</strong>
          <IconShoe className="inline-block ml-1 size-4 md:size-6" />
        </div>
        <div className="flex items-center">
          <strong className="text-xs md:text-xl">{stats.golsContra}</strong>
          <IconBallFootball className="inline-block ml-1 text-red-700 size-4 md:size-6" />
        </div>
        {stats.defesasDificeis > 0 && (
          <div className="flex items-center">
            <strong className="text-xs md:text-xl">{stats.defesasDificeis}</strong>
            <IconShield className="inline-block ml-1 text-blue-700 size-4 md:size-6" />
          </div>
        )}
      </div>
    </Card>
  );
}
