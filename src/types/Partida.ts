import type { Timestamp } from "firebase/firestore";
import type { JogadorResponseType } from "./jogadores/Jogador";

export interface EstatisticaPartida {
  gols: number;
  assistencias: number;
  golContra: number;
  partidas: number;
}

export type JogadoresStatsPorTime = {
  [jogadorId: string]: EstatisticaPartida;
}

export interface PartidaData {
  date: Date;
  goleiros?: string[];
  times: {
    [key in CorTime]: {
      jogadores: JogadoresStatsPorTime;
    };
  }
}



export interface GetAllPartidaResponseType {
  id: string;
  dataPartida: Timestamp;
  local: string;
  jogadoresEstatisticas: { [jogadorId: string]: EstatisticaPartida };
}

export interface PartidaByIDResponseType {
  id: string;
  dataPartida: Timestamp;
  local: string;
  jogadoresEstatisticas: { [jogadorId: string]: EstatisticaPartida };
}

export const CORES_TIMES = ["azul", "preto", "branco", "vermelho"] as const;

export type CorTime = typeof CORES_TIMES[number] | "goleiros";

export const JOGADORES_POR_TIME = 4;

// Store
export type PartidaTimes = {
  [key in CorTime]: JogadorResponseType[];
} & {
  goleiros: JogadorResponseType[];
};

export interface PartidaState {
  timesSelecionados: PartidaTimes | null;
  estatisticasInput: Partial<PartidaData["times"]> | null;
}

export interface PartidaActions {
  setTimesSelecionados: (times: PartidaTimes) => void;
  updateEstatistica: (
    timeCor: CorTime,
    jogadorId: string,
    estatisticaKey: "gols" | "assistencias" | "golContra",
    value: number
  ) => void;
  // setEstatisticasInput: (estatisticas: Partial<PartidaData["times"]>) => void;
  resetPartida: () => void;
}