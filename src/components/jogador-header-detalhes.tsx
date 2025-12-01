import type { JogadorDetails } from "@/queries/jogadores/get-jogador-by-id";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconBallFootball, IconShoe, IconMoodSad } from "@tabler/icons-react";
import AvatarLoad from "@/components/avatar-load";

interface JogadorHeaderDetalhesProps {
  jogador: JogadorDetails;
}

const StatItem: React.FC<{
  label: string;
  total: number;
  average: number;
  icon: React.ReactNode;
}> = ({ label, total, average, icon }) => (
  <div className="flex justify-between items-center py-2 gap-12 md:gap-24 border-b last:border-b-0">
    <div className="flex items-center space-x-4">
      {icon}
      <span className="font-medium text-gray-300">{label}</span>
    </div>
    <div className="text-right flex flex-col items-end">
      <p className="text-lg font-bold">{total}</p>
      <p className="text-xs text-gray-400">Média: {average}</p>
    </div>
  </div>
);


export default function JogadorHeaderDetalhes({ jogador }: JogadorHeaderDetalhesProps) {
  return (
    <Card className="mx-auto mt-10">
      <CardHeader className="flex flex-col items-center">
        <CardTitle className=" text-xl md:text-3xl font-bold">
          {jogador.nome}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col md:flex-row items-center justify-center mb-4 gap-10 md:gap-24">
          <AvatarLoad
            jogador={jogador}
            avatarSizeClasses="w-44 h-44 md:w-64 md:h-64 rounded-full object-cover shadow-md"
          />
          <div>
            <p className="text-center text-sm md:text-xl font-semibold mb-2">
              {jogador.partidas}{" "}
              {jogador.partidas === 1 ? "Partida Jogada" : "Partidas Jogadas"}
            </p>
            <div className="space-y-2">
              <StatItem
                label="Gols Totais"
                total={jogador.gols}
                average={jogador.mediaGols}
                icon={<IconBallFootball className="w-5 h-5" />}
              />
              <StatItem
                label="Assistências Totais"
                total={jogador.assistencias}
                average={jogador.mediaAssistencias}
                icon={<IconShoe className="w-5 h-5" />}
              />
              <StatItem
                label="Gols Contra Totais"
                total={jogador.golContra}
                average={jogador.mediaGolContra}
                icon={<IconMoodSad className="w-5 h-5 text-red-500" />}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}