import { IconBallFootball, IconShoe } from "@tabler/icons-react";
import type { GrupoEstatisticaStore, JogadorEstatisticaStore } from "@/types/PartidaStore";
import { Shield } from "lucide-react";

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
        {jogadoresArray.map(({ id, ...estatistica }) => {
          const ehGoleiro = Object.prototype.hasOwnProperty.call(estatistica, 'dd');

          return (
            <li key={id} className="mb-2 border-b last:border-b-0 pb-2">
              <div className="flex gap-8 items-center">
                <span className="w-1/3">{estatistica.nome}</span>
                
                <div className={ehGoleiro 
                  ? "grid grid-cols-2 gap-x-4 gap-y-1 w-2/3" 
                  : "flex justify-between w-2/3"
                }>
                  <span className="flex items-center gap-1">
                    <IconBallFootball className="size-4" /> {estatistica.gols}
                  </span>
                  <span className="flex items-center gap-1">
                    <IconShoe className="size-4" /> {estatistica.assistencias}
                  </span>
                  <span className="flex items-center gap-1">
                    <IconBallFootball className="text-red-700 size-4" />{" "}
                    {estatistica.golsContra}
                  </span>
                  {ehGoleiro && (
                    <span className="flex items-center gap-1">
                      <Shield className="text-blue-700 size-4" />{" "}
                      {estatistica.dd}
                    </span>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
