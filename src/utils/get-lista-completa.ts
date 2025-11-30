import type {
  JogadoresEstatistica,
  JogadorEstatisticaCompleta,
  JogadorNameMap,
} from "@/types/jogadores/Jogador";

export function getListaCompleta(
  estatisticas: JogadoresEstatistica,
  jogadorInfo: JogadorNameMap
): JogadorEstatisticaCompleta[] {
  const lista: JogadorEstatisticaCompleta[] = [];

  for (const [jogadorId, stats] of Object.entries(estatisticas)) {
    const info = jogadorInfo[jogadorId];
    const nome = info ? info.nome : "Jogador Desconhecido";

    if (info) {
      lista.push({
        id: jogadorId,
        nome: nome,
        fotoUrl: info.fotoUrl,
        gols: stats.gols,
        partidas: stats.partidas,
        assistencias: stats.assistencias,
        golContra: stats.golContra,
      });
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
