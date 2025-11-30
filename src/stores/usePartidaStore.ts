import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { JogadorResponseType } from '../types/jogadores/Jogador';
import type { EstatisticaPartida } from '@/types/Partida';

interface PartidaState {
  jogadoresSelecionados: JogadorResponseType[];
  estatisticas: { [jogadorId: string]: EstatisticaPartida };
  setJogadoresSelecionados: (jogadores: JogadorResponseType[]) => void;
  updateEstatistica: (jogadorId: string, tipo: keyof EstatisticaPartida, valor: number) => void;
  clearPartida: () => void;
}

export const usePartidaStore = create<PartidaState>()(
  persist(
    (set) => ({
      jogadoresSelecionados: [],
      estatisticas: {},

      setJogadoresSelecionados: (jogadores) => {
        const novasEstatisticas = jogadores.reduce((acc, jogador) => {
          acc[jogador.id] = { gols: 0, assistencias: 0, golContra: 0, partidas: 1 };
          return acc;
        }, {} as PartidaState['estatisticas']);
        
        set({ 
          jogadoresSelecionados: jogadores, 
          estatisticas: novasEstatisticas 
        });
      },

      updateEstatistica: (jogadorId, tipo, valor) =>
        set((state) => ({
          estatisticas: {
            ...state.estatisticas,
            [jogadorId]: {
              ...state.estatisticas[jogadorId],
              [tipo]: valor,
            },
          },
        })),

      clearPartida: () => set({ jogadoresSelecionados: [], estatisticas: {} }),
    }),
    {
      name: 'partida-em-andamento',
      storage: createJSONStorage(() => localStorage),
    }
  )
);