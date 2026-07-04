import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "sonner";
import type { PremiacaoEdicao } from "./use-get-premiacao-em-andamento";
import { db } from "@/firebase/config";

interface DadosVencedor {
  vencedorId: string;
  vencedorNome: string;
  vencedorFotoUrl: string | null;
  detalhes: string;
}

interface UseSalvarPremiacaoProps {
  premiacaoOriginal: PremiacaoEdicao;
  valoresFinais: Record<string, DadosVencedor>;
}

export function useSalvarPremiacao() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      premiacaoOriginal,
      valoresFinais,
    }: Omit<UseSalvarPremiacaoProps, "onSuccessCallback">) => {
      const categoriasAtualizadas = premiacaoOriginal.categorias.map((cat) => {
        const dadosVencedor = valoresFinais[cat.idCategoria];

        if (dadosVencedor) {
          return {
            ...cat,
            vencedorId: dadosVencedor.vencedorId,
            vencedorNome: dadosVencedor.vencedorNome,
            vencedorFotoUrl: dadosVencedor.vencedorFotoUrl,
            detalhes: dadosVencedor.detalhes,
          };
        }
        return cat;
      });

      const premiacaoRef = doc(db, "premiacoes", premiacaoOriginal.id);

      await updateDoc(premiacaoRef, {
        categorias: categoriasAtualizadas,
        status: "FINALIZADA",
        updatedAt: new Date(),
        dataFinalizacao: new Date().toISOString(),
      });
    },
    onSuccess: () => {
      toast.success("Premiação salva e finalizada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["premiacoes"] });
      queryClient.invalidateQueries({ queryKey: ["premiacao_em_andamento"] });
    },
    onError: (error) => {
      console.error("Erro ao salvar premiação:", error);
      toast.error("Houve um erro ao tentar finalizar a premiação.");
    },
  });
}
