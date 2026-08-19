import { updateJogadorStatus } from "@/queries/jogadores/update-jogador-status";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateJogadorStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateJogadorStatus,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["jogadores"],
      });
    },
  });
}
