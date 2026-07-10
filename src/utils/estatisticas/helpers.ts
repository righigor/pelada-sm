import type { JogadorEstatistica } from "@/types/partida/Estatisticas";
import type { PartidaByIDResponseType } from "@/types/partida/PartidaById";
import type { PartidaKey } from "@/types/PartidaStore";
import { PARTIDA_STATUS } from "@/utils/constants";

export interface ResumoMediasGerais {
  totalPartidas: number;
  totalGols: number;
  mediaGolsPorPartida: number;
  mediaJogadoresPorPartida: number;
}

export interface RecordeIndividual {
  jogadorNome: string;
  valor: number;
  partidaId: string;
}

export interface RecordesPartida {
  recordeGols: RecordeIndividual | null;
  recordeAssistencias: RecordeIndividual | null;
}

/**
 * Filtra apenas as partidas que foram finalizadas.
 */
export function filtrarPartidasFinalizadas(
  partidas: PartidaByIDResponseType[],
): PartidaByIDResponseType[] {
  return partidas.filter((p) => p.status === PARTIDA_STATUS.FINALIZADO);
}

/**
 * Calcula o total de partidas, gols e as médias gerais da pelada.
 */
export function calcularMediasGerais(
  partidasFinalizadas: PartidaByIDResponseType[],
): ResumoMediasGerais {
  const totalPartidas = partidasFinalizadas.length;

  if (totalPartidas === 0) {
    return {
      totalPartidas: 0,
      totalGols: 0,
      mediaGolsPorPartida: 0,
      mediaJogadoresPorPartida: 0,
    };
  }

  const totalGols = partidasFinalizadas.reduce(
    (acc, partida) => acc + (partida.resumoPartida?.golsTotais ?? 0),
    0,
  );

  const totalJogadores = partidasFinalizadas.reduce(
    (acc, partida) => acc + (partida.resumoPartida?.jogadoresTotais ?? 0),
    0,
  );

  return {
    totalPartidas,
    totalGols,
    mediaGolsPorPartida: parseFloat((totalGols / totalPartidas).toFixed(1)),
    mediaJogadoresPorPartida: parseFloat(
      (totalJogadores / totalPartidas).toFixed(1),
    ),
  };
}

/**
 * Varre todas as partidas para encontrar o recorde individual de gols e assistências em uma única partida.
 */
export function calcularRecordesPartida(
  partidasFinalizadas: PartidaByIDResponseType[],
): RecordesPartida {
  let recordeGols: RecordeIndividual | null = null;
  let recordeAssistencias: RecordeIndividual | null = null;

  for (const partida of partidasFinalizadas) {
    const times = partida.timesEstatisticas;

    for (const timeKey in times) {
      const jogadoresDoTime = times[timeKey as PartidaKey]?.jogadores;

      if (!jogadoresDoTime) continue;

      for (const jogadorId in jogadoresDoTime) {
        const stats: JogadorEstatistica = jogadoresDoTime[jogadorId];

        // Verifica Recorde de Gols
        if (stats.gols > 0) {
          if (!recordeGols || stats.gols > recordeGols.valor) {
            recordeGols = {
              jogadorNome: stats.nome,
              valor: stats.gols,
              partidaId: partida.id,
            };
          }
        }

        // Verifica Recorde de Assistências
        if (stats.assistencias > 0) {
          if (
            !recordeAssistencias ||
            stats.assistencias > recordeAssistencias.valor
          ) {
            recordeAssistencias = {
              jogadorNome: stats.nome,
              valor: stats.assistencias,
              partidaId: partida.id,
            };
          }
        }
      }
    }
  }

  return { recordeGols, recordeAssistencias };
}
