import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { Loader2, Edit2 } from "lucide-react";
import { funcoesPremiacoes } from "@/utils/dicionario/funcoes-premiacoes";
import { ModalVotoManual } from "./modal-votos-manual";
import type { ResultadoPremio } from "@/types/premiacao/Resultado";

interface LinhaCategoriaProps {
  cat: {
    idCategoria: string;
    nome: string;
    tipoCalculo: "AUTOMATICO" | "MANUAL";
    funcaoReferencia: string | null;
  };
}

export function LinhaCategoria({ cat }: LinhaCategoriaProps) {
  const [votoManual, setVotoManual] = useState<ResultadoPremio | null>(null);

  const funcaoDeCalculo = cat.funcaoReferencia
    ? funcoesPremiacoes[cat.funcaoReferencia]
    : null;

  const {
    data: resultadoAutomatico,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["parcial_categoria", cat.idCategoria],
    queryFn: async () => {
      if (!funcaoDeCalculo) return null;
      return await funcaoDeCalculo();
    },
    enabled: cat.tipoCalculo === "AUTOMATICO" && !!funcaoDeCalculo,
    staleTime: 1000 * 60 * 5,
  });

  const resultadoFinal =
    cat.tipoCalculo === "AUTOMATICO" ? resultadoAutomatico : votoManual;

  return (
    <div className="bg-background p-4 border rounded-lg flex items-center justify-between shadow-sm min-h-[88px]">
      <div className="space-y-1 pr-2">
        <p className="font-medium flex items-center gap-1.5">🏆 {cat.nome}</p>
        <p className="text-[0.75rem] text-muted-foreground leading-tight">
          {cat.tipoCalculo === "AUTOMATICO"
            ? "Cálculo Automático (Ao Vivo)"
            : "Votação manual / Painel"}
        </p>
      </div>

      <div className="flex items-center gap-3">
        {cat.tipoCalculo === "AUTOMATICO" && isLoading && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Loader2 className="h-3 w-3 animate-spin text-primary" />
            <span>Calculando...</span>
          </div>
        )}

        {cat.tipoCalculo === "AUTOMATICO" && error && (
          <p className="text-xs text-destructive font-medium">
            Erro ao calcular
          </p>
        )}

        {resultadoFinal && (
          <div className="flex items-center gap-3 text-right">
            <div>
              <p className="text-sm font-bold text-primary leading-tight">
                {resultadoFinal.vencedorNome}
              </p>
              <p className="text-[0.7rem] text-muted-foreground">
                {resultadoFinal.detalhes}
              </p>
            </div>

            <div className="size-10 rounded-md overflow-hidden shrink-0">
              {resultadoFinal.vencedorFotoUrl ? (
                <img
                  src={resultadoFinal.vencedorFotoUrl}
                  alt={resultadoFinal.vencedorNome}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-[10px] font-bold bg-muted text-muted-foreground">
                  {resultadoFinal.vencedorNome.substring(0, 2).toUpperCase()}
                </div>
              )}
            </div>
          </div>
        )}

        {cat.tipoCalculo === "MANUAL" && !votoManual && (
          <ModalVotoManual
            nomeCategoria={cat.nome}
            onSalvarVoto={setVotoManual}
            trigger={
              <Button variant="outline" size="sm" className="h-8">
                Adicionar Votos
              </Button>
            }
          />
        )}

        {cat.tipoCalculo === "MANUAL" && votoManual && (
          <ModalVotoManual
            nomeCategoria={cat.nome}
            onSalvarVoto={setVotoManual}
            trigger={
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-primary"
              >
                <Edit2 className="h-3.5 w-3.5" />
              </Button>
            }
          />
        )}

        {cat.tipoCalculo === "AUTOMATICO" &&
          !isLoading &&
          !resultadoAutomatico &&
          !error && (
            <p className="text-xs text-muted-foreground italic">Sem dados</p>
          )}
      </div>
    </div>
  );
}
