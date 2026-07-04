export interface ResultadoPremio {
  vencedorId: string;
  vencedorNome: string;
  vencedorFotoUrl: string | null;
  detalhes: string;
}


export interface PremiacaoEdicao {
  id: string;
  nome: string;
  status: "EM_ANDAMENTO" | "FINALIZADA";
  dataCriacao: string;
  dataFinalizacao: string | null;
  categorias: Array<{
    idCategoria: string;
    nome: string;
    tipoCalculo: "AUTOMATICO" | "MANUAL";
    funcaoReferencia: string | null;
    vencedorId: string | null;
    vencedorNome: string | null;
    vencedorFotoUrl: string | null;
    detalhes: string;
  }>;
}