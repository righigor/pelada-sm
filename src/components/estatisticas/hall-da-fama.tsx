import { useMemo } from "react";
import { calcularHallDaFama } from "@/utils/estatisticas/hall-helper";
import CardDestaqueHallDaFama from "./card-destaque-hall-da-fama";
import HallSkeleton from "./skeleton/hall-skeleton";
import type { JogadorNewResponseType } from "@/types/jogadores/Jogador";
import HallError from "./errors/hall-error";

interface HallDaFamaProps {
  jogadores: JogadorNewResponseType[] | undefined;
  isLoading: boolean;
}

export function HallDaFama({ jogadores, isLoading }: HallDaFamaProps) {
  const hallDaFama = useMemo(() => {
    if (!jogadores) return null;
    return calcularHallDaFama(jogadores);
  }, [jogadores]);

  if (isLoading || !hallDaFama) {
    return <HallSkeleton />
  }

  if (!jogadores || jogadores.length === 0) {
    return <HallError message="Não foi encontrado nenhum jogador para calcular o Hall da Fama." />;
  }

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <CardDestaqueHallDaFama categoria="artilheiro" destaque={hallDaFama.artilheiro} jogadores={jogadores} />
      <CardDestaqueHallDaFama categoria="maiorAssistente" destaque={hallDaFama.maiorAssistente} jogadores={jogadores} />
      <CardDestaqueHallDaFama categoria="maiorGATotal" destaque={hallDaFama.maiorGATotal} jogadores={jogadores} />
      <CardDestaqueHallDaFama categoria="maiorGAMedio" destaque={hallDaFama.maiorGAMedio} jogadores={jogadores} />
      <CardDestaqueHallDaFama categoria="maisPartidas" destaque={hallDaFama.maisPartidas} jogadores={jogadores} />
      <CardDestaqueHallDaFama categoria="mvpGeral" destaque={hallDaFama.mvpGeral} jogadores={jogadores} />
      <CardDestaqueHallDaFama categoria="bagre" destaque={hallDaFama.bagre} jogadores={jogadores} />
      <CardDestaqueHallDaFama categoria="paredao" destaque={hallDaFama.paredao} jogadores={jogadores} />
    </div>
  );
}