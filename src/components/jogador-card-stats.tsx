import type { JogadorResponseType } from "@/types/jogadores/Jogador";
import AvatarLoad from "./avatar-load";
import { Card } from "./ui/card";
import StatsCounter from "./stats-counter";
import { IconBallFootball, IconShoe } from "@tabler/icons-react";
import type { EstatisticaPartida } from "@/types/Partida";


interface JogadorCardStatsProps {
  jogador: JogadorResponseType;
  handleUpdate: (
    jogadorId: string,
    tipo: "gols" | "assistencias" | "golContra",
    value: number
  ) => void;
  estatisticas: { [jogadorId: string]: EstatisticaPartida };
}

export default function JogadorCardStats({
  jogador,
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
          tipo="gols"
          label="Gols"
          Icone={IconBallFootball}
          cor="text-white"
          value={estatisticas[jogador.id]?.gols || 0}
          onUpdate={handleUpdate}
        />
        <StatsCounter
          jogadorId={jogador.id}
          tipo="assistencias"
          label="Assistências"
          Icone={IconShoe}
          cor="text-white"
          value={estatisticas[jogador.id]?.assistencias || 0}
          onUpdate={handleUpdate}
        />
        <StatsCounter
          jogadorId={jogador.id}
          tipo="golContra"
          label="Gol Contra"
          Icone={IconBallFootball}
          cor="text-red-500"
          value={estatisticas[jogador.id]?.golContra || 0}
          onUpdate={handleUpdate}
        />
      </div>
    </Card>
  );
}
