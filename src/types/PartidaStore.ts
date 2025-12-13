import type { JogadorResponseType } from "./jogadores/Jogador";

export type PartidaKey = "azul" | "preto" | "branco" | "vermelho" | "goleiros";

export interface JogadorEstatisticaStore {
  gols: number;
  assistencias: number;
  golContra: number;
  nome: string;
}

export interface GrupoEstatisticaStore {
  jogadores: Record<string, JogadorEstatisticaStore>;
}

export type EstatisticasInputStore = Record<PartidaKey, GrupoEstatisticaStore>;

export type PartidaTimes = {
  [key in PartidaKey]: JogadorResponseType[];
};

export interface PartidaState {
  timesSelecionados: PartidaTimes;
  estatisticasInput: EstatisticasInputStore;
}

export interface PartidaActions {
  setTimesSelecionados: (times: PartidaTimes) => void;
  updateEstatistica: (
    partidaKey: PartidaKey,
    jogadorId: string,
    estatisticaKey: "gols" | "assistencias" | "golContra",
    value: number
  ) => void;
  setEstatisticasInput: (estatisticas: EstatisticasInputStore) => void;
  resetPartida: () => void;
}

export interface PartidaPayload {
  date: Date;
  timeEstatisticas: EstatisticasInputStore;
}