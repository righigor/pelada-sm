import type { RankingItem } from "@/utils/estatisticas/mvp-helper";
import type { Trophy } from "lucide-react";
import AvatarLoad from "../avatar-load";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

const POSICOES_CORES = {
  1: "text-amber-500",
  2: "text-slate-400",
  3: "text-amber-700 dark:text-amber-600",
};

export default function ListaTop5({
  titulo,
  icone: Icone,
  dados,
  corValor,
}: {
  titulo: string;
  icone: typeof Trophy;
  dados: RankingItem[];
  corValor: string;
}) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center gap-3 pb-3">
        <Icone className={`h-5 w-5 ${corValor}`} />
        <CardTitle className="text-base font-semibold">{titulo}</CardTitle>
      </CardHeader>
      <CardContent>
        {dados.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            Nenhum registro ainda.
          </p>
        ) : (
          <div className="space-y-3">
            {dados.map((item, index) => {
              const posicao = index + 1;
              const corPosicao = POSICOES_CORES[posicao as keyof typeof POSICOES_CORES];

              return (
                <div
                  key={item.jogadorId}
                  className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50"
                >
                  {/* Posição */}
                  <div className={`w-6 text-center font-black ${corPosicao ?? "text-muted-foreground/50"}`}>
                    {posicao}
                  </div>

                  {/* Avatar e Nome */}
                  <AvatarLoad
                    jogador={item}
                    avatarSizeClasses="size-12 md:size-18"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{item.nome}</p>
                  </div>

                  {/* Valor */}
                  <span className={`text-sm font-bold tabular-nums ${corValor}`}>
                    {item.valor}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}