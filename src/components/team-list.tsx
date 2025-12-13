import { IconBallFootball, IconShoe } from "@tabler/icons-react";
import type { GrupoEstatisticaStore, JogadorEstatisticaStore } from "@/types/PartidaStore";

interface TeamListProps {
  jogadores: GrupoEstatisticaStore;
}

interface JogadorComId extends JogadorEstatisticaStore {
    id: string;
}

export default function TeamList({ jogadores }: TeamListProps) {
  const jogadoresArray: JogadorComId[] = Object.entries(jogadores.jogadores).map(([id, stats]) => ({
    id: id,
    ...stats,
  }));

  jogadoresArray.sort((a, b) => {
    if (b.gols !== a.gols) {
      return b.gols - a.gols;
    }
    return b.assistencias - a.assistencias;
  });
  return (
    <section>
      <ul className="flex flex-col space-y-2 justify-between">
        {jogadoresArray.map(({ id, ...estatistica }) => (
          <li key={id} className="mb-2 border-b last:border-b-0 pb-2">
            <div className="flex gap-8 ">
              <span className="w-1/3">{estatistica.nome}</span>
              <div className="flex justify-between w-2/3">
                <span className="flex items-center gap-1">
                  <IconBallFootball className="size-4" /> {estatistica.gols}
                </span>
                <span className="flex items-center gap-1">
                  <IconShoe className="size-4" /> {estatistica.assistencias}
                </span>
                <span className="flex items-center gap-1">
                  <IconBallFootball className="text-red-700 size-4" />{" "}
                  {estatistica.golContra}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
