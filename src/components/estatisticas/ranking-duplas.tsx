import { useMemo } from "react";
import { Users, Zap } from "lucide-react";
import {
  calcularRankingDuplas,
} from "@/utils/estatisticas/duplas-helper";
import { filtrarPartidasFinalizadas } from "@/utils/estatisticas/helpers";
import ListaDuplas from "./lista-duplas";
import type { JogadorNewResponseType } from "@/types/jogadores/Jogador";
import type { AllPartidasResponse } from "@/queries/partida/get-all-partidas";
import DuplasSkeleton from "./skeleton/duplas-skeleton";
import DuplasError from "./errors/duplas-error";

interface RankingDuplasProps {
  jogadores: JogadorNewResponseType[] | undefined;
  isLoading: boolean;
  partidas: AllPartidasResponse | undefined;
}

export function RankingDuplas({isLoading, jogadores, partidas}: RankingDuplasProps) {
  const partidasFinalizadas = useMemo(() => {
    return partidas ? filtrarPartidasFinalizadas(partidas) : [];
  }, [partidas]);

  const rankings = useMemo(() => {
    if (!jogadores) return null;
    return calcularRankingDuplas(jogadores, partidasFinalizadas);
  }, [jogadores, partidasFinalizadas]);

  if (isLoading) {
    return <DuplasSkeleton />
  }

  if (!rankings) {
    return <DuplasError />
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <ListaDuplas
        titulo="Top 10 Mais Vezes Juntos"
        icone={Users}
        dados={rankings.porFrequencia}
        mostrarGA={false}
      />
      <ListaDuplas
        titulo="Top 10 G/A Juntos"
        icone={Zap}
        dados={rankings.porGA}
        mostrarGA={true}
      />
    </div>
  );
}
