import { FormMovimentacao } from "@/components/caixinha/form-movimentacao";
import { ListaMovimentacoesAdmin } from "@/components/caixinha/lista-movimentacoes-admin";
import { HeroPortal } from "@/components/portal-transparencia/hero-portal";
import { Separator } from "@/components/ui/separator";
import { useGetAllPagamentos } from "@/hooks/caixinha/use-get-all-pagamentos";
import { useGetMovimentacoes } from "@/hooks/caixinha/use-get-movimentacoes";
import { useGetAllJogadores } from "@/hooks/jogadores/use-get-all-jogadores";

export function AdminCaixinhaPage() {
  const { data: allPagamentos, isPending: isPendingAllPagamentos } =
    useGetAllPagamentos();
  const { data: allJogadores, isPending: isPendingAllJogadores } =
    useGetAllJogadores();
  const { data: movimentacoes, isPending: isPendingMovimentacoes } =
    useGetMovimentacoes();

  console.log("AdminCaixinhaPage movimentacoes:", movimentacoes);
  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Gestão da Caixinha
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Registre despesas, entradas extras e acompanhe o saldo.
        </p>
      </div>

      <Separator />

      <HeroPortal
        isPending={
          isPendingAllJogadores ||
          isPendingMovimentacoes ||
          isPendingAllPagamentos
        }
        jogadores={allJogadores || []}
        movimentacoes={movimentacoes || []}
        pagamentos={allPagamentos || []}
      />

      <FormMovimentacao />

      <ListaMovimentacoesAdmin
        movimentacoes={movimentacoes}
        isLoading={isPendingMovimentacoes}
      />
    </div>
  );
}
