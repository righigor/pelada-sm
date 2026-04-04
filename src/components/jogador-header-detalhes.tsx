import type { JogadorDetails } from "@/queries/jogadores/get-jogador-by-id";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  IconBallFootball,
  IconShoe,
  IconMoodSad,
  IconShield,
  IconTrophy,
  IconStar,
} from "@tabler/icons-react";
import AvatarLoad from "@/components/avatar-load";
import type { JogadorDetalhesStatsType } from "@/types/jogadores/Jogador";

interface JogadorHeaderDetalhesProps {
  jogador: JogadorDetails;
  statsExibicao: JogadorDetalhesStatsType;
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

export default function JogadorHeaderDetalhes({
  jogador,
  statsExibicao,
}: JogadorHeaderDetalhesProps) {
  const totalPartidas = statsExibicao.partidas || 0;
  const calcMedia = (val: number) =>
    totalPartidas > 0 ? (val / totalPartidas).toFixed(2) : "0.00";

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
            avatarSizeClasses="w-1/2 h-full md:w-1/3 lg:w-1/3 rounded-full object-cover shadow-md"
          />
          <div>
            <p className="text-center text-sm md:text-xl font-semibold mb-2">
              {totalPartidas}{" "}
              {totalPartidas === 1 ? "Partida Jogada" : "Partidas Jogadas"}
            </p>
            <div className="space-y-2">
              <StatItem
                label="Gols"
                total={statsExibicao.gols}
                average={Number(calcMedia(statsExibicao.gols))}
                icon={<IconBallFootball />}
              />
              <StatItem
                label="Assistências"
                total={statsExibicao.assistencias}
                average={Number(calcMedia(statsExibicao.assistencias))}
                icon={<IconShoe />}
              />
              <StatItem
                label="Gols Contra"
                total={statsExibicao.golsContra}
                average={Number(calcMedia(statsExibicao.golsContra))}
                icon={<IconMoodSad className="text-red-500" />}
              />
              <StatItem
                label="MVP da Pelada"
                total={statsExibicao.mvpsGeral || 0}
                average={Number(calcMedia(statsExibicao.mvpsGeral || 0))}
                icon={<IconTrophy className="w-5 h-5 text-yellow-500" />}
              />
              <StatItem
                label="Melhor do Time"
                total={statsExibicao.mvpsPorTime || 0}
                average={Number(calcMedia(statsExibicao.mvpsPorTime || 0))}
                icon={<IconStar className="w-5 h-5 text-blue-400" />}
              />
              {statsExibicao.defesasDificeis > 0 && (
                <StatItem
                  label="Defesas"
                  total={statsExibicao.defesasDificeis}
                  average={Number(calcMedia(statsExibicao.defesasDificeis))}
                  icon={<IconShield className="text-blue-500" />}
                />
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
