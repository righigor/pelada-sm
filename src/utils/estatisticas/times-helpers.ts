import type { JogadorNewResponseType } from "@/types/jogadores/Jogador";

export interface FielTime {
  jogadorId: string;
  nome: string;
  fotoUrl: string | null;
  vezes: number;
}

export interface FieloesData {
  azul: FielTime | null;
  preto: FielTime | null;
  branco: FielTime | null;
  vermelho: FielTime | null;
  goleiros: FielTime | null;
}

/**
 * Encontra quem mais jogou em cada cor de time e como goleiro.
 */
export function calcularFieloesDeTimes(
  jogadores: JogadorNewResponseType[]
): FieloesData {
  const chaves: Array<keyof FieloesData> = ["azul", "preto", "branco", "vermelho", "goleiros"];
  const resultado = {} as FieloesData;

  for (const chave of chaves) {
    let maxVezes = 0;
    let fiel: FielTime | null = null;

    for (const j of jogadores) {
      const vezes = j.stats?.times?.[chave] ?? 0;

      if (vezes > maxVezes) {
        maxVezes = vezes;
        fiel = {
          jogadorId: j.id,
          nome: j.nome,
          fotoUrl: j.fotoUrl ?? null,
          vezes,
        };
      }
    }

    resultado[chave] = fiel;
  }

  return resultado;
}