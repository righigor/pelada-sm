import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { createPartidaComJogadores } from "@/queries/partida/create-partida-com-jogadores";
import type { CreatePartidaComJogadoresPayload } from "@/types/partida/CreatePartidaComJogadores";

export const useCreatePartidaComJogadores = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dadosParaSalvar: CreatePartidaComJogadoresPayload) => {
      return createPartidaComJogadores(dadosParaSalvar);
    },

    onSuccess: (partidaId) => {       
      queryClient.invalidateQueries({ queryKey: ["partida", partidaId] });
      toast.success("Partida criada com sucesso!");
      navigate(`/partida/registrar-stats/${partidaId}`);
    },
    onError: (error) => {
      console.error("Erro no registro da partida:", error);
      toast.error("Falha ao registrar a partida. Tente novamente.");
    },
  });
};
