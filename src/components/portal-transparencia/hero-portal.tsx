import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetCaixinha } from "@/hooks/caixinha/use-get-caixinha";
import type { MovimentacaoCaixinha, PagamentoRegistro } from "@/types/caixinha/caixinha";
import type { JogadorNewResponseType } from "@/types/jogadores/Jogador";
import { calcularTotalArrecadadoLiquido, calcularTotalDespesas, contarJogadoresAtivos } from "@/utils/caixinha/helpers";
import { Wallet, TrendingUp, Receipt, Users } from "lucide-react";
import HeroPortalSkeleton from "./hero-portal-skeleton";

function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

interface HeroCardProps {
  jogadores: JogadorNewResponseType[] | undefined;
  isPending: boolean;
  pagamentos: PagamentoRegistro[] | undefined;
  movimentacoes: MovimentacaoCaixinha[] | undefined;
}

export function HeroPortal({ jogadores, isPending, pagamentos, movimentacoes }: HeroCardProps) {
  const { data: caixinha, isPending: isPendingCaixinha } = useGetCaixinha();

  if (isPending || isPendingCaixinha) {
    return <HeroPortalSkeleton />
  }

  if (!jogadores || !pagamentos || !movimentacoes) {
    return null;
  }

  const saldo = caixinha?.saldo ?? 0;
  const totalArrecadado = calcularTotalArrecadadoLiquido(pagamentos ?? []);
  const totalDespesas = calcularTotalDespesas(movimentacoes ?? []);
  const jogadoresAtivos = contarJogadoresAtivos(jogadores ?? []);

  const cards = [
    {
      titulo: "Saldo da Caixinha",
      valor: formatCurrency(saldo),
      icone: Wallet,
      cor: "text-emerald-600",
      bg: "bg-emerald-50 dark:bg-emerald-950/30",
    },
    {
      titulo: "Total Arrecadado",
      valor: formatCurrency(totalArrecadado),
      icone: TrendingUp,
      cor: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      titulo: "Total em Despesas",
      valor: formatCurrency(totalDespesas),
      icone: Receipt,
      cor: "text-red-600",
      bg: "bg-red-50 dark:bg-red-950/30",
    },
    {
      titulo: "Assinaturas Ativas",
      valor: String(jogadoresAtivos),
      icone: Users,
      cor: "text-violet-600",
      bg: "bg-violet-50 dark:bg-violet-950/30",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
          </CardContent>
        </Card>
      ))}
    </div>
  );
}