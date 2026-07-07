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
      toast.loading("Finalizando partida e calculando estatísticas...", {
        id: "finalize-partida",
      });
    },

    onSuccess: (data, partida) => {
      queryClient.invalidateQueries({ queryKey: ["partida", partida.id] });
      queryClient.invalidateQueries({ queryKey: ["partidas"] });

      queryClient.invalidateQueries({ queryKey: ["jogadores"] });

      toast.success("Partida finalizada com sucesso! Stats atualizadas.", {
        id: "finalize-partida",
      });

      const linhasDestaques = [
        data.mvpGeral?.nome
          ? `⭐ *MVP Geral:* ${data.mvpGeral.nome}`
          : null,
        data.artilheiro?.nome
          ? `👑 *Artilheiro:* ${data.artilheiro.nome}`
          : null,
        data.paredao?.nome ? `🛡️ *Paredão:* ${data.paredao.nome}` : null,
        data.bagre?.nome
          ? `🐟 *Bagre da Rodada:* ${data.bagre.nome}`
          : null,
      ]
        .filter(Boolean)
        .join("\n");

      try {
        const URL_WEBHOOK_N8N =
          "https://pelada-n8n.duckdns.org/webhook/finalizar-partida";

        fetch(URL_WEBHOOK_N8N, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            partidaId: partida.id,
            link: `${window.location.origin}/partida/${partida.id}`,
            destaqueTexto: linhasDestaques,
          }),
        });
      } catch (webhookError) {
        console.error("Erro ao notificar o n8n:", webhookError);
      }

      navigate(`/partida/${partida.id}`);
    },

    onError: (error) => {
      console.error("Erro ao finalizar partida:", error);
      toast.error("Falha ao finalizar partida. Tente novamente.", {
        id: "finalize-partida",
      });
    },
  });
};
