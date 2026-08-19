import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { IconBallFootball, IconShield, IconShoe } from "@tabler/icons-react";
import AvatarLoad from "./avatar-load";
import type { JogadorNewResponseType } from "@/types/jogadores/Jogador";
import { useMemo } from "react";
import InjuredBandage from "./injured-badge";

interface JogadorItemProps {
  jogador: JogadorNewResponseType;
  temporadaFiltro: string;
}

export default function JogadorCardList({
  jogador,
  temporadaFiltro,
}: JogadorItemProps) {
  const avatarSizeClasses = "w-14 h-14 md:w-20 md:h-20";

  const statsVazios = {
    gols: 0,
    assistencias: 0,
    golsContra: 0,
    defesasDificeis: 0,
    partidas: 0,
  };

  const stats = useMemo(() => {
    if (!jogador?.stats) return statsVazios;

    if (temporadaFiltro === "all") {
      return jogador.stats;
    }

    return jogador.stats.temporadas?.[temporadaFiltro] || statsVazios;
  }, [jogador, temporadaFiltro]);

  return (
    <Card className="relative mb-4 flex cursor-pointer flex-row items-center justify-between overflow-visible p-4 transition-transform duration-500 hover:scale-105">
      <div className="flex items-center gap-2 md:gap-4">
        <div className="relative shrink-0">
          <AvatarLoad jogador={jogador} avatarSizeClasses={avatarSizeClasses} />

          {jogador.status === "LESIONADO" && <InjuredBandage />}
        </div>

        <div className="flex flex-col items-start gap-1">
          <h2 className="text-xs font-bold md:text-xl">{jogador.nome}</h2>

          {jogador.status === "LESIONADO" && (
            <Badge variant="destructive">Lesionado</Badge>
          )}

          {jogador.status === "INATIVO" && (
            <Badge variant="secondary">Inativo</Badge>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-8">
        <div className="flex items-center">
          <strong className="text-xs md:text-xl">{stats.gols}</strong>
          <IconBallFootball className="ml-1 inline-block size-4 md:size-6" />
        </div>

        <div className="flex items-center">
          <strong className="text-xs md:text-xl">{stats.assistencias}</strong>
          <IconShoe className="ml-1 inline-block size-4 md:size-6" />
        </div>

        <div className="flex items-center">
          <strong className="text-xs md:text-xl">{stats.golsContra}</strong>
          <IconBallFootball className="ml-1 inline-block size-4 text-red-700 md:size-6" />
        </div>

        {stats.defesasDificeis > 0 && (
          <div className="flex items-center">
            <strong className="text-xs md:text-xl">
              {stats.defesasDificeis}
            </strong>
            <IconShield className="ml-1 inline-block size-4 text-blue-700 md:size-6" />
          </div>
        )}
      </div>
    </Card>
  );
}
