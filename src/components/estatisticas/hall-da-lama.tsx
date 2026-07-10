import { calcularPioresDesempenhos } from "@/utils/estatisticas/hall-helper";
import { filtrarPartidasFinalizadas } from "@/utils/estatisticas/helpers";
import { useMemo } from "react";
import CardPioresHallDaLama from "./card-piores-hall-da-lama";
import type { AllPartidasResponse } from "@/queries/partida/get-all-partidas";
import type { JogadorNewResponseType } from "@/types/jogadores/Jogador";
import HallSkeleton from "./skeleton/hall-skeleton";
import HallError from "./errors/hall-error";

interface HallDaLamaProps {
  jogadores: JogadorNewResponseType[] | undefined;
  partidas: AllPartidasResponse | undefined;
  isLoading: boolean;
}

export function HallDaLama({
  jogadores,
  partidas,
  isLoading,
}: HallDaLamaProps) {
  const partidasFinalizadas = useMemo(() => {
    return partidas ? filtrarPartidasFinalizadas(partidas) : [];
  }, [partidas]);

  const totalPartidas = partidasFinalizadas.length;
  const jogosMinimos = Math.floor(totalPartidas * 0.3);

  const piores = useMemo(() => {
    if (!jogadores) return null;
    return calcularPioresDesempenhos(jogadores, totalPartidas);
  }, [jogadores, totalPartidas]);

  if (isLoading || !piores) {
    return <HallSkeleton />;
  }

  if (jogosMinimos === 0) {
    return (
      <HallError message="Não há partidas suficientes para calcular o Hall da Lama. É necessário ter pelo menos 1 partida finalizada." />
    );
  }

  if (!jogadores || jogadores.length === 0) {
    return (
      <HallError message="Não foi encontrado nenhum jogador para calcular o Hall da Lama." />
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <CardPioresHallDaLama
        categoria="menosGols"
        destaque={piores.menosGols}
        jogosMinimos={jogosMinimos}
        jogadores={jogadores}
      />
      <CardPioresHallDaLama
        categoria="menosAssistencias"
        destaque={piores.menosAssistencias}
        jogosMinimos={jogosMinimos}
        jogadores={jogadores}
      />
      <CardPioresHallDaLama
        categoria="menosGATotal"
        destaque={piores.menosGATotal}
        jogosMinimos={jogosMinimos}
        jogadores={jogadores}
      />
      <CardPioresHallDaLama
        categoria="menosGAMedio"
        destaque={piores.menosGAMedio}
        jogosMinimos={jogosMinimos}
        jogadores={jogadores}
      />
    </div>
  );
}
