import { useMemo, useState } from "react";
import { FieloesTimes } from "@/components/estatisticas/fiel-stats";
import { HallDaFama } from "@/components/estatisticas/hall-da-fama";
import { HallDaLama } from "@/components/estatisticas/hall-da-lama";
import { HeroStats } from "@/components/estatisticas/hero-stats";
import { RankingDuplas } from "@/components/estatisticas/ranking-duplas";
import { TabelaEstatisticas } from "@/components/estatisticas/tabela-stats";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllJogadores } from "@/hooks/jogadores/use-get-all-jogadores";
import { useGetAllPartidas } from "@/hooks/partida/use-get-all-partidas";
import type {
  JogadorNewResponseType,
  StatsJogadorType,
} from "@/types/jogadores/Jogador";
import type { PartidaByIDResponseType } from "@/types/partida/PartidaById";
import { Top5Pelada } from "@/components/estatisticas/top-5-pelada";

const STATS_VAZIOS: StatsJogadorType = {
  gols: 0,
  assistencias: 0,
  golsContra: 0,
  partidas: 0,
  defesasDificeis: 0,
  mvpsGeral: 0,
  mvpsPorTime: 0,
  times: {
    azul: null,
    preto: null,
    branco: null,
    vermelho: null,
    goleiros: null,
  },
  companheiros: {},
  temporadas: {},
};

export function EstatisticasPage() {
  const { data: partidas, isPending: isPartidasLoading } = useGetAllPartidas();
  const { data: jogadores, isPending: isJogadoresLoading } =
    useGetAllJogadores();

  const [temporadaSelecionada, setTemporadaSelecionada] =
    useState<string>("geral");

  const anosDisponiveis = useMemo(() => {
    if (!partidas) return [];
    const anosSet = new Set<string>();

    partidas.forEach((p) => {
      const dateObj =
        typeof p.dataPartida?.toDate === "function"
          ? p.dataPartida.toDate()
          : new Date((p.dataPartida?.seconds ?? 0) * 1000);

      anosSet.add(dateObj.getFullYear().toString());
    });
    return Array.from(anosSet).sort((a, b) => Number(b) - Number(a));
  }, [partidas]);

  const partidasFiltradas = useMemo((): PartidaByIDResponseType[] => {
    if (!partidas) return [];
    if (temporadaSelecionada === "geral") return partidas;

    return partidas.filter((p) => {
      const dateObj =
        typeof p.dataPartida?.toDate === "function"
          ? p.dataPartida.toDate()
          : new Date((p.dataPartida?.seconds ?? 0) * 1000);

      return dateObj.getFullYear().toString() === temporadaSelecionada;
    });
  }, [partidas, temporadaSelecionada]);

  const jogadoresFiltrados = useMemo((): JogadorNewResponseType[] => {
    if (!jogadores) return [];
    if (temporadaSelecionada === "geral") return jogadores;

    return jogadores.map((j) => {
      const statsDaTemporada = j.stats?.temporadas?.[temporadaSelecionada];

      return {
        ...j,
        stats: statsDaTemporada
          ? { ...statsDaTemporada, temporadas: j.stats.temporadas }
          : STATS_VAZIOS,
      };
    });
  }, [jogadores, temporadaSelecionada]);

  const isLoading = isPartidasLoading || isJogadoresLoading;

  console.log(jogadoresFiltrados);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      {/* Header com Filtro */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Estatísticas
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Números gerais, recordes e rankings da pelada.
          </p>
        </div>

        <Select
          value={temporadaSelecionada}
          onValueChange={setTemporadaSelecionada}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Selecione a temporada" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="geral">Histórico Geral</SelectItem>
            {anosDisponiveis.map((ano) => (
              <SelectItem key={ano} value={ano}>
                Temporada {ano}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Seções passando os DADOS FILTRADOS */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">Visão Geral</h2>
        <HeroStats partidas={partidasFiltradas} isLoading={isPartidasLoading} />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">Hall da Fama</h2>

          <HallDaFama jogadores={jogadoresFiltrados} isLoading={isLoading} />
       
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">Hall da Lama</h2>
        <HallDaLama
          jogadores={jogadoresFiltrados}
          partidas={partidasFiltradas}
          isLoading={isLoading}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">Os Tops 5 da pelada</h2>


        <Top5Pelada jogadores={jogadoresFiltrados} isLoading={isLoading} />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">
          Ranking dos Jogadores
        </h2>
        <TabelaEstatisticas
          jogadores={jogadoresFiltrados}
          isLoading={isLoading}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">
          Mais vezes Representando o Time
        </h2>
        <FieloesTimes jogadores={jogadoresFiltrados} isLoading={isLoading} />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">
          As Duplas Dinâmicas
        </h2>
        <RankingDuplas
          isLoading={isLoading}
          jogadores={jogadoresFiltrados}
          partidas={partidasFiltradas}
        />
      </section>
    </div>
  );
}
