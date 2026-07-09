import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMovimentacao } from "@/queries/caixinha/delete-movimentacao";
import { toast } from "sonner";

export function useDeleteMovimentacao() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMovimentacao,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movimentacoes_caixinha"] });
      queryClient.invalidateQueries({ queryKey: ["caixinha_saldo"] });
      toast.success("Movimentação removida e saldo ajustado.");
    },
    onError: (error: Error) => {
      toast.error(error.message ?? "Erro ao remover movimentação.");
    },
  });
}