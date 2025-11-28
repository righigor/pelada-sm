import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePartidaStore } from "../../stores/usePartidaStore";
import { createNewPartida, type PartidaData } from "@/queries/partida/create-partida";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useCreatePartida = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const estatisticas = usePartidaStore((state) => state.estatisticas);
  const clearPartida = usePartidaStore((state) => state.clearPartida);

  return useMutation({
    mutationFn: async (dadosParaSalvar: PartidaData) => {
      if (Object.keys(estatisticas).length === 0) {
        throw new Error("Nenhuma estatística registrada.");
      }
      return createNewPartida(dadosParaSalvar);
    },

    onSuccess: (partidaId) => {
      clearPartida();
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
