import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMovimentacao } from "@/queries/caixinha/create-movimentacao";
import { toast } from "sonner";

export function useCreateMovimentacao() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMovimentacao,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movimentacoes_caixinha"] });
      queryClient.invalidateQueries({ queryKey: ["caixinha_saldo"] });
      toast.success("Movimentação registrada com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(error.message ?? "Erro ao registrar movimentação.");
    },
  });
}