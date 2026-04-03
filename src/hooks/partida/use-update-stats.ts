/* eslint-disable react-hooks/refs */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/firebase/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, updateDoc, increment, serverTimestamp } from "firebase/firestore";
import debounce from "lodash/debounce";
import { useEffect, useRef, useMemo } from "react";
import { toast } from "sonner";

export const useUpdateStats = (partidaId: string) => {
  const queryClient = useQueryClient();

  const pendingUpdatesRef = useRef<Record<string, any>>({});

  const debouncedSave = useMemo(() => 
    debounce(async () => {
      const updates = pendingUpdatesRef.current;
      if (Object.keys(updates).length === 0) return;

      pendingUpdatesRef.current = {};

      try {
        const docRef = doc(db, "partidas", partidaId);
        await updateDoc(docRef, {
          ...updates,
          updatedAt: serverTimestamp(),
        });
      } catch (error) {
        console.error("Erro ao salvar stats:", error);
        toast.error("Erro ao sincronizar estatísticas.");
      }
    }, 2000), 
  [partidaId]);

  useEffect(() => {
    return () => debouncedSave.cancel();
  }, [debouncedSave]);

  return useMutation({
    mutationFn: async (payload: {
      time: string;
      jogadorId: string;
      campo: string;
      valor: number;
    }) => {
      const { time, jogadorId, campo, valor } = payload;

      const caminho = `timesEstatisticas.${time}.jogadores.${jogadorId}.${campo}`;

      pendingUpdatesRef.current[caminho] = increment(valor);

      debouncedSave();
    },

    onMutate: async (newStat) => {
      await queryClient.cancelQueries({ queryKey: ["partida", partidaId] });
      const previousPartida = queryClient.getQueryData(["partida", partidaId]);

      queryClient.setQueryData(["partida", partidaId], (old: any) => {
        if (!old) return old;
        
        const newPartida = JSON.parse(JSON.stringify(old));
        const jogador = newPartida.timesEstatisticas[newStat.time]?.jogadores[newStat.jogadorId];

        if (jogador) {
          const valorAtual = jogador[newStat.campo] || 0;
          jogador[newStat.campo] = Math.max(0, valorAtual + newStat.valor);
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