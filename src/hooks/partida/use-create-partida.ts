import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePartidaStore } from "../../stores/usePartidaStore";
import { createNewPartida } from "@/queries/partida/create-partida";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import type { PartidaPayload } from "@/types/PartidaStore";

export const useCreatePartida = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const estatisticasInput = usePartidaStore((state) => state.estatisticasInput);
  const resetPartida = usePartidaStore((state) => state.resetPartida);

  return useMutation({
    mutationFn: async (dadosParaSalvar: PartidaPayload) => {
      if (Object.keys(estatisticasInput).length === 0) {
        throw new Error("Nenhuma estatística registrada.");
      }
      return createNewPartida(dadosParaSalvar);
    },

    onSuccess: (partidaId) => {
      resetPartida();
      queryClient.invalidateQueries({ queryKey: ["historicoPartidas"] });
      queryClient.invalidateQueries({ queryKey: ["todosJogadores"] });
      toast.success("Partida registrada com sucesso!");
      navigate(`/partida/${partidaId}`);
    },
    onError: (error) => {
      console.error("Erro no registro da partida:", error);
      toast.error("Falha ao registrar a partida. Tente novamente.");
    },
  });
};
