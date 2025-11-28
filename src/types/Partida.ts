export interface EstatisticaPartida {
  gols: number;
  assistencias: number;
  golContra: number;
}

export interface PartidaData {
  date: Date;
  jogadoresEstatisticas: { [jogadorId: string]: EstatisticaPartida };
}