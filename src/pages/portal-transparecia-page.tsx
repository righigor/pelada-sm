import { ListaJogadoresFinanceiro } from "@/components/portal-transparencia/lista-jogadores-financeiro";
import { HistoricoMovimentacoes } from "@/components/portal-transparencia/historico-movimentacoes";
import { Separator } from "@/components/ui/separator";
import { HeroPortal } from "@/components/portal-transparencia/hero-portal";
import { GraficoFinanceiro } from "@/components/portal-transparencia/grafico-financeiro";
import { useGetAllPagamentos } from "@/hooks/caixinha/use-get-all-pagamentos";
import { useGetAllJogadores } from "@/hooks/jogadores/use-get-all-jogadores";
import { useGetMovimentacoes } from "@/hooks/caixinha/use-get-movimentacoes";

export function PortalTransparenciaPage() {
  const { data: allPagamentos, isPending: isPendingAllPagamentos } =
    useGetAllPagamentos();
  const { data: allJogadores, isPending: isPendingAllJogadores } =
    useGetAllJogadores();
  const { data: movimentacoes, isPending: isPendingMovimentacoes } =
    useGetMovimentacoes();

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Portal da Transparência
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Acompanhe financeiro, pagamentos e saldo da caixinha da pelada.
        </p>
      </div>

      <Separator />

      <HeroPortal
        jogadores={allJogadores}
        isPending={
          isPendingAllJogadores ||
          isPendingAllPagamentos ||
          isPendingMovimentacoes
        }
        pagamentos={allPagamentos}
        movimentacoes={movimentacoes}
      />

      <GraficoFinanceiro jogadores={allJogadores} isPending={isPendingAllJogadores || isPendingAllPagamentos} pagamentos={allPagamentos} />

      <ListaJogadoresFinanceiro />

      <HistoricoMovimentacoes 
        pagamentos={allPagamentos}
        movimentacoes={movimentacoes}
        isLoading={isPendingAllPagamentos || isPendingMovimentacoes}
      />
    </div>
  );
}
