import type { EstatisticasInputStore } from "@/types/PartidaStore";
import type {
  JogadorNameMap,
  JogadorResponseType,
} from "@/types/jogadores/Jogador";


export function getListaCompleta(
  estatisticasInput: EstatisticasInputStore | undefined,
  jogadorInfo: JogadorNameMap
): JogadorResponseType[] {
  const lista: JogadorResponseType[] = [];

  if (!estatisticasInput) {
    return [];
  }


  for (const groupKey in estatisticasInput) {
    const grupoStats =
      estatisticasInput[groupKey as keyof EstatisticasInputStore];

    for (const [jogadorId, stats] of Object.entries(grupoStats.jogadores)) {
      const info = jogadorInfo[jogadorId];

      if (info) {
        lista.push({
          id: jogadorId,
          nome: info.nome,
          fotoUrl: info.fotoUrl,
          gols: stats.gols || 0,
          assistencias: stats.assistencias || 0,
          golContra: stats.golContra || 0,
          partidas: 1,
          times: {},
          companheiros: {},
        });
      }
    }
  }

  lista.sort((a, b) => {
    if (b.gols !== a.gols) {
      return b.gols - a.gols;
    }
    return b.assistencias - a.assistencias;
  });

  return lista;
}
