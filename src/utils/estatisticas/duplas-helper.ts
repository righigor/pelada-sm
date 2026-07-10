import type { JogadorNewResponseType } from "@/types/jogadores/Jogador";
import type { PartidaByIDResponseType } from "@/types/partida/PartidaById";
import type { PartidaKey } from "@/types/PartidaStore";


export interface DuplaType {
  id1: string;
  id2: string;
  nome1: string;
  nome2: string;
  fotoUrl1: string | null;
  fotoUrl2: string | null;
  vezesJuntos: number;
  gaJuntos: number;
  apelido: string;
}

/**
 * Gera um apelido dinâmico baseado no G/A conjunto da dupla.
 */
function getApelidoDupla(ga: number): string {
  if (ga >= 20) return "A Dupla Letal";
  if (ga >= 15) return "A Linha Mágica";
  if (ga >= 10) return "A Boa Dupla";
  if (ga >= 5) return "Parceiros de Pelada";
  return "Iniciantes";
}

/**
 * Calcula os rankings de duplas. 
 * Usa os stats do jogador para frequência e varre as partidas para o G/A exato juntos.
 */
export function calcularRankingDuplas(
  jogadores: JogadorNewResponseType[],
  partidasFinalizadas: PartidaByIDResponseType[]
): { porFrequencia: DuplaType[]; porGA: DuplaType[] } {
  // Mapa para armazenar as duplas. A chave é um hash dos dois IDs ordenados alfabeticamente.
  const duosMap = new Map<
    string,
    {
      id1: string;
      id2: string;
      vezesJuntos: number;
      gaJuntos: number;
    }
  >();

  // 1. Pega a frequência exata do objeto `companheiros` de cada jogador
  for (const j of jogadores) {
    const companheiros = j.stats?.companheiros ?? {};
    for (const compId in companheiros) {
      // Cria chave única ordenada (evita que A-B seja diferente de B-A)
      const idsOrdenados = [j.id, compId].sort();
      const duoKey = idsOrdenados.join("_");

      if (!duosMap.has(duoKey)) {
        duosMap.set(duoKey, {
          id1: idsOrdenados[0],
          id2: idsOrdenados[1],
          vezesJuntos: 0,
          gaJuntos: 0,
        });
      }
      // Atualiza a frequência (pega o valor direto, pois é simétrico e correto)
      duosMap.get(duoKey)!.vezesJuntos = companheiros[compId];
    }
  }

  // 2. Varre as partidas para somar o G/A EXATO quando jogaram juntos
  for (const partida of partidasFinalizadas) {
    const times = partida.timesEstatisticas;

    for (const timeKey in times) {
      const jogadoresDoTime = Object.keys(
        times[timeKey as PartidaKey].jogadores
      );

      // Compara todos contra todos dentro do mesmo time (O(n²) pequeno, max 5 jogadores = 10 combinações)
      for (let i = 0; i < jogadoresDoTime.length; i++) {
        for (let j = i + 1; j < jogadoresDoTime.length; j++) {
          const id1 = jogadoresDoTime[i];
          const id2 = jogadoresDoTime[j];
          const duoKey = [id1, id2].sort().join("_");

          const duo = duosMap.get(duoKey);
          if (duo) {
            const stats1 = times[timeKey as PartidaKey].jogadores[id1];
            const stats2 = times[timeKey as PartidaKey].jogadores[id2];

            duo.gaJuntos +=
              (stats1.gols || 0) +
              (stats1.assistencias || 0) +
              (stats2.gols || 0) +
              (stats2.assistencias || 0);
          }
        }
      }
    }
  }

  // 3. Mapeia para o tipo final de resposta, buscando nomes e fotos
  const jogadoresIndex = new Map(jogadores.map((j) => [j.id, j]));
  
  const duosFormatados: DuplaType[] = [];
  
  duosMap.forEach((duo) => {
    const j1 = jogadoresIndex.get(duo.id1);
    const j2 = jogadoresIndex.get(duo.id2);

    // Segurança caso um jogador tenha sido deletado
    if (j1 && j2) {
      duosFormatados.push({
        id1: duo.id1,
        id2: duo.id2,
        nome1: j1.nome,
        nome2: j2.nome,
        fotoUrl1: j1.fotoUrl ?? null,
        fotoUrl2: j2.fotoUrl ?? null,
        vezesJuntos: duo.vezesJuntos,
        gaJuntos: duo.gaJuntos,
        apelido: getApelidoDupla(duo.gaJuntos),
      });
    }
  });

  // 4. Ordena e retorna os Top 10 de cada categoria
  const porFrequencia = [...duosFormatados]
    .sort((a, b) => b.vezesJuntos - a.vezesJuntos)
    .slice(0, 10);

  const porGA = [...duosFormatados]
    .sort((a, b) => b.gaJuntos - a.gaJuntos)
    .slice(0, 10);

  return { porFrequencia, porGA };
}