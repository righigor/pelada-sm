/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from "recharts";
import type { JogadorNewResponseType } from "@/types/jogadores/Jogador";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import type { StatField } from "@/types/partida/Estatisticas";

interface RankingCardProps {
  title: string;
  icon: React.ReactNode;
  data: JogadorNewResponseType[];
  isLoading: boolean;
  dataKey: StatField;
  temporada?: string;
  unit: string;
  color: string;
}

export default function RankingCard({
  title,
  icon,
  data,
  isLoading,
  dataKey,
  temporada,
  unit,
}: RankingCardProps) {
  const RANK_COLORS: { [key: number]: string } = {
    1: "#FFD700",
    2: "#C0C0C0",
    3: "#CD7F32",
  };
  if (isLoading) {
    return (
      <Card className="shadow-lg h-[300px]">
        <div className="flex items-center justify-center h-full">
          Carregando ranking...
        </div>
      </Card>
    );
  }

const flattenedData = (data || []).map((jogador) => {
    let valor = 0;
    
    if (temporada && jogador.stats.temporadas?.[temporada]) {
      // Busca na temporada específica
      valor = (jogador.stats.temporadas[temporada] as any)[dataKey] || 0;
    } else {
      // Busca no "All Time" (Geral)
      valor = (jogador.stats as any)[dataKey] || 0;
    }

    return {
      id: jogador.id,
      nomeEixo: jogador.nome,
      [dataKey]: valor,
    };
  });

  const filteredData = flattenedData.filter((item) => (item[dataKey] as number)> 0);

  if (filteredData.length === 0) {
    return (
      <Card className="shadow-lg h-[400px] border-zinc-800 bg-zinc-950">
        <CardHeader>
          <CardTitle className="text-xl flex items-center justify-center gap-2">
            {icon} {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-48 text-zinc-500">
          <p>Nenhum registro encontrado.</p>
        </CardContent>
      </Card>
    );
  }

  // 3. PÓDIO VISUAL: Se tivermos 3 pessoas, colocamos o 1º no centro [2º, 1º, 3º]
  let chartData = filteredData.map((item, index) => ({
    ...item,
    rank: index + 1,
  }));

  if (chartData.length === 3) {
    const [primeiro, segundo, terceiro] = chartData;
    chartData = [segundo, primeiro, terceiro];
  }

  const chartConfig = {
    [dataKey]: {
      label: unit,
      color: "hsl(var(--primary))",
    },
  };

  return (
    <Card className="shadow-lg h-full text-center flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl flex items-center justify-center gap-2">
          {icon} {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 h-[400px]">
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 10, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="nomeEixo"
              stroke="#ffffff"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              angle={-50}
              height={50}
              textAnchor="end"
              tickFormatter={(value, index) =>
                `${chartData[index].rank}º ${value}`
              }
            />

            <YAxis
              type="number"
              stroke="#ffffff"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              label={{
                value: unit,
                angle: -90,
                position: "insideLeft",
                offset: 10,
                fill: "#ffffff",
              }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />

            <Bar
              dataKey={dataKey}
              fill={RANK_COLORS[1]}
              barSize={40}
              radius={[4, 4, 0, 0]}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={RANK_COLORS[entry.rank] || "#8884d8"}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
