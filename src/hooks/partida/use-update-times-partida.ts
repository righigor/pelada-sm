import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { toast } from "sonner";
import type { PartidaKey } from "@/types/PartidaStore";
import type { TimeData } from "@/types/partida/Estatisticas";

export function useUpdateTimesPartida(partidaId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (novosTimes: Record<PartidaKey, TimeData>) => {
      const docRef = doc(db, "partidas", partidaId);
      await updateDoc(docRef, {
        timesEstatisticas: novosTimes,
        updatedAt: new Date()
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partida", partidaId] });
      toast.success("Escalação salva no banco de dados!");
    },
    onError: (error) => {
      console.error("Erro ao salvar times:", error);
      toast.error("Falha ao salvar a escalação.");
    },
  });
}