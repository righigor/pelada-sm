import { useMemo } from "react";
import type { JogadorNewResponseType } from "@/types/jogadores/Jogador";
import { Target, Handshake, Trophy } from "lucide-react";
import { getTopNRanking } from "@/utils/estatisticas/mvp-helper";
import Top5Skeleton from "./skeleton/top-5-skeleton";
import ListaTop5 from "./lista-top-5";

interface Top5PeladaProps {
  jogadores: JogadorNewResponseType[] | undefined;
  isLoading: boolean;
}

export function Top5Pelada({ jogadores, isLoading }: Top5PeladaProps) {
  const topGols = useMemo(() => {
    if (!jogadores) return [];
    return getTopNRanking(jogadores, "gols", 5);
  }, [jogadores]);

  const topAssist = useMemo(() => {
    if (!jogadores) return [];
    return getTopNRanking(jogadores, "assistencias", 5);
  }, [jogadores]);

  const topMvp = useMemo(() => {
    if (!jogadores) return [];
    return getTopNRanking(jogadores, "mvpsGeral", 5);
  }, [jogadores]);

  const topMvpTime = useMemo(() => {
    if (!jogadores) return [];
    return getTopNRanking(jogadores, "mvpsPorTime", 5);
  }, [jogadores]);

  if (isLoading) {
    return <Top5Skeleton />
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <ListaTop5
        titulo="Top 5 Gols"
        icone={Target}
        dados={topGols}
        corValor="text-emerald-600 dark:text-emerald-400"
      />
      <ListaTop5
        titulo="Top 5 Assistências"
        icone={Handshake}
        dados={topAssist}
        corValor="text-blue-600 dark:text-blue-400"
      />
      <ListaTop5
        titulo="Top 5 MVPs"
        icone={Trophy}
        dados={topMvp}
        corValor="text-amber-600 dark:text-amber-400"
      />

      <ListaTop5
        titulo="Top 5 MVPs"
        icone={Trophy}
        dados={topMvpTime}
        corValor="text-amber-600 dark:text-amber-400"
      />
    </div>
  );
}