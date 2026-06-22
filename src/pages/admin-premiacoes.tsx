import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  PlusCircle,
  ArrowLeft,
  Award,
  AlertCircle,
  Loader2,
} from "lucide-react";
import AddCategoria from "@/components/add-categoria";
import AddPremiacao from "@/components/add-premiacao";
import {
  useGetPremiacoesEmAndamento,
  type PremiacaoEdicao,
} from "@/hooks/premiacao/use-get-premiacao-em-andamento";
import PremiacaoEmAndamentoCard from "@/components/premiacao-em-andamento-card";
import PremiacaoEmAndamentoDetalhes from "@/components/premiacao-em-andamento-detalhes";

export default function AdminPremiacoes() {
  const [premiacaoSelecionada, setPremiacaoSelecionada] =
    useState<PremiacaoEdicao | null>(null);
  const [_sheetCategoriaOpen, setSheetCategoriaOpen] = useState(false);
  const [_sheetPremiacaoOpen, setSheetPremiacaoOpen] = useState(false);

  const {
    data: premiacoesAtivas,
    isLoading,
    error,
  } = useGetPremiacoesEmAndamento();

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 mt-8 container px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-5">
        <div>
          {premiacaoSelecionada ? (
            <button
              onClick={() => setPremiacaoSelecionada(null)}
              className="flex items-center text-sm text-muted-foreground hover:text-foreground gap-1 mb-2 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Voltar para lista
            </button>
          ) : null}
          <h1 className="text-3xl font-bold tracking-tight">
            {premiacaoSelecionada
              ? premiacaoSelecionada.nome
              : "Admin de Premiações"}
          </h1>
          <p className="text-muted-foreground">
            {premiacaoSelecionada
              ? "Gerencie as categorias, cálculos automáticos e finalize os resultados."
              : "Gerencie o histórico, crie moldes de categorias e abra novas edições de prêmios."}
          </p>
        </div>

        {!premiacaoSelecionada && (
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Award className="h-4 w-4" /> Nova Categoria
                </Button>
              </SheetTrigger>
              <AddCategoria onSuccess={() => setSheetCategoriaOpen(false)} />
            </Sheet>
            <Sheet>
              <SheetTrigger asChild>
                <Button className="gap-2">
                  <PlusCircle className="h-4 w-4" /> Nova Premiação
                </Button>
              </SheetTrigger>
              <AddPremiacao onSuccess={() => setSheetPremiacaoOpen(false)} />
            </Sheet>
          </div>
        )}
      </div>

      <div className="mt-6">
        {!premiacaoSelecionada ? (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight">
              Edições Ativas
            </h2>
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm">Buscando premiações no Firebase...</p>
              </div>
            )}
            {error && (
              <div className="flex items-center gap-3 p-4 rounded-xl border border-destructive/20 bg-destructive/10 text-destructive">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm">
                    Erro ao sincronizar dados
                  </h4>
                  <p className="text-xs opacity-90">
                    Não foi possível carregar as premiações em andamento.
                  </p>
                </div>
              </div>
            )}

            {!isLoading && premiacoesAtivas?.length === 0 && (
              <div className="border border-dashed rounded-xl p-12 text-center text-muted-foreground">
                Nenhuma premiação "Ao Vivo" no momento. Use o botão acima para
                abrir uma nova edição!
              </div>
            )}
            {!isLoading && premiacoesAtivas && premiacoesAtivas.length > 0 && (
              <div className="grid gap-4 md:grid-cols-2">
                {premiacoesAtivas.map((p) => (
                  <PremiacaoEmAndamentoCard
                    p={p}
                    setPremiacaoSelecionada={setPremiacaoSelecionada}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <PremiacaoEmAndamentoDetalhes
            p={premiacaoSelecionada}
            setPremiacaoSelecionada={setPremiacaoSelecionada}
          />
        )}
      </div>
    </div>
  );
}
