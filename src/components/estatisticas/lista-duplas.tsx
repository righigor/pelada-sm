import type { DuplaType } from "@/utils/estatisticas/duplas-helper";
import { type Users } from "lucide-react";
import AvatarLoad from "../avatar-load";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

interface ListaDuplasProps {
  titulo: string;
  icone: typeof Users;
  dados: DuplaType[];
  mostrarGA: boolean;
}

export default function ListaDuplas({
  titulo,
  icone: Icone,
  dados,
  mostrarGA,
}: ListaDuplasProps) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center gap-3 pb-3">
        <Icone className="h-5 w-5 text-primary" />
        <CardTitle className="text-base font-semibold">{titulo}</CardTitle>
      </CardHeader>
      <CardContent>
        {dados.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            Nenhuma dupla formada ainda.
          </p>
        ) : (
          <div className="space-y-3">
            {dados.map((dupla, index) => {
              const posicao = index + 1;
              const corPosicao =
                posicao === 1
                  ? "text-amber-500"
                  : posicao === 2
                    ? "text-slate-400"
                    : posicao === 3
                      ? "text-amber-700 dark:text-amber-600"
                      : "text-muted-foreground/50";

              return (
                <div
                  key={`${dupla.id1}-${dupla.id2}`}
                  className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50"
                >
                  <div className={`w-6 text-center font-black ${corPosicao}`}>
                    {posicao}
                  </div>

                  <AvatarLoad
                    jogador={{
                      id: dupla.id1,
                      nome: dupla.nome1,
                      fotoUrl: dupla.fotoUrl1,
                    }}
                    avatarSizeClasses="size-14 md:size-16"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-wrap text-xs font-medium leading-tight">
                      {dupla.nome1}
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-lg font-bold text-muted-foreground">
                      &
                    </span>
                  </div>

                  <div className="min-w-0 flex-1 text-right">
                    <p className="truncate text-wrap text-xs font-medium leading-tight">
                      {dupla.nome2}
                    </p>
                  </div>
                  <AvatarLoad
                    jogador={{
                      id: dupla.id2,
                      nome: dupla.nome2,
                      fotoUrl: dupla.fotoUrl2,
                    }}
                    avatarSizeClasses="size-14 md:size-16"
                  />

                  <div className="w-12 text-right">
                    <p className=" font-bold tabular-nums text-muted-foreground">
                      {mostrarGA ? dupla.gaJuntos : dupla.vezesJuntos}
                    </p>
                    <p className="text-xs text-muted-foreground/70">
                      {mostrarGA ? "G/A" : "Vezes"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
