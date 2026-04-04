import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner"; // Ou seu componente de feedback
import { updatePotes } from "@/queries/potes/update-potes";
import type { PoteType } from "@/types/potes/Potes";

export const useUpdatePotes = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (novosPotes: PoteType[]) => updatePotes(novosPotes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["potes"] });
      toast.success("Ranking de potes atualizado!");
    },
    onError: (error) => {
      console.error("Erro ao atualizar potes:", error);
      toast.error("Erro ao salvar o ranking.");
    },
  });
};