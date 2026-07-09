export interface CaixinhaData {
  id: string;
  saldo: number;
  createdAt: string;
  updatedAt: string;
}

export interface PagamentoRegistro {
  id: string;
  transacaoId: string;
  jogadorId: string;
  jogadorNome: string;
  cpf: string;
  plano: string;
  metodoPagamento: string;
  status: string;
  valorBruto: number;
  valorLiquido: number;
  dataPagamento: string;
}

export interface MovimentacaoCaixinha {
  id: string;
  tipo: "despesa" | "entrada_extra";
  descricao: string;
  valor: number;
  data: string;
  createdAt: string;
}