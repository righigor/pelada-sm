import type { JogadorResponseType } from "@/types/jogadores/Jogador";
import AvatarLoad from "./avatar-load";
import { Card } from "./ui/card";
import StatsCounter from "./stats-counter";
import { IconBallFootball, IconShoe } from "@tabler/icons-react";
import type { JogadorEstatisticaStore, PartidaKey } from "@/types/PartidaStore";


interface JogadorCardStatsProps {
  jogador: JogadorResponseType;
  partidaKey: PartidaKey;
  handleUpdate: (
    partidaKey: PartidaKey,
    jogadorId: string,
    estatisticaKey: "gols" | "assistencias" | "golContra",
    value: number
  ) => void;
  estatisticas: JogadorEstatisticaStore | undefined | null;
}

export default function JogadorCardStats({
  jogador,
  partidaKey,
  handleUpdate,
  estatisticas,
}: JogadorCardStatsProps) {
  const avatarSizeClasses = "w-14 h-14 md:w-20 md:h-20";

  return (
    <Card className="mb-4 p-4 flex md:flex-row justify-between items-center">
      <div className="flex items-center gap-2">

      <AvatarLoad
        jogador={jogador}
        avatarSizeClasses={avatarSizeClasses}
      />
        <h2 className="md:text-xl text-xs font-bold">{jogador.nome}</h2>
        </div>
      <div className="ml-4 flex flex-wrap gap-2 md:flex md:items-center md:justify-between md:flex-row">
        <StatsCounter
          jogadorId={jogador.id}
          partidaKey={partidaKey}
          tipo="gols"
          label="Gols"
          Icone={IconBallFootball}
          cor="text-white"
          value={estatisticas?.gols || 0}
          onUpdate={handleUpdate}
        />
        <StatsCounter
          jogadorId={jogador.id}
          partidaKey={partidaKey}
          tipo="assistencias"
          label="Assistências"
          Icone={IconShoe}
          cor="text-white"
          value={estatisticas?.assistencias || 0}
          onUpdate={handleUpdate}
        />
        <StatsCounter
          jogadorId={jogador.id}
          partidaKey={partidaKey}
          tipo="golContra"
          label="Gol Contra"
          Icone={IconBallFootball}
          cor="text-red-500"
          value={estatisticas?.golContra || 0}
          onUpdate={handleUpdate}
        />
      </div>
    </Card>
  );
}
