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

export interface StatsJogadorType {
  gols: number;
  assistencias: number;
  golsContra: number;
  partidas: number;
  defesasDificeis: number;
  mvpsGeral: number;
  mvpsPorTime: number;
  times: TimesJogadorType;
  companheiros: CompanheirosJogadorType;
  temporadas: TemporadasJogadorType;
}

export interface JogadorDetalhesStatsType {
  gols: number;
  assistencias: number;
  golsContra: number;
  partidas: number;
  defesasDificeis: number;
  mvpsGeral: number;
  mvpsPorTime: number;
  times: TimesJogadorType;
  companheiros: CompanheirosJogadorType;
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
    mvpsGeral: number;
    mvpsPorTime: number;
    times: TimesJogadorType;
    companheiros: CompanheirosJogadorType;
  };
}
