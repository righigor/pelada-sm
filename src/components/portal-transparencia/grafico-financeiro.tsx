import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis, Cell, Pie, PieChart } from "recharts";
import { useMemo } from "react";
import { calcularDistribuicaoPorMetodo, calcularDistribuicaoPorPlano, getJogadoresFinanceiroView } from "@/utils/caixinha/helpers";
import type { PagamentoRegistro } from "@/types/caixinha/caixinha";
import type { JogadorNewResponseType } from "@/types/jogadores/Jogador";

const planoChartConfig = {
  jogadores: {
    label: "Jogadores",
    color: "hsl(var(--chart-1))",
  },
};

const metodoChartConfig = {
  jogadores: {
    label: "Jogadores",
    color: "hsl(var(--chart-1))",
  },
};

interface GraficoFinanceiroProps {
  jogadores: JogadorNewResponseType[] | undefined;
  isPending: boolean;
  pagamentos: PagamentoRegistro[] | undefined;
}

export function GraficoFinanceiro({ jogadores, isPending, pagamentos }: GraficoFinanceiroProps) {
    if (isPending) {
    return (
      <div className="flex h-[250px] items-center justify-center text-sm text-muted-foreground">
        Carregando...
      </div>
    );
  }

  if (!jogadores || !pagamentos) {
    return (
      <div className="flex h-[250px] items-center justify-center text-sm text-muted-foreground">
        Nenhum dado disponível
      </div>
    );
  }

  return <GraficoFinanceiroContent jogadores={jogadores} pagamentos={pagamentos} />
}

interface GraficoFinanceiroContentProps {
  jogadores: JogadorNewResponseType[];
  pagamentos: PagamentoRegistro[];
}

export function GraficoFinanceiroContent({ jogadores, pagamentos }: GraficoFinanceiroContentProps) {

  const jogadoresView = useMemo(() => {
    return getJogadoresFinanceiroView(jogadores, pagamentos);
  }, [jogadores, pagamentos]);

  const distribuicaoPlano = useMemo(
    () => calcularDistribuicaoPorPlano(jogadoresView),
    [jogadoresView],
  );

  const distribuicaoMetodo = useMemo(
    () => calcularDistribuicaoPorMetodo(jogadoresView),
    [jogadoresView],
  );

  const temDadosPlano = distribuicaoPlano.length > 0;
  const temDadosMetodo = distribuicaoMetodo.length > 0;

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Distribuição por Plano</CardTitle>
        </CardHeader>
        <CardContent>
          {temDadosPlano ? (
            <ChartContainer config={planoChartConfig} className="h-[250px] w-full">
              <BarChart data={distribuicaoPlano} accessibilityLayer>
                <XAxis
                  dataKey="plano"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                  tickMargin={8}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="jogadores" radius={[6, 6, 0, 0]}>
                  {distribuicaoPlano.map((entry, index) => (
                    <Cell key={index} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          ) : (
            <div className="flex h-[250px] items-center justify-center text-sm text-muted-foreground">
              Nenhum dado disponível
            </div>
          )}
        </CardContent>
      </Card>

      {/* Gráfico por Método */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Distribuição por Método</CardTitle>
        </CardHeader>
        <CardContent>
          {temDadosMetodo ? (
            <ChartContainer config={metodoChartConfig} className="mx-auto h-[250px] w-full max-w-[250px]">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent nameKey="metodo" />} />
                <Pie
                  data={distribuicaoMetodo}
                  dataKey="jogadores"
                  nameKey="metodo"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  strokeWidth={2}
                >
                  {distribuicaoMetodo.map((entry, index) => (
                    <Cell key={index} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          ) : (
            <div className="flex h-[250px] items-center justify-center text-sm text-muted-foreground">
              Nenhum dado disponível
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}