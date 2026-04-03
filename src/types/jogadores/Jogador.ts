import type { PartidaKey } from "../PartidaStore";

export type JogadorType = {
  id: string;
  nome: string;
  fotoUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export interface FirestoreTimestamp {
  type: "firestore/timestamp/1.0";
  seconds: number;
  nanoseconds: number;
}

export interface JogadorResponseType {
  id: string;
  nome: string;
  fotoUrl: string | null;
  gols: number;
  assistencias: number;
  golsContra: number;
  partidas: number;
  times: Partial<Record<PartidaKey, number>>;
  companheiros: Record<string, number>;
}

export interface JogadorNewResponseType {
  id: string;
  nome: string;
  fotoUrl: string | null;
  telfone: string | null;
  stats: StatsJogadorType;
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
}

export interface JogadorAvatarType {
  nome: string;
  fotoUrl: string | null;
}

export type JogadorNameMap = {
  [id: string]: {
    nome: string;
    fotoUrl: string | null;
  };
};

export interface JogadorEstatisticaCompleta {
  id: string;
  nome: string;
  fotoUrl: string | null;
  gols: number;
  partidas: number;
  assistencias: number;
  golContra: number;
}

export interface StatsJogadorType {
  gols: number;
  assistencias: number;
  golsContra: number;
  partidas: number;
  defesasDificeis: number;
  times: TimesJogadorType;
  companheiros: CompanheirosJogadorType;
  temporadas: TemporadasJogadorType;
}

export interface TimesJogadorType {
  azul: number | null;
  preto: number | null;
  branco: number | null;
  vermelho: number | null;
  goleiros: number | null;
}

export interface CompanheirosJogadorType {
  [companheiroId: string]: number;
}

export interface TemporadasJogadorType {
  [temporada: string]: {
    gols: number;
    assistencias: number;
    golsContra: number;
    partidas: number;
    defesasDificeis: number;
    times: TimesJogadorType;
    companheiros: CompanheirosJogadorType;
  };
}
