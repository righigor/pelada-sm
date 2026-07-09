import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ArrowDownLeft, ArrowUpRight, Trash2 } from "lucide-react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { MovimentacaoCaixinha } from "@/types/caixinha/caixinha";
import { useDeleteMovimentacao } from "@/hooks/caixinha/use-delete-movimentacao";

const TIPO_BADGE: Record<
  MovimentacaoCaixinha["tipo"],
  {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
  }
> = {
  despesa: { label: "Despesa", variant: "destructive" },
  entrada_extra: { label: "Entrada Extra", variant: "default" },
};

function formatarData(dateStr: string): string {
  try {
    return format(parseISO(dateStr), "dd/MM/yyyy", { locale: ptBR });
  } catch {
    return "—";
  }
}

function formatarMoeda(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

interface ListaMovimentacoesAdminProps {
  movimentacoes: MovimentacaoCaixinha[] | undefined;
  isLoading: boolean;
}

export function ListaMovimentacoesAdmin({ movimentacoes, isLoading }: ListaMovimentacoesAdminProps) {
  const { mutate: deletar, isPending: isDeleting } = useDeleteMovimentacao();
  
  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12 text-sm text-muted-foreground">
          Carregando...
        </CardContent>
      </Card>
    );
  }

  if (!movimentacoes || movimentacoes.length === 0) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12 text-sm text-muted-foreground">
          Nenhuma movimentação registrada ainda.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Movimentações Registradas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {movimentacoes.map((mov) => {
            const badge = TIPO_BADGE[mov.tipo];
            const Icone = mov.tipo === "despesa" ? ArrowUpRight : ArrowDownLeft;
            const sinal = mov.tipo === "despesa" ? "−" : "+";

            return (
              <div
                key={mov.id}
                className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <Icone
                    className={`h-4 w-4 shrink-0 ${
                      mov.tipo === "despesa"
                        ? "text-red-500"
                        : "text-emerald-500"
                    }`}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {mov.descricao}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{formatarData(mov.data)}</span>
                      <Badge
                        variant={badge.variant}
                        className="text-[10px] px-1.5 py-0"
                      >
                        {badge.label}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-sm font-semibold ${
                      mov.tipo === "despesa"
                        ? "text-red-600"
                        : "text-emerald-600"
                    }`}
                  >
                    {sinal}
                    {formatarMoeda(mov.valor)}
                  </span>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        disabled={isDeleting}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Remover movimentação
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja remover{" "}
                          <strong>{mov.descricao}</strong> ({sinal}
                          {formatarMoeda(mov.valor)})? O saldo da caixinha será
                          ajustado automaticamente.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deletar(mov.id)}
                          className="bg-destructive text-white hover:bg-destructive/90"
                        >
                          Remover
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
