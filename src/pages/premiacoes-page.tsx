import { Loader2, AlertCircle, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useGetAllPremiacoes } from "@/hooks/premiacao/use-get-all-premiacoes";
import PremiacaoHistoricoCard from "@/components/premiacao-historico-card";

export default function PremiacoesPage() {
  const { data: premiacoes, isLoading, error } = useGetAllPremiacoes();

  console.log("premiacoes", premiacoes);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 mt-8 container px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Trophy className="h-8 w-8 text-yellow-500" /> Histórico de
            Premiações
          </h1>
          <p className="text-muted-foreground mt-1">
            Confira todas as edições de prêmios da pelada e seus respectivos
            vencedores.
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Todas as Edições
        </h2>

        {isLoading && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-muted-foreground gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm">Buscando premiações...</p>
            </CardContent>
          </Card>
        )}

        {error && (
          <Card className="border-destructive/20 bg-destructive/10">
            <CardContent className="flex items-center gap-3 p-4 text-destructive">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <div>
                <h4 className="font-semibold text-sm">
                  Erro ao sincronizar dados
                </h4>
                <p className="text-xs opacity-90">
                  Não foi possível carregar o histórico de premiações.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {!isLoading && premiacoes?.length === 0 && (
          <Card className="border-dashed">
            <CardContent className="p-12 text-center text-muted-foreground">
              Nenhuma premiação registrada até o momento.
            </CardContent>
          </Card>
        )}

        {!isLoading && premiacoes && premiacoes.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {premiacoes.map((p) => (
              <PremiacaoHistoricoCard key={p.id} p={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
