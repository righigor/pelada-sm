import type { RankingItem } from "@/utils/estatisticas/mvp-helper";
import type { Trophy } from "lucide-react";
import AvatarLoad from "../avatar-load";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import MvpError from "./errors/mvp-error";

const POSICOES_CORES = {
  1: "text-amber-500",
  2: "text-slate-400",
  3: "text-amber-700 dark:text-amber-600",
};

interface ListaRankingProps {
  titulo: string;
  icone: typeof Trophy;
  dados: RankingItem[];
}

export default function ListaRanking({
  titulo,
  icone: Icone,
  dados,
}: ListaRankingProps) {
  if (!dados || dados.length === 0) {
    return <MvpError />;
  }

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center gap-3 pb-3">
        <Icone className="h-5 w-5 text-primary" />
        <CardTitle className="text-base font-semibold">{titulo}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {dados.map((item, index) => {
            const posicao = index + 1;
            const corPosicao =
              POSICOES_CORES[posicao as keyof typeof POSICOES_CORES];

            return (
              <div
                key={item.jogadorId}
                className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50"
              >
                <div
                  className={`w-6 text-center font-black ${corPosicao ?? "text-muted-foreground/50"}`}
                >
                  {posicao}
                </div>

                <AvatarLoad
                  jogador={item}
                  avatarSizeClasses="size-12 md:size-18"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{item.nome}</p>
                </div>

                <span className="text-sm font-bold tabular-nums text-muted-foreground">
                  {item.valor}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
