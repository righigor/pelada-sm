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
          <div className="space-y-4">
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
                  className="flex items-center gap-2 rounded-lg p-2 transition-colors hover:bg-muted/50 md:gap-3"
                >
                  {/* Posição */}
                  <div className={`w-6 shrink-0 text-center font-black ${corPosicao}`}>
                    {posicao}
                  </div>

                  {/* Jogador 1 (Mobile: Coluna | Desktop: Linha à esquerda) */}
                  <div className="flex flex-1 flex-col items-center text-center md:flex-row md:gap-3">
                    <AvatarLoad
                      jogador={{
                        id: dupla.id1,
                        nome: dupla.nome1,
                        fotoUrl: dupla.fotoUrl1,
                      }}
                      avatarSizeClasses="size-14 md:size-16"
                    />
                    <p className="mt-1 w-full text-wrap text-xs font-medium leading-tight md:mt-0 md:flex-1 md:text-left">
                      {dupla.nome1}
                    </p>
                  </div>

                  {/* Conector & */}
                  <div className="flex shrink-0 flex-col items-center">
                    <span className="text-lg font-bold text-muted-foreground">
                      &
                    </span>
                  </div>

                  {/* Jogador 2 (Mobile: Coluna | Desktop: Linha à direita, nome ANTES da foto) */}
                  <div className="flex flex-1 flex-col items-center text-center md:flex-row md:gap-3">
                    <AvatarLoad
                      jogador={{
                        id: dupla.id2,
                        nome: dupla.nome2,
                        fotoUrl: dupla.fotoUrl2,
                      }}
                      avatarSizeClasses="size-14 md:size-16"
                    />
                    {/* O md:order-first faz o nome pular para frente da foto apenas no desktop */}
                    <p className="mt-1 w-full text-wrap text-xs font-medium leading-tight md:mt-0 md:flex-1 md:text-right md:order-first">
                      {dupla.nome2}
                    </p>
                  </div>

                  {/* Valor Estatístico */}
                  <div className="w-12 shrink-0 text-right">
                    <p className="text-sm font-bold tabular-nums text-muted-foreground">
                      {mostrarGA ? dupla.gaJuntos : dupla.vezesJuntos}
                    </p>
                    <p className="text-[10px] text-muted-foreground/70">
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