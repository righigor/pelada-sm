import type { Timestamp } from "firebase/firestore";

export interface EstatisticaPartida {
  gols: number;
  assistencias: number;
  golContra: number;
}

export interface PartidaData {
  date: Date;
  jogadoresEstatisticas: { [jogadorId: string]: EstatisticaPartida };
}

export interface GetAllPartidaResponseType {
  id: string;
  dataPartida: Timestamp;
  local: string;
  jogadoresEstatisticas: { [jogadorId: string]: EstatisticaPartida };
}