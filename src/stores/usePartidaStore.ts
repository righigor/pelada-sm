import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CorTime, PartidaActions, PartidaState } from "@/types/Partida";

const initialPartidaState: PartidaState = {
  timesSelecionados: null,
  estatisticasInput: null,
};

export const usePartidaStore = create<PartidaState & PartidaActions>()(
  persist(
    (set) => ({
      ...initialPartidaState,
      setTimesSelecionados: (times) => set({ timesSelecionados: times }),

      updateEstatistica: (
        timeCor: CorTime,
        jogadorId: string,
        estatisticaKey: "gols" | "assistencias" | "golContra",
        value: number
      ) =>
        set((state) => {
          const currentStatsInput = state.estatisticasInput || {};

          // 1. Clonagem e inicialização defensiva do Time
          const timeStats = currentStatsInput[timeCor] || { jogadores: {} };
          const jogadorStats = timeStats.jogadores[jogadorId] || {
            gols: 0,
            assistencias: 0,
            golContra: 0,
            nome: "",
          };

          // 2. Cria o novo estado de forma imutável
          const novoEstado = {
            ...currentStatsInput,
            [timeCor]: {
              ...timeStats,
              jogadores: {
                ...timeStats.jogadores,
                [jogadorId]: {
                  ...jogadorStats,
                  [estatisticaKey]: value, // Aplica o novo valor
                },
              },
            },
          };
          console.log("Atualizando estatísticas:", novoEstado);

          return { estatisticasInput: novoEstado };
        }),

      resetPartida: () => set(initialPartidaState),
    }),
    {
      name: "partida-em-andamento",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
