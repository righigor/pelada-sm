import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { EstatisticasInputStore, PartidaActions, PartidaKey, PartidaState, PartidaTimes } from "@/types/PartidaStore";

const initialPartidaState: PartidaState = {
  timesSelecionados: {} as PartidaTimes,
  estatisticasInput: {} as EstatisticasInputStore,
};

export const usePartidaStore = create<PartidaState & PartidaActions>()(
  persist(
    (set) => ({
      ...initialPartidaState,
      setTimesSelecionados: (times) => set({ timesSelecionados: times }),

      updateEstatistica: (
        partidaKey: PartidaKey,
        jogadorId: string,
        estatisticaKey: "gols" | "assistencias" | "golContra",
        value: number
      ) =>
        set((state) => {
          const currentStatsInput = state.estatisticasInput || {};

          const groupStats = currentStatsInput[partidaKey] || { jogadores: {} };
          const jogadorStats = groupStats.jogadores[jogadorId] || {
            gols: 0,
            assistencias: 0,
            golContra: 0,
            nome: "",
          };

          const novoEstado = {
            ...currentStatsInput,
            [partidaKey]: {
              jogadores: {
                ...groupStats.jogadores,
                [jogadorId]: {
                  ...jogadorStats,
                  [estatisticaKey]: value,
                },
              },
            },
          };
          console.log("Atualizando estatística:", {
            partidaKey,
            jogadorId,
            estatisticaKey,
            value,
          });
          return { estatisticasInput: novoEstado };
        }),

      setEstatisticasInput: (estatisticas: EstatisticasInputStore) =>
        set({ estatisticasInput: estatisticas }),
      resetPartida: () => set(initialPartidaState),
    }),
    {
      name: "partida-em-andamento",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
