import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { EstatisticasInputStore, PartidaActions, PartidaKey, PartidaState, PartidaTimes } from "@/types/PartidaStore";

const initialPartidaState: PartidaState = {
  timesSelecionados: {
    azul: [],
    preto: [],
    branco: [],
    vermelho: [],
    goleiros: [],
  } as PartidaTimes,
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
        estatisticaKey: "gols" | "assistencias" | "golsContra",
        value: number
      ) =>
        set((state) => {
          const currentStatsInput = state.estatisticasInput || {};

          const groupStats = currentStatsInput[partidaKey] || { jogadores: {} };
          const jogadorStats = groupStats.jogadores[jogadorId] || {
            gols: 0,
            assistencias: 0,
            golsContra: 0,
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
          return { estatisticasInput: novoEstado };
        }),

      setEstatisticasInput: (estatisticas: EstatisticasInputStore) =>
        set({ estatisticasInput: estatisticas }),
      resetPartida: () => {
        set(initialPartidaState)
        localStorage.removeItem("partida-em-andamento");
      },
    }),
    {
      name: "partida-em-andamento",
      version: 2,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
