import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  getJogadoresFinanceiroView,
  type JogadorFinanceiroView,
} from "@/utils/caixinha/helpers";
import { useGetAllJogadores } from "@/hooks/jogadores/use-get-all-jogadores";
import { useGetAllPagamentos } from "@/hooks/caixinha/use-get-all-pagamentos";
import { ScrollArea } from "../ui/scroll-area";
import AvatarLoad from "../avatar-load";

const STATUS_CONFIG: Record<
  JogadorFinanceiroView["statusAssinatura"],
  {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
  }
> = {
  ativo: { label: "Ativo", variant: "default" },
  pendente: { label: "Pendente", variant: "secondary" },
  inativo: { label: "Inativo", variant: "destructive" },
  nao_assinou: { label: "Não assinou", variant: "outline" },
};


function formatDateSafe(dateStr: string | null): string {
  if (!dateStr) return "—";
  try {
    return format(parseISO(dateStr), "dd/MM/yyyy", { locale: ptBR });
  } catch {
    return "—";
  }
}

export function ListaJogadoresFinanceiro() {
  const { data: jogadores, isLoading: loadingJogadores } = useGetAllJogadores();
  const { data: pagamentos, isLoading: loadingPagamentos } =
    useGetAllPagamentos();
  const [busca, setBusca] = useState("");

  const jogadoresView = useMemo(() => {
    if (!jogadores || !pagamentos) return [];
    return getJogadoresFinanceiroView(jogadores, pagamentos);
  }, [jogadores, pagamentos]);

  const jogadoresFiltrados = useMemo(() => {
    if (!busca.trim()) return jogadoresView;
    const termo = busca.toLowerCase().trim();
    return jogadoresView.filter((j) => j.nome.toLowerCase().includes(termo));
  }, [jogadoresView, busca]);

  const isLoading = loadingJogadores || loadingPagamentos;

  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle className="text-lg font-semibold">Jogadores</CardTitle>
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar jogador..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-9"
          />
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] md:h-[400px] w-full">
          {isLoading ? (
            <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
              Carregando...
            </div>
          ) : jogadoresFiltrados.length === 0 ? (
            <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
              Nenhum jogador encontrado.
            </div>
          ) : (
            <div className="gap-2 grid grid-cols-1 md:grid-cols-2">
              {jogadoresFiltrados.map((jogador) => {
                const status = STATUS_CONFIG[jogador.statusAssinatura];
                return (
                  <div
                    key={jogador.id}
                    className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <AvatarLoad
                        jogador={jogador}
                        avatarSizeClasses="size-10 md:size-12"
                      />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">
                          {jogador.nome}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {jogador.plano
                            ? jogador.plano.charAt(0).toUpperCase() +
                              jogador.plano.slice(1)
                            : "Sem plano"}
                          {jogador.metodoPagamento && (
                            <span className="ml-2 text-muted-foreground/70">
                              ·{" "}
                              {jogador.metodoPagamento === "pix"
                                ? "PIX"
                                : "Cartão"}
                            </span>
                          )}
                          {jogador.ultimoPagamentoEm && (
                            <span className="ml-2 text-muted-foreground/70">
                              · {formatDateSafe(jogador.ultimoPagamentoEm)}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={status.variant}
                      className="shrink-0 text-xs"
                    >
                      {status.label}
                    </Badge>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
