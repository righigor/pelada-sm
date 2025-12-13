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
  golContra: number;
  partidas: number;
  times: Partial<Record<PartidaKey, number>>;
  companheiros: Record<string, number>;
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
