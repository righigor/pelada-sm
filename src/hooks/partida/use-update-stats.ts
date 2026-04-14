/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/firebase/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, updateDoc, increment, serverTimestamp } from "firebase/firestore";
import { toast } from "sonner";

export const useUpdateStats = (partidaId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      time: string;
      jogadorId: string;
      campo: string;
      valor: number;
    }) => {
      const { time, jogadorId, campo, valor } = payload;
      const docRef = doc(db, "partidas", partidaId);

      console.log(payload)

      const caminhoEstatistica = `timesEstatisticas.${time}.jogadores.${jogadorId}.${campo}`;

      await updateDoc(docRef, {
        [caminhoEstatistica]: increment(valor),
        updatedAt: serverTimestamp(),
      });
    },

    onMutate: async (newStat) => {
      await queryClient.cancelQueries({ queryKey: ["partida", partidaId] });
      const previousPartida = queryClient.getQueryData(["partida", partidaId]);

      queryClient.setQueryData(["partida", partidaId], (old: any) => {
        if (!old) return old;

        // Clone profundo para a UI não quebrar
        const newPartida = JSON.parse(JSON.stringify(old));
        const time = newPartida.timesEstatisticas[newStat.time];
        const jogador = time?.jogadores[newStat.jogadorId];

        if (jogador) {
          const valorAtual = jogador[newStat.campo] || 0;
          jogador[newStat.campo] = Math.max(0, valorAtual + newStat.valor);
        }

        return newPartida;
      });

      return { previousPartida };
    },

    onError: (err, __, context) => {
      console.error("Erro na mutação:", err);
      if (context?.previousPartida) {
        queryClient.setQueryData(["partida", partidaId], context.previousPartida);
      }
      toast.error("Erro ao salvar estatística.");
    },

    onSettled: () => {
      // Garante que os dados locais batam com o servidor após a gravação
      queryClient.invalidateQueries({ queryKey: ["partida", partidaId] });
    },
  });
};