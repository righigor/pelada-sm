import { deletePartidaAndRollbackStats } from "@/queries/partida/delete-partida";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeletePartida = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePartidaAndRollbackStats,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partidas"] });
      queryClient.invalidateQueries({ queryKey: ["ranking"] });

      toast.success("Partida excluída e estatísticas revertidas com sucesso!");
    },

    onError: (error) => {
      toast.error("Erro ao excluir partida e reverter estatísticas: " + error);
    },
  });
};
