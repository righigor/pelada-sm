import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from "recharts";
import type { JogadorResponseType } from "@/types/jogadores/Jogador";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";

interface RankingCardProps {
  title: string;
  icon: React.ReactNode;
  data: JogadorResponseType[];
  isLoading: boolean;
  dataKey: "gols" | "assistencias" | "golContra";
  unit: string;
  color: string;
}

export default function RankingCard({
  title,
  icon,
  data,
  isLoading,
  dataKey,
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

  if (!data || data.length === 0) {
    return (
      <Card className="shadow-lg h-[300px]">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            {icon} {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500">
            Nenhum dado disponível ainda.
          </p>
        </CardContent>
      </Card>
    );
  }

  let chartData = data.map((item, index) => ({
    ...item,
    rank: index + 1,
    nomeEixo: `${item.nome.split(" ")[0]}`,
  }));

  if (chartData.length === 3) {
    const segundoLugar = chartData[1];
    const primeiroLugar = chartData[0];
    const terceiroLugar = chartData[2];

    chartData = [segundoLugar, primeiroLugar, terceiroLugar];
  }

  const chartConfig = {
    Gols: {
      label: "test",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <Card className="shadow-lg h-full text-center flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl flex items-center justify-center gap-2">
          {icon} {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 h-[350px]">
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="nomeEixo"
              stroke="#ffffff"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              angle={-45}
              dy={15}
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
            {/* <Tooltip
                            cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                            labelFormatter={(label) => {
                                const player = chartData.find(p => p.nomeEixo === label);
                                return player ? `${player.rank}º ${player.nome}` : label;
                            }}
                            
                            formatter={(value: number) => [value, unit]}
                        /> */}
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
