import type {
  calcularPioresDesempenhos,
  DestaqueGeral,
} from "@/utils/estatisticas/hall-helper";
import AvatarLoad from "../avatar-load";
import { Card, CardContent, CardHeader } from "../ui/card";
import type { JogadorNewResponseType } from "@/types/jogadores/Jogador";
import { Handshake, Swords, Target, TrendingDown } from "lucide-react";

interface CardPiorConfig {
  titulo: string;
  sufixo: string;
  icone: typeof Target;
  textColor: string;
  badgeBg: string;
}

const CONFIGS: Record<
  keyof ReturnType<typeof calcularPioresDesempenhos>,
  CardPiorConfig
> = {
  menosGols: {
    titulo: "Menos Gols",
    sufixo: "Gols",
    icone: Target,
    textColor: "text-stone-600 dark:text-stone-300",
    badgeBg: "bg-stone-100 dark:bg-stone-900/50",
  },
  menosAssistencias: {
    titulo: "Menos Assist.",
    sufixo: "Assistências",
    icone: Handshake,
    textColor: "text-stone-600 dark:text-stone-300",
    badgeBg: "bg-stone-100 dark:bg-stone-900/50",
  },
  menosGATotal: {
    titulo: "Menos G/A Total",
    sufixo: "G/A",
    icone: Swords,
    textColor: "text-orange-700 dark:text-orange-400",
    badgeBg: "bg-orange-50 dark:bg-orange-950/50",
  },
  menosGAMedio: {
    titulo: "Menos G/A Médio",
    sufixo: "G/A/Jogo",
    icone: TrendingDown,
    textColor: "text-orange-700 dark:text-orange-400",
    badgeBg: "bg-orange-50 dark:bg-orange-950/50",
  },
};

interface CardPioresHallDaLamaProps {
  categoria: keyof ReturnType<typeof calcularPioresDesempenhos>;
  destaque: DestaqueGeral | null;
  jogosMinimos: number;
  jogadores: JogadorNewResponseType[];
}

export default function CardPioresHallDaLama({
  categoria,
  destaque,
  jogosMinimos,
  jogadores,
}: CardPioresHallDaLamaProps) {
  const config = CONFIGS[categoria];
  const Icone = config.icone;

  return (
    <Card className="group relative overflow-hidden border-2 border-muted-foreground/30 bg-background transition-all duration-300 hover:border-orange-400/60 dark:border-muted-foreground/20 dark:hover:border-orange-600/60">
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
            {destaque ? destaque.nome : "Sem registros"}
          </p>
          <p
            className={`text-3xl font-black tracking-tight ${config.textColor}`}
          >
            {destaque ? destaque.valor : 0}
          </p>
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground/70">
            {config.sufixo}
          </p>
        </div>

        <div className="mt-auto pt-3 space-y-2">
          <span
            className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${config.badgeBg} ${config.textColor}`}
          >
            {config.titulo}
          </span>
          <p className="text-[10px] text-muted-foreground/60">
            Mín. {jogosMinimos} jogos
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
