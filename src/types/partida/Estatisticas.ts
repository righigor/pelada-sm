export type StatField = "gols" | "assistencias" | "golsContra" | "dd";

export type TimeKey = "azul" | "preto" | "branco" | "vermelho" | "goleiros";

export interface UpdateStatPayload {
  time: TimeKey;
  jogadorId: string;
  campo: StatField;
  valor: number;
}

export interface JogadorEstatistica {
  nome: string;
  gols: number;
  assistencias: number;
  golsContra: number;
  dd: number;
}

export interface TimeData {
  vitorias: number;
  jogadores: {
    [jogadorId: string]: JogadorEstatistica;
  };
}

export type TimesEstatisticas = Record<TimeKey, number>;