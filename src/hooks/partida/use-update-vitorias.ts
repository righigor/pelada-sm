/* eslint-disable react-hooks/globals */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/firebase/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, updateDoc, increment, serverTimestamp } from "firebase/firestore";
import debounce from "lodash/debounce";
import { useMemo } from "react";

// Buffer separado apenas para vitórias
let pendingVitorias: Record<string, any> = {};

export const useUpdateVitorias = (partidaId: string) => {
  const queryClient = useQueryClient();

  const debouncedSave = useMemo(
    () =>
      debounce(async (id: string) => {
        if (Object.keys(pendingVitorias).length === 0) return;

        const updates = { ...pendingVitorias, updatedAt: serverTimestamp() };
        pendingVitorias = {};

        const docRef = doc(db, "partidas", id);
        await updateDoc(docRef, updates);
      }, 1500),
    []
  );

  return useMutation({
    mutationFn: async ({ time, valor }: { time: string; valor: number }) => {
      const caminho = `timesEstatisticas.${time}.vitorias`;
      
      // Acumula no buffer de vitórias
      pendingVitorias[caminho] = increment(valor);
      
      return debouncedSave(partidaId);
    },

    onMutate: async (newStat) => {
      await queryClient.cancelQueries({ queryKey: ["partida", partidaId] });
      const previousPartida = queryClient.getQueryData(["partida", partidaId]);

      queryClient.setQueryData(["partida", partidaId], (old: any) => {
        if (!old) return old;

        // Clone para evitar mutação direta
        const newPartida = JSON.parse(JSON.stringify(old));
        const timeObj = newPartida.timesEstatisticas[newStat.time];

        if (timeObj) {
          // Garante que o valor nunca seja menor que zero na UI
          const atual = timeObj.vitorias || 0;
          timeObj.vitorias = Math.max(0, atual + newStat.valor);
        }

        return newPartida;
      });

      return { previousPartida };
    },

    onError: (_, __, context) => {
      if (context?.previousPartida) {
        queryClient.setQueryData(["partida", partidaId], context.previousPartida);
      }
    },
  });
};