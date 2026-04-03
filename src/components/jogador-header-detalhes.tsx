import type { JogadorDetails } from "@/queries/jogadores/get-jogador-by-id";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  IconBallFootball,
  IconShoe,
  IconMoodSad,
  IconShield,
} from "@tabler/icons-react";
import AvatarLoad from "@/components/avatar-load";
import type { StatsJogadorType } from "@/types/jogadores/Jogador";

interface JogadorHeaderDetalhesProps {
  jogador: JogadorDetails;
  statsExibicao: Omit<StatsJogadorType, "temporadas">;
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
            avatarSizeClasses="w-44 h-44 md:w-64 md:h-64 rounded-full object-cover shadow-md"
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
