import type { JogadorNewResponseType } from "@/types/jogadores/Jogador";
import type { PagamentoRegistro, MovimentacaoCaixinha } from "@/types/caixinha/caixinha";
import { isAfter, parseISO } from "date-fns";


export interface JogadorFinanceiroView {
  id: string;
  nome: string;
  fotoUrl: string | null;
  statusAssinatura: "ativo" | "pendente" | "inativo" | "nao_assinou";
  plano: string | null;
  metodoPagamento: string | null;
  ultimoPagamentoEm: string | null;
}

export function getJogadoresFinanceiroView(
  jogadores: JogadorNewResponseType[],
  pagamentos: PagamentoRegistro[],
): JogadorFinanceiroView[] {
  const ultimoPagamentoPorJogador = new Map<string, PagamentoRegistro>();

  for (const pagamento of pagamentos) {
    const existente = ultimoPagamentoPorJogador.get(pagamento.jogadorId);
    if (!existente || isAfter(parseISO(pagamento.dataPagamento), parseISO(existente.dataPagamento))) {
      ultimoPagamentoPorJogador.set(pagamento.jogadorId, pagamento);
    }
  }

  return jogadores.map((jogador) => {
    const assinatura = jogador.assinatura;
    const ultimoPag = ultimoPagamentoPorJogador.get(jogador.id);

    let statusAssinatura: JogadorFinanceiroView["statusAssinatura"] = "nao_assinou";

    if (assinatura?.status === "active") {
      statusAssinatura = "ativo";
    } else if (assinatura?.status === "pending" || assinatura?.status === "pending_renewal") {
      statusAssinatura = "pendente";
    } else if (
      assinatura?.status === "cancelled" ||
      assinatura?.status === "inactive"
    ) {
      statusAssinatura = "inativo";
    }

    return {
      id: jogador.id,
      nome: jogador.nome,
      fotoUrl: jogador.fotoUrl ?? null,
      statusAssinatura,
      plano: ultimoPag?.plano ?? assinatura?.plano ?? null,
      metodoPagamento: ultimoPag?.metodoPagamento ?? assinatura?.metodoPagamento ?? null,
      ultimoPagamentoEm: ultimoPag?.dataPagamento ?? assinatura?.ultimoPagamentoEm ?? null,
    };
  });
}

export function calcularTotalArrecadadoLiquido(pagamentos: PagamentoRegistro[]): number {
  return pagamentos.reduce((acc, p) => acc + (p.valorLiquido ?? 0), 0);
}

export function calcularTotalDespesas(movimentacoes: MovimentacaoCaixinha[]): number {
  return movimentacoes
    .filter((m) => m.tipo === "despesa")
    .reduce((acc, m) => acc + m.valor, 0);
}

export function contarJogadoresAtivos(jogadores: JogadorNewResponseType[]): number {
  return jogadores.filter((j) => j.assinatura?.status === "active").length;
}

export interface DistribuicaoPlano {
  plano: string;
  jogadores: number;
  fill: string;
}

export interface DistribuicaoMetodo {
  metodo: string;
  jogadores: number;
  fill: string;
}


export function calcularDistribuicaoPorPlano(
  jogadoresView: JogadorFinanceiroView[],
): DistribuicaoPlano[] {
  const contagem: Record<string, number> = {};

  for (const j of jogadoresView) {
    if (j.plano) {
      contagem[j.plano] = (contagem[j.plano] ?? 0) + 1;
    }
  }

  const cores: Record<string, string> = {
    mensal: "#10b981",
    semestral: "#3b82f6",
    anual: "#8b5cf6",
  };

  return Object.entries(contagem)
    .map(([plano, jogadores]) => ({
      plano: plano.charAt(0).toUpperCase() + plano.slice(1),
      jogadores,
      fill: cores[plano] ?? "#6b7280",
    }))
    .sort((a, b) => b.jogadores - a.jogadores);
}

export function calcularDistribuicaoPorMetodo(
  jogadoresView: JogadorFinanceiroView[],
): DistribuicaoMetodo[] {
  const contagem: Record<string, number> = {};

  for (const j of jogadoresView) {
    if (j.metodoPagamento) {
      const label = j.metodoPagamento === "pix" ? "PIX" : "Cartão";
      contagem[label] = (contagem[label] ?? 0) + 1;
    }
  }

  const cores: Record<string, string> = {
    "PIX": "#10b981",
    "Cartão": "#8b5cf6",
  };

  return Object.entries(contagem)
    .map(([metodo, jogadores]) => ({
      metodo,
      jogadores,
      fill: cores[metodo] ?? "#6b7280",
    }))
    .sort((a, b) => b.jogadores - a.jogadores);
}

export interface TimelineItem {
  id: string;
  tipo: "pagamento" | "despesa" | "entrada_extra";
  descricao: string;
  data: string;
  jogadorNome?: string;
  plano?: string;
  metodoPagamento?: string;
  valor?: number;
}

export function criarTimeline(
  pagamentos: PagamentoRegistro[],
  movimentacoes: MovimentacaoCaixinha[],
): TimelineItem[] {
  const itens: TimelineItem[] = [];

  for (const p of pagamentos) {
    itens.push({
      id: p.id,
      tipo: "pagamento",
      descricao: "Pagamento recebido",
      data: p.dataPagamento,
      jogadorNome: p.jogadorNome,
      plano: p.plano,
      metodoPagamento: p.metodoPagamento,
    });
  }

  for (const m of movimentacoes) {
    itens.push({
      id: m.id,
      tipo: m.tipo,
      descricao: m.descricao,
      data: m.data,
      valor: m.valor,
    });
  }

  return itens.sort((a, b) =>
    isAfter(parseISO(b.data), parseISO(a.data)) ? 1 : -1,
  );
}