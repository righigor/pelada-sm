import type { JogadorNewResponseType, StatsJogadorType } from "@/types/jogadores/Jogador";

// ... (código anterior permanece o mesmo)

export interface DestaqueGeral {
  jogadorId: string;
  nome: string;
  fotoUrl: string | null;
  valor: number;
}

export interface HallDaFamaData {
  artilheiro: DestaqueGeral | null;
  maiorAssistente: DestaqueGeral | null;
  mvpGeral: DestaqueGeral | null;
  bagre: DestaqueGeral | null;
  paredao: DestaqueGeral | null;
   maiorGATotal: DestaqueGeral | null;
  maiorGAMedio: DestaqueGeral | null; 
  maisPartidas: DestaqueGeral | null;
}

/**
 * Encontra o jogador líder em cada categoria estatística geral.
 * Ignora jogadores que não tiveram nenhuma partida ou cujo stat é 0.
 */
export function calcularHallDaFama(
  jogadores: JogadorNewResponseType[]
): HallDaFamaData {
  const jogadoresAtivos = jogadores.filter((j) => j.stats?.partidas > 0);

  const getTop = (statKey: keyof Pick<StatsJogadorType, 'gols' | 'assistencias' | 'mvpsGeral' | 'golsContra' | 'defesasDificeis' | 'partidas'>): DestaqueGeral | null => {
    let top: DestaqueGeral | null = null;

    for (const j of jogadoresAtivos) {
      const val = j.stats?.[statKey];

      if (typeof val === 'number' && val > 0) {
        if (!top || val > top.valor) {
          top = {
            jogadorId: j.id,
            nome: j.nome,
            fotoUrl: j.fotoUrl ?? null,
            valor: val,
          };
        }
      }
    }

    return top;
  };

let maiorGATotal: DestaqueGeral | null = null;
  let maiorGAMedio: DestaqueGeral | null = null;

  for (const j of jogadoresAtivos) {
    const gols = j.stats?.gols ?? 0;
    const assistencias = j.stats?.assistencias ?? 0;
    const partidas = j.stats?.partidas ?? 1; // Evita divisão por zero

    const gaTotal = gols + assistencias;
    const gaMedio = parseFloat((gaTotal / partidas).toFixed(2));

    if (gaTotal > 0) {
      if (!maiorGATotal || gaTotal > maiorGATotal.valor) {
        maiorGATotal = {
          jogadorId: j.id,
          nome: j.nome,
          fotoUrl: j.fotoUrl ?? null,
          valor: gaTotal,
        };
      }

      if (!maiorGAMedio || gaMedio > maiorGAMedio.valor) {
        maiorGAMedio = {
          jogadorId: j.id,
          nome: j.nome,
          fotoUrl: j.fotoUrl ?? null,
          valor: gaMedio,
        };
      }
    }
  }

  return {
    artilheiro: getTop("gols"),
    maiorAssistente: getTop("assistencias"),
    mvpGeral: getTop("mvpsGeral"),
    bagre: getTop("golsContra"),
    paredao: getTop("defesasDificeis"),
    maiorGATotal,
    maiorGAMedio,
    maisPartidas: getTop("partidas"),
  };
}


export interface PioresDesempenhosData {
  menosGols: DestaqueGeral | null;
  menosAssistencias: DestaqueGeral | null;
  menosGATotal: DestaqueGeral | null;
  menosGAMedio: DestaqueGeral | null;
}

/**
 * Encontra os piores desempenhos, considerando apenas jogadores
 * que jogaram pelo menos 30% do total de partidas (arredondado para baixo).
 */
export function calcularPioresDesempenhos(
  jogadores: JogadorNewResponseType[],
  totalPartidasGerais: number
): PioresDesempenhosData {
  const jogosMinimos = Math.floor(totalPartidasGerais * 0.3);

  const jogadoresElegiveis = jogadores.filter(
    (j) => (j.stats?.partidas ?? 0) >= jogosMinimos
  );

  if (jogadoresElegiveis.length === 0) {
    return {
      menosGols: null,
      menosAssistencias: null,
      menosGATotal: null,
      menosGAMedio: null,
    };
  }

  let menosGols: DestaqueGeral | null = null;
  let menosAssistencias: DestaqueGeral | null = null;
  let menosGATotal: DestaqueGeral | null = null;
  let menosGAMedio: DestaqueGeral | null = null;

  for (const j of jogadoresElegiveis) {
    const gols = j.stats?.gols ?? 0;
    const assistencias = j.stats?.assistencias ?? 0;
    const partidas = j.stats?.partidas ?? 1;

    const gaTotal = gols + assistencias;
    const gaMedio = parseFloat((gaTotal / partidas).toFixed(2));

    const baseObj = {
      jogadorId: j.id,
      nome: j.nome,
      fotoUrl: j.fotoUrl ?? null,
    };

    if (menosGols === null || gols < menosGols.valor) {
      menosGols = { ...baseObj, valor: gols };
    }
    if (menosAssistencias === null || assistencias < menosAssistencias.valor) {
      menosAssistencias = { ...baseObj, valor: assistencias };
    }
    if (menosGATotal === null || gaTotal < menosGATotal.valor) {
      menosGATotal = { ...baseObj, valor: gaTotal };
    }
    if (menosGAMedio === null || gaMedio < menosGAMedio.valor) {
      menosGAMedio = { ...baseObj, valor: gaMedio };
    }
  }

  return { menosGols, menosAssistencias, menosGATotal, menosGAMedio };
}