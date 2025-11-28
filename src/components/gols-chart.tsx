import type { ChartData } from "@/utils/get-gols-chart-data";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card } from "./ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";

interface GolsChartProps {
  data: ChartData[];
}

export default function GolsChart({ data }: GolsChartProps) {
  if (!data || data.length === 0) {
    return (
      <p className="text-center text-sm text-gray-500">
        Nenhum dado de gols disponível.
      </p>
    );
  }

  const chartConfig = {
    Gols: {
      label: "Gols",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <section className="mb-10">
      <h3 className="text-2xl font-semibold mb-4 text-center">
        Gols por Jogador
      </h3>

      <Card className="p-4">
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />

            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={60}
            />

            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
              allowDecimals={false}
            />

            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="Gols"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
              className="fill-chart-1 hover:opacity-80 transition-opacity"
            />
          </BarChart>
        </ChartContainer>
      </Card>
    </section>
  );
}
