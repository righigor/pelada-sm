export interface JogadorNoPote {
  id: string;
  nome: string;
  pote: number;
  rankNoPote: number;
}

export interface PoteType {
  id: string;
  nome: string;
  jogadores: JogadorNoPote[];
}