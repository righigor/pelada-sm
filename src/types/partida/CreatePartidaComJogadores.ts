import type { JogadorNewResponseType } from "../jogadores/Jogador";

export interface CreatePartidaComJogadoresPayload {
  azul: JogadorNewResponseType[];
  preto: JogadorNewResponseType[];
  branco: JogadorNewResponseType[];
  vermelho: JogadorNewResponseType[];
  goleiros?: JogadorNewResponseType[];
}

export interface TimesEstatisticasType {
  timesEstatisticas: {
    [key in keyof CreatePartidaComJogadoresPayload]: {
      vitorias: number;
      jogadores: {
        [idJogador: string]: {
          gols: number;
          assistencias: number;
          golsContra: number;
          dd: number;
          nome: string;
        };
      };
    };
  };
}