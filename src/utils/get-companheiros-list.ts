import type { JogadorNameMap } from "@/types/jogadores/Jogador";

export interface CompanheiroDisplay {
  id: string;
  nome: string;
  partidasJuntas: number;
}

export function getCompanheirosList(
  companheirosMap: Record<string, number> | undefined,
  jogadoresInfo: JogadorNameMap | undefined
): CompanheiroDisplay[] {
  if (!companheirosMap || !jogadoresInfo) {
    return [];
  }

  const listaCompanheiros: CompanheiroDisplay[] = [];

  for (const [id, partidasJuntas] of Object.entries(companheirosMap)) {
    const info = jogadoresInfo[id];

    if (info && partidasJuntas > 0) {
      listaCompanheiros.push({
        id: id,
        nome: info.nome,
        partidasJuntas: partidasJuntas,
      });
    }
  }

  listaCompanheiros.sort((a, b) => b.partidasJuntas - a.partidasJuntas);

  return listaCompanheiros;
}
