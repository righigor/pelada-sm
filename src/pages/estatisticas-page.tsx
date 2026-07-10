import { FieloesTimes } from "@/components/estatisticas/fiel-stats";
import { HallDaFama } from "@/components/estatisticas/hall-da-fama";
import { HallDaLama } from "@/components/estatisticas/hall-da-lama";
import { HeroStats } from "@/components/estatisticas/hero-stats";
import { RankingDuplas } from "@/components/estatisticas/ranking-duplas";
import { RankingMvps } from "@/components/estatisticas/ranking-mvps";
import { TabelaEstatisticas } from "@/components/estatisticas/tabela-stats";
import { Separator } from "@/components/ui/separator";
import { useGetAllJogadores } from "@/hooks/jogadores/use-get-all-jogadores";
import { useGetAllPartidas } from "@/hooks/partida/use-get-all-partidas";

export function EstatisticasPage() {
  const { data: partidas, isPending: isPartidasLoading } = useGetAllPartidas();
  const { data: jogadores, isPending: isJogadoresLoading } = useGetAllJogadores();


  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Estatísticas
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Números gerais, recordes e rankings da pelada.
        </p>
      </div>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">Visão Geral</h2>
        <HeroStats partidas={partidas} isLoading={isPartidasLoading} />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">
          Destaques Individuais
        </h2>
        <div className="space-y-4">
          <HallDaFama jogadores={jogadores} isLoading={isJogadoresLoading} />
          <RankingMvps jogadores={jogadores} isLoading={isJogadoresLoading} />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">Hall da Lama</h2>
        <HallDaLama jogadores={jogadores} partidas={partidas} isLoading={isJogadoresLoading || isPartidasLoading} />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">
          Ranking dos Jogadores
        </h2>
        <TabelaEstatisticas jogadores={jogadores} isLoading={isJogadoresLoading} />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">
          Mais vezes Representando o Time
        </h2>
        <FieloesTimes jogadores={jogadores} isLoading={isJogadoresLoading} />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">
          As Duplas Dinâmicas
        </h2>
        <RankingDuplas isLoading={isJogadoresLoading} jogadores={jogadores} partidas={partidas} />
      </section>
    </div>
  );
}
