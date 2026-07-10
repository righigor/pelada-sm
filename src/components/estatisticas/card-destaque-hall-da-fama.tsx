import type {
  calcularHallDaFama,
  DestaqueGeral,
} from "@/utils/estatisticas/hall-helper";
import AvatarLoad from "../avatar-load";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  Crown,
  Target,
  Star,
  Fish,
  ShieldCheck,
  Swords,
  TrendingUp,
  CalendarDays,
} from "lucide-react";
import type { JogadorNewResponseType } from "@/types/jogadores/Jogador";

interface CardConfig {
  titulo: string;
  sufixo: string;
  icone: typeof Crown;
  gradientLight: string;
  gradientDark: string;
  borderHover: string;
  textColor: string;
}

const CONFIGS: Record<keyof ReturnType<typeof calcularHallDaFama>, CardConfig> =
  {
    artilheiro: {
      titulo: "Artilheiro",
      sufixo: "Gols",
      icone: Crown,
      gradientLight: "from-amber-50 to-white",
      gradientDark: "dark:from-amber-950/40 dark:to-card",
      borderHover: "hover:border-amber-300 dark:hover:border-amber-700",
      textColor: "text-amber-600 dark:text-amber-400",
    },
    maiorAssistente: {
      titulo: "Maior Assistente",
      sufixo: "Assistências",
      icone: Target,
      gradientLight: "from-blue-50 to-white",
      gradientDark: "dark:from-blue-950/40 dark:to-card",
      borderHover: "hover:border-blue-300 dark:hover:border-blue-700",
      textColor: "text-blue-600 dark:text-blue-400",
    },
    mvpGeral: {
      titulo: "MVP Geral",
      sufixo: "MVPs",
      icone: Star,
      gradientLight: "from-violet-50 to-white",
      gradientDark: "dark:from-violet-950/40 dark:to-card",
      borderHover: "hover:border-violet-300 dark:hover:border-violet-700",
      textColor: "text-violet-600 dark:text-violet-400",
    },
    bagre: {
      titulo: "Bagre",
      sufixo: "Gols Contra",
      icone: Fish,
      gradientLight: "from-rose-50 to-white",
      gradientDark: "dark:from-rose-950/40 dark:to-card",
      borderHover: "hover:border-rose-300 dark:hover:border-rose-700",
      textColor: "text-rose-600 dark:text-rose-400",
    },
    paredao: {
      titulo: "Paredão",
      sufixo: "DDs",
      icone: ShieldCheck,
      gradientLight: "from-emerald-50 to-white",
      gradientDark: "dark:from-emerald-950/40 dark:to-card",
      borderHover: "hover:border-emerald-300 dark:hover:border-emerald-700",
      textColor: "text-emerald-600 dark:text-emerald-400",
    },
    maiorGATotal: {
      titulo: "Maior G/A Total",
      sufixo: "G/A",
      icone: Swords,
      gradientLight: "from-cyan-50 to-white",
      gradientDark: "dark:from-cyan-950/40 dark:to-card",
      borderHover: "hover:border-cyan-300 dark:hover:border-cyan-700",
      textColor: "text-cyan-600 dark:text-cyan-400",
    },
    maiorGAMedio: {
      titulo: "Maior G/A Médio",
      sufixo: "G/A/Jogo",
      icone: TrendingUp,
      gradientLight: "from-sky-50 to-white",
      gradientDark: "dark:from-sky-950/40 dark:to-card",
      borderHover: "hover:border-sky-300 dark:hover:border-sky-700",
      textColor: "text-sky-600 dark:text-sky-400",
    },
    maisPartidas: {
      titulo: "Mais Partidas",
      sufixo: "Jogos",
      icone: CalendarDays,
      gradientLight: "from-zinc-100 to-white",
      gradientDark: "dark:from-zinc-800/40 dark:to-card",
      borderHover: "hover:border-zinc-400 dark:hover:border-zinc-500",
      textColor: "text-zinc-700 dark:text-zinc-200",
    },
  };

interface CardDestaqueHallDaFamaProps {
  categoria: keyof ReturnType<typeof calcularHallDaFama>;
  destaque: DestaqueGeral | null;
  jogadores: JogadorNewResponseType[];
}

export default function CardDestaqueHallDaFama({
  categoria,
  destaque,
  jogadores,
}: CardDestaqueHallDaFamaProps) {
  const config = CONFIGS[categoria];
  const Icone = config.icone;

  return (
    <Card
      className={`group relative overflow-hidden border-2 transition-all duration-300 ${config.gradientLight} ${config.gradientDark} ${config.borderHover}`}
    >
      <CardHeader className="flex items-center justify-center p-0">
        <Icone className={`size-6 ${config.textColor}`} />
      </CardHeader>
      <CardContent className="flex flex-col items-center text-center">
        <AvatarLoad
          avatarSizeClasses="size-20 md:size-30"
          jogador={jogadores.find((j) => j.id === destaque?.jogadorId)!}
        />
        <div className="mt-1 space-y-1">
          <p className="text-sm font-semibold text-muted-foreground line-clamp-1">
            {destaque ? destaque.nome : "Sem registro"}
          </p>
          <p
            className={`text-4xl font-black tracking-tight ${config.textColor}`}
          >
            {destaque ? destaque.valor : 0}
          </p>
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground/70">
            {config.sufixo}
          </p>
        </div>

        <div className="mt-auto pt-4">
          <span
            className={`text-xs font-bold uppercase tracking-wider ${config.textColor} opacity-80`}
          >
            {config.titulo}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
