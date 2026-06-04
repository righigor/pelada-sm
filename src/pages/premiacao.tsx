import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useGetTopTresJogadores } from "@/hooks/jogadores/use-get-top-tres-jogadores";
import { useGetVotosPremiacao } from "@/hooks/premiacao/use-get-votos-premiacao";
import AvatarLoad from "@/components/avatar-load";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { JogadorNewResponseType } from "@/types/jogadores/Jogador";
import {
  IconTrophy,
  IconBallFootball,
  IconShoe,
  IconStar,
  IconFlame,
  IconX,
} from "@tabler/icons-react";

const TEMPORADA = "2026";

// ─── Confetti Canvas ──────────────────────────────────────────────────────────

function ConfettiCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const ctx = canvas.getContext("2d")!;
    const COLORS = [
      "#FFD700", "#FFA500", "#FF4500", "#00BFFF", "#32CD32",
      "#FF69B4", "#9370DB", "#FF8C00", "#ffffff", "#00CED1", "#ADFF2F",
    ];

    interface Particle {
      x: number; y: number; vx: number; vy: number;
      rotation: number; rotSpeed: number;
      color: string; w: number; h: number;
    }

    const particles: Particle[] = Array.from({ length: 260 }, () => ({
      x: Math.random() * canvas.width,
      y: -80 - Math.random() * 500,
      vx: (Math.random() - 0.5) * 6,
      vy: Math.random() * 8 + 3,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 12,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      w: Math.random() * 14 + 6,
      h: Math.random() * 7 + 3,
    }));

    let animId: number;
    let running = true;

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;
        p.vx += (Math.random() - 0.5) * 0.15;
        if (p.y > canvas.height + 30) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
          p.vy = Math.random() * 8 + 3;
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      running = false;
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-[200] pointer-events-none" />;
}

// ─── Sparkle Overlay ──────────────────────────────────────────────────────────

const SPARKLES = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 30 + 12,
  delay: Math.random() * 1.5,
  dur: Math.random() * 0.8 + 0.4,
  sym: ["✦", "✧", "★", "✨", "⭐", "💫", "🌟", "✵", "✶"][Math.floor(Math.random() * 9)],
  repeatDelay: Math.random() * 1.5 + 0.2,
}));

function SparkleField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {SPARKLES.map((s) => (
        <motion.span
          key={s.id}
          className="absolute select-none text-yellow-300 leading-none"
          // left/top/fontSize are runtime-random values — must stay inline
          style={{ left: `${s.x}%`, top: `${s.y}%`, fontSize: s.size }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.4, 0.7, 1.6, 0], opacity: [0, 1, 0.6, 1, 0], rotate: [0, 60, -40, 120, 180] }}
          transition={{ delay: s.delay, duration: s.dur, repeat: Infinity, repeatDelay: s.repeatDelay, ease: "easeInOut" }}
        >
          {s.sym}
        </motion.span>
      ))}
    </div>
  );
}

// ─── Theme & Config ───────────────────────────────────────────────────────────

type IconComponent = React.ComponentType<{ size?: number; className?: string }>;

interface CategoryTheme {
  text: string;
  bg: string;
  bgMuted: string;
  border: string;
  ring: string;
  cardGlow: string;
  photoGlow: string;
}

interface CategoryConfig {
  id: string;
  title: string;
  subtitle: string;
  Icon: IconComponent;
  type: "data" | "vote";
  statKey?: "gols" | "mvpsGeral" | "assistencias";
  statLabel?: string;
  tw: CategoryTheme;
}

const GOLD: CategoryTheme = {
  text:      "text-[#FFE234]",
  bg:        "bg-[#FFE234]",
  bgMuted:   "bg-[#FFE234]/10",
  border:    "border-[#FFE234]/30",
  ring:      "ring-[#FFE234]",
  cardGlow:  "shadow-[0_0_24px_rgba(255,226,52,0.08)]",
  photoGlow: "shadow-[0_0_50px_rgba(255,226,52,0.44)]",
};

const SILVER: CategoryTheme = {
  text:      "text-[#A8B2BD]",
  bg:        "bg-[#A8B2BD]",
  bgMuted:   "bg-[#A8B2BD]/10",
  border:    "border-[#A8B2BD]/30",
  ring:      "ring-[#A8B2BD]",
  cardGlow:  "shadow-[0_0_24px_rgba(168,178,189,0.08)]",
  photoGlow: "shadow-[0_0_50px_rgba(168,178,189,0.44)]",
};

const BRONZE: CategoryTheme = {
  text:      "text-[#C97D2F]",
  bg:        "bg-[#C97D2F]",
  bgMuted:   "bg-[#C97D2F]/10",
  border:    "border-[#C97D2F]/30",
  ring:      "ring-[#C97D2F]",
  cardGlow:  "shadow-[0_0_24px_rgba(201,125,47,0.08)]",
  photoGlow: "shadow-[0_0_50px_rgba(201,125,47,0.44)]",
};

const CATEGORIES: CategoryConfig[] = [
  { id: "artilheiro",   title: "Artilheiro",        subtitle: "Goleador da temporada",          Icon: IconBallFootball, type: "data", statKey: "gols",         statLabel: "gols",         tw: GOLD   },
  { id: "mvp",          title: "MVP da Temporada",   subtitle: "Jogador mais valioso",           Icon: IconTrophy,       type: "data", statKey: "mvpsGeral",    statLabel: "MVPs",         tw: GOLD   },
  { id: "assistente",   title: "Maior Assistente",   subtitle: "Mais assistências na temporada", Icon: IconShoe,         type: "data", statKey: "assistencias", statLabel: "assistências", tw: SILVER },
  { id: "craque-galera", title: "Craque da Galera",  subtitle: "Votação popular",                Icon: IconStar,         type: "vote",                                                    tw: SILVER },
  { id: "bagre-galera",  title: "Bagre da Galera",   subtitle: "Votação popular",                Icon: IconFlame,        type: "vote",                                                    tw: BRONZE },
];

interface WinnerInfo {
  nome: string;
  fotoUrl: string | null;
  statValue?: number;
  statLabel?: string;
}

// ─── Category Card ─────────────────────────────────────────────────────────────

function CategoryCard({
  category,
  onClick,
}: {
  category: CategoryConfig;
  winner: WinnerInfo | null | undefined;
  onClick: () => void;
}) {
  const { Icon, tw } = category;
  return (
    <motion.div whileHover={{ scale: 1.03, y: -6 }} whileTap={{ scale: 0.96 }} onClick={onClick} className="cursor-pointer h-full">
      <Card className={`relative overflow-hidden h-full border-2 transition-all duration-300 bg-background/80 ${tw.border} ${tw.cardGlow}`}>
        <CardContent className="p-6 flex flex-col items-center text-center gap-4 h-full min-h-[280px]">
          <div className={`p-3 rounded-full mt-1 ${tw.bgMuted}`}>
            <Icon size={32} className={tw.text} />
          </div>

          <div>
            <h3 className={`text-base font-bold ${tw.text}`}>{category.title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{category.subtitle}</p>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center gap-3">
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="text-4xl select-none"
            >
              ?
            </motion.div>
            {category.type === "vote" && (
              <Badge variant="outline" className={`text-xs ${tw.bgMuted} ${tw.text} ${tw.border}`}>
                Votação Popular
              </Badge>
            )}
          </div>

          <p className={`text-xs opacity-50 mt-auto ${tw.text}`}>Clique para revelar ✦</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─── Winner Reveal ─────────────────────────────────────────────────────────────

type RevealPhase = "sparkle" | "reveal";

function WinnerReveal({
  category,
  winner,
  onClose,
}: {
  category: CategoryConfig;
  winner: WinnerInfo | null | undefined;
  onClose: () => void;
}) {
  const [phase, setPhase] = useState<RevealPhase>("sparkle");
  const { Icon, tw } = category;

  useEffect(() => {
    const t = setTimeout(() => setPhase("reveal"), 1800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.4 } }}
        className="fixed inset-0 z-[150] flex items-center justify-center bg-black/95"
        onClick={phase === "reveal" ? onClose : undefined}
      >
        {/* Sparkle phase */}
        <AnimatePresence>
          {phase === "sparkle" && (
            <motion.div
              key="sparkle-phase"
              className="absolute inset-0 flex flex-col items-center justify-center gap-6"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.5 } }}
            >
              <SparkleField />
              <motion.div
                animate={{ scale: [1, 1.15, 1, 1.1, 1], rotate: [0, 8, -8, 5, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <Icon size={80} className={tw.text} />
              </motion.div>
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className={`relative z-10 text-2xl font-extrabold tracking-wide ${tw.text}`}
              >
                {category.title}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reveal phase */}
        <AnimatePresence>
          {phase === "reveal" && (
            <motion.div
              key="reveal-phase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative flex flex-col items-center gap-6 text-center px-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`absolute -inset-24 blur-3xl opacity-20 rounded-full pointer-events-none ${tw.bg}`} />

              <motion.p
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className={`relative z-10 text-sm font-bold uppercase tracking-[0.3em] ${tw.text}`}
              >
                {category.title}
              </motion.p>

              {winner ? (
                <>
                  <motion.div
                    initial={{ scale: 0, rotate: -15 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 180, damping: 12, delay: 0.25 }}
                    className={`relative z-10 rounded-2xl overflow-hidden ring-4 ring-offset-2 ring-offset-black ${tw.ring} ${tw.photoGlow}`}
                  >
                    <AvatarLoad jogador={winner} avatarSizeClasses="size-52 md:size-64" />
                  </motion.div>

                  <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.55 }}
                    className="relative z-10 flex flex-col items-center gap-2"
                  >
                    <h2 className="text-4xl md:text-6xl font-black text-white drop-shadow-2xl">
                      {winner.nome}
                    </h2>
                    {winner.statValue !== undefined && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.85 }}
                        className={`text-xl font-semibold ${tw.text}`}
                      >
                        {winner.statValue} {winner.statLabel}{category.type === "data" ? ` em ${TEMPORADA}` : ""}
                      </motion.p>
                    )}
                  </motion.div>
                </>
              ) : (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="relative z-10 flex flex-col items-center gap-4"
                >
                  <span className="text-8xl">🏆</span>
                  <p className="text-3xl font-black text-white">A ser anunciado</p>
                  <p className="text-muted-foreground text-sm">Resultado via votação popular</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
        >
          <IconX size={22} />
        </motion.button>
      </motion.div>

      {phase === "reveal" && <ConfettiCanvas />}
    </>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function PremiacaoPage() {
  const [selected, setSelected] = useState<CategoryConfig | null>(null);

  const AUSENTES = ["Filipe Guimarães"];

  const { data: artilheiros } = useGetTopTresJogadores("gols", 1, TEMPORADA);
  const { data: mvps }        = useGetTopTresJogadores("mvpsGeral", 5, TEMPORADA);
  const { data: assistentes } = useGetTopTresJogadores("assistencias", 5, TEMPORADA);
  const { data: votos }       = useGetVotosPremiacao(TEMPORADA);

  const getWinner = (category: CategoryConfig): WinnerInfo | null | undefined => {
    if (category.type === "vote") {
      if (!votos) return undefined;
      const voto =
        category.id === "craque-galera" ? votos.craqueGalera :
        category.id === "bagre-galera"  ? votos.bagreGalera  : null;
      if (!voto) return null;
      return { nome: voto.nome, fotoUrl: voto.fotoUrl, statValue: voto.votos, statLabel: "votos" };
    }

    let data: JogadorNewResponseType[] | undefined;
    if (category.statKey === "gols")         data = artilheiros;
    else if (category.statKey === "mvpsGeral")    data = mvps;
    else if (category.statKey === "assistencias") data = assistentes;

    if (!data) return undefined;
    const player = data.find((p) => !AUSENTES.includes(p.nome));
    if (!player) return null;

    const s = player.stats?.temporadas?.[TEMPORADA];
    const statMap: Record<string, number | undefined> = { gols: s?.gols, assistencias: s?.assistencias, mvpsGeral: s?.mvpsGeral };

    return { nome: player.nome, fotoUrl: player.fotoUrl, statValue: category.statKey ? statMap[category.statKey] : undefined, statLabel: category.statLabel };
  };

  return (
    <div className="min-h-screen px-4 py-12 md:px-8">
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
          className="text-5xl mb-4 select-none"
        >
          🏆
        </motion.div>
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-300 bg-clip-text text-transparent"
        >
          Premiação {TEMPORADA}
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground mt-3 text-base md:text-lg"
        >
          Clique em uma categoria para revelar o campeão da temporada
        </motion.p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.id}
            className="h-full"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.12 * i + 0.5 }}
          >
            <CategoryCard category={cat} winner={getWinner(cat)} onClick={() => setSelected(cat)} />
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selected && (
          <WinnerReveal
            key={selected.id}
            category={selected}
            winner={getWinner(selected)}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
