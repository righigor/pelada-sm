import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calcularMediasGerais, calcularRecordesPartida, filtrarPartidasFinalizadas } from "@/utils/estatisticas/helpers";
import {
  Trophy,
  Target,
  Calculator,
  Users,
  Flame,
  Handshake,
} from "lucide-react";
import { useMemo } from "react";
import HeroSkeleton from "./skeleton/hero-skeleton";
import type { AllPartidasResponse } from "@/queries/partida/get-all-partidas";
import HeroError from "./errors/hero-error";

interface HeroStatsProps {
  partidas: AllPartidasResponse | undefined;
  isLoading: boolean;
}

export function HeroStats({ partidas, isLoading }: HeroStatsProps) {
    const partidasFinalizadas = useMemo(() => {
    return partidas ? filtrarPartidasFinalizadas(partidas) : [];
  }, [partidas]);

  const medias = useMemo(() => {
    return calcularMediasGerais(partidasFinalizadas);
  }, [partidasFinalizadas]);

  const recordes = useMemo(() => {
    return calcularRecordesPartida(partidasFinalizadas);
  }, [partidasFinalizadas]);

  const cards = [
    {
      titulo: "Total de Partidas",
      valor: medias.totalPartidas.toString(),
      icone: Trophy,
      cor: "text-amber-600",
      bg: "bg-amber-50 dark:bg-amber-950/30",
    },
    {
      titulo: "Total de Gols",
      valor: medias.totalGols.toString(),
      icone: Target,
      cor: "text-emerald-600",
      bg: "bg-emerald-50 dark:bg-emerald-950/30",
    },
    {
      titulo: "Média de Gols/Jogo",
      valor: medias.mediaGolsPorPartida.toString(),
      icone: Calculator,
      cor: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      titulo: "Média de Jogadores/Jogo",
      valor: medias.mediaJogadoresPorPartida.toString(),
      icone: Users,
      cor: "text-violet-600",
      bg: "bg-violet-50 dark:bg-violet-950/30",
    },
    {
      titulo: "Recorde de Gols em uma Partida",
      valor: recordes.recordeGols ? recordes.recordeGols.valor.toString() : "—",
      descricao: recordes.recordeGols ? recordes.recordeGols.jogadorNome : "Nenhum registro",
      icone: Flame,
      cor: "text-orange-600",
      bg: "bg-orange-50 dark:bg-orange-950/30",
    },
    {
      titulo: "Recorde de Assistências em uma Partida",
      valor: recordes.recordeAssistencias ? recordes.recordeAssistencias.valor.toString() : "—",
      descricao: recordes.recordeAssistencias ? recordes.recordeAssistencias.jogadorNome : "Nenhum registro",
      icone: Handshake,
      cor: "text-pink-600",
      bg: "bg-pink-50 dark:bg-pink-950/30",
    },
  ];

  if (isLoading) {
    <HeroSkeleton />
  }

  if (!partidas || partidas.length === 0) {
    return <HeroError />
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.titulo} className={card.bg}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {card.titulo}
            </CardTitle>
            <card.icone className={`h-4 w-4 ${card.cor}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${card.cor}`}>{card.valor}</div>
            {card.descricao && (
              <p className="mt-1 truncate text-xs text-muted-foreground">
                {card.descricao}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}