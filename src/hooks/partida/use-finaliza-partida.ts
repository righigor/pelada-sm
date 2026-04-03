import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { finalizePartida } from "@/queries/partida/finaliza-partida";
import type { PartidaByIDResponseType } from "@/types/partida/PartidaById";

export const useFinalizePartida = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (partida: PartidaByIDResponseType) => {
      return await finalizePartida(partida);
    },
    
    onMutate: () => {
      toast.loading("Finalizando partida e calculando estatísticas...", { id: "finalize-partida" });
    },

    onSuccess: (_, partida) => {
      queryClient.invalidateQueries({ queryKey: ["partida", partida.id] });
      queryClient.invalidateQueries({ queryKey: ["partidas"] });

      queryClient.invalidateQueries({ queryKey: ["jogadores"] });

      toast.success("Partida finalizada com sucesso! Stats atualizadas.", { id: "finalize-partida" });

      navigate(`/partida/${partida.id}`);
    },

    onError: (error) => {
      console.error("Erro ao finalizar partida:", error);
      toast.error("Falha ao finalizar partida. Tente novamente.", { id: "finalize-partida" });
    },
  });
};