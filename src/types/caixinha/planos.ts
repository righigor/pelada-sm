export type TipoPlano = "mensal" | "semestral" | "anual";
export type MetodoPagamento = "pix" | "cartao";

export interface PlanoConfig {
  id: TipoPlano;
  nome: string;
  valorTotal: number;
  valorMensal: number;
  meses: number;
}

export const PLANOS: PlanoConfig[] = [
  {
    id: "mensal",
    nome: "Mensal",
    valorTotal: 10,
    valorMensal: 10,
    meses: 1,
  },
  {
    id: "semestral",
    nome: "Semestral",
    valorTotal: 60,
    valorMensal: 10,
    meses: 6,
  },
  {
    id: "anual",
    nome: "Anual",
    valorTotal: 120,
    valorMensal: 10,
    meses: 12,
  },
];

export interface PixFluxoDados {
  pixCopiaECola: string;
  pixQrCodeBase64: string;
}


// O que o Frontend envia para o n8n
export interface CreateAssinaturaPayload {
  jogadorId: string;
  nome: string;
  telefone: string;
  cpf: string;
  diaVencimento: string | null;
  plano: TipoPlano;
  metodoPagamento: MetodoPagamento;
}

// O que o n8n devolve para o Frontend
export interface CreateAssinaturaResponse {
  assinatura: {
    status: string;
    pixCopiaECola: string | null;
    pixQrCodeBase64: string | null;
    checkoutUrl: string | null;
  };
}