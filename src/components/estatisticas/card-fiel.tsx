import type { FieloesData, FielTime } from "@/utils/estatisticas/times-helpers";
import AvatarLoad from "../avatar-load";
import { Card, CardHeader, CardContent } from "../ui/card";

interface TimeCardConfig {
  titulo: string;
  border: string;
  bgLight: string;
  bgDark: string;
  textNum: string;
  emoji: string;
}

const CONFIGS: Record<keyof FieloesData, TimeCardConfig> = {
  azul: {
    titulo: "Azul",
    border: "border-blue-500",
    bgLight: "bg-blue-50",
    bgDark: "dark:bg-blue-950/30",
    textNum: "text-blue-600 dark:text-blue-400",
    emoji: "🔵",
  },
  preto: {
    titulo: "Preto",
    border: "border-zinc-800 dark:border-zinc-300",
    bgLight: "bg-zinc-100",
    bgDark: "dark:bg-zinc-800/30",
    textNum: "text-zinc-800 dark:text-zinc-200",
    emoji: "⚫",
  },
  branco: {
    titulo: "Branco",
    border: "border-slate-300 dark:border-slate-500",
    bgLight: "bg-slate-50",
    bgDark: "dark:bg-slate-800/30",
    textNum: "text-slate-600 dark:text-slate-300",
    emoji: "⚪",
  },
  vermelho: {
    titulo: "Vermelho",
    border: "border-red-500",
    bgLight: "bg-red-50",
    bgDark: "dark:bg-red-950/30",
    textNum: "text-red-600 dark:text-red-400",
    emoji: "🔴",
  },
  goleiros: {
    titulo: "Goleiro",
    border: "border-yellow-500",
    bgLight: "bg-yellow-50",
    bgDark: "dark:bg-yellow-950/30",
    textNum: "text-yellow-600 dark:text-yellow-400",
    emoji: "🧤",
  },
};

interface CardTimeProps {
  timeKey: keyof FieloesData;
  fiel: FielTime | null;
}

export default function CardTime({ timeKey, fiel }: CardTimeProps) {
  const config = CONFIGS[timeKey];

  return (
    <Card
      className={`overflow-hidden border-t-4 ${config.border} ${config.bgLight} ${config.bgDark} transition-all hover:shadow-md`}
    >
      <CardHeader className="flex flex-row items-center justify-center p-0">
        <span className="text-lg">{config.emoji}</span>
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {config.titulo}
        </p>
      </CardHeader>
      <CardContent className="flex items-center gap-2">
        <AvatarLoad
          jogador={fiel ?? { id: "0", nome: "Nenhum", fotoUrl: null }}
          avatarSizeClasses="size-14"
        />

        <div className="flex flex-1 flex-col items-start justify-center">
          <div className="flex items-center">
            <p className="text-wrap text-sm font-semibold">
              {fiel ? fiel.nome : "Sem registros"}
            </p>
          </div>

          {fiel && (
            <div className="text-right flex items-center gap-1">
              <p className={`text-xl font-black ${config.textNum}`}>
                {fiel.vezes}
              </p>
              <p className="text-[10px] font-medium uppercase text-muted-foreground">
                Vezes
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
