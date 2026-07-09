import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDownLeft, ArrowUpRight, PlusCircle } from "lucide-react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useMemo } from "react";
import { criarTimeline, type TimelineItem } from "@/utils/caixinha/helpers";
import { ScrollArea } from "../ui/scroll-area";
import type {
  MovimentacaoCaixinha,
  PagamentoRegistro,
} from "@/types/caixinha/caixinha";

const TIPO_CONFIG: Record<
  TimelineItem["tipo"],
  {
    icone: typeof ArrowDownLeft;
    cor: string;
    bg: string;
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
  }
> = {
  pagamento: {
    icone: ArrowDownLeft,
    cor: "text-emerald-600",
    bg: "bg-emerald-100 dark:bg-emerald-950/50",
    label: "Pagamento",
    variant: "default",
  },
  despesa: {
    icone: ArrowUpRight,
    cor: "text-red-600",
    bg: "bg-red-100 dark:bg-red-950/50",
    label: "Despesa",
    variant: "destructive",
  },
  entrada_extra: {
    icone: PlusCircle,
    cor: "text-blue-600",
    bg: "bg-blue-100 dark:bg-blue-950/50",
    label: "Entrada Extra",
    variant: "secondary",
  },
};

function formatTimelineDate(dateStr: string): string {
  try {
    return format(parseISO(dateStr), "dd MMM yyyy", { locale: ptBR });
  } catch {
    return "—";
  }
}

interface HistoricoMovimentacoesProps {
  pagamentos: PagamentoRegistro[] | undefined;
  movimentacoes: MovimentacaoCaixinha[] | undefined;
  isLoading: boolean;
}

export function HistoricoMovimentacoes({
  pagamentos,
  movimentacoes,
  isLoading,
}: HistoricoMovimentacoesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Histórico de Movimentações
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
            Carregando...
          </div>
        ) : !pagamentos ||
          !movimentacoes ||
          (pagamentos.length === 0 && movimentacoes.length === 0) ? (
          <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
            Nenhuma movimentação registrada.
          </div>
        ) : (
          <HistoricoMovimentacoesContent
            pagamentos={pagamentos}
            movimentacoes={movimentacoes}
          />
        )}
      </CardContent>
    </Card>
  );
}

interface HistoricoMovimentacoesContentProps {
  pagamentos: PagamentoRegistro[];
  movimentacoes: MovimentacaoCaixinha[];
}
export function HistoricoMovimentacoesContent({
  pagamentos,
  movimentacoes,
}: HistoricoMovimentacoesContentProps) {
  const timeline = useMemo(() => {
    return criarTimeline(pagamentos ?? [], movimentacoes ?? []);
  }, [pagamentos, movimentacoes]);

  return (
    <ScrollArea className="h-[300px] md:h-[400px] w-full">
      <div className="relative space-y-0">
        {timeline.map((item, index) => {
          const config = TIPO_CONFIG[item.tipo];
          const Icone = config.icone;
          const isUltimo = index === timeline.length - 1;

          return (
            <div key={item.id} className="relative flex gap-4 pb-6">
              {!isUltimo && (
                <div className="absolute left-[15px] top-8 h-full w-px bg-border" />
              )}

              <div
                className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${config.bg}`}
              >
                <Icone className={`h-4 w-4 ${config.cor}`} />
              </div>

              <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium">{item.descricao}</span>
                  <Badge
                    variant={config.variant}
                    className="text-[10px] px-1.5 py-0"
                  >
                    {config.label}
                  </Badge>
                </div>

                <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                  <span>{formatTimelineDate(item.data)}</span>

                  {item.tipo === "pagamento" && item.jogadorNome && (
                    <span>{item.jogadorNome}</span>
                  )}
                  {item.tipo === "pagamento" && item.plano && (
                    <span>
                      {item.plano.charAt(0).toUpperCase() + item.plano.slice(1)}
                    </span>
                  )}
                  {item.tipo === "pagamento" && item.metodoPagamento && (
                    <span>
                      {item.metodoPagamento === "pix" ? "PIX" : "Cartão"}
                    </span>
                  )}

                  {(item.tipo === "despesa" || item.tipo === "entrada_extra") &&
                    item.valor != null && (
                      <span className="font-medium">
                        {item.tipo === "despesa" ? "−" : "+"}
                        {item.valor.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </span>
                    )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
