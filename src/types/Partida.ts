export interface EstatisticaPartida {
  gols: number;
  assistencias: number;
  golContra: number;
  partidas: number;
}

export type EstatisticaKeyType = "gols" | "assistencias" | "golContra";

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


export const CORES_TIMES = ["azul", "preto", "branco", "vermelho"] as const;

export type CorTime = typeof CORES_TIMES[number] | "goleiros";

export const JOGADORES_POR_TIME = 4;
