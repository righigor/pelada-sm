import { useMemo } from "react";
import { Trophy, Medal } from "lucide-react";
import { getTopNRanking } from "@/utils/estatisticas/mvp-helper";
import ListaRanking from "./lista-ranking";
import MvpSkeleton from "./skeleton/mvp-skeleton";
import type { JogadorNewResponseType } from "@/types/jogadores/Jogador";

interface RankingMvpsProps {
  jogadores: JogadorNewResponseType[] | undefined;
  isLoading: boolean;
}

export function RankingMvps({ jogadores, isLoading }: RankingMvpsProps) {
  const topMvpGeral = useMemo(() => {
    if (!jogadores) return [];
    return getTopNRanking(jogadores, "mvpsGeral", 5);
  }, [jogadores]);

  const topMvpPorTime = useMemo(() => {
    if (!jogadores) return [];
    return getTopNRanking(jogadores, "mvpsPorTime", 5);
  }, [jogadores]);

  if (isLoading) {
    return <MvpSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <ListaRanking
        titulo="Top 5 MVP Geral"
        icone={Trophy}
        dados={topMvpGeral}
      />
      <ListaRanking
        titulo="Top 5 MVP por Time"
        icone={Medal}
        dados={topMvpPorTime}
      />
    </div>
  );
}
