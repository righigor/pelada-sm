import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import AvatarLoad from "@/components/avatar-load";
import ConfettiCanvas from "./confetti-canvas";
import SparkleField from "./sparkle-field";
import type { CategoryTheme } from "./temas-premiacao";
import { IconeDinamico } from "./icone-dinamico";

interface WinnerData {
  vencedorNome: string | null;
  vencedorFotoUrl: string | null;
  detalhes: string;
}

interface PremiacaoWinnerRevealProps {
  nomeCategoria: string;
  iconeCategoria: string;
  tema: CategoryTheme;
  winner: WinnerData;
  onClose: () => void;
}

export default function PremiacaoWinnerReveal({
  nomeCategoria,
  iconeCategoria,
  tema,
  winner,
  onClose,
}: PremiacaoWinnerRevealProps) {
  const [phase, setPhase] = useState<"sparkle" | "reveal">("sparkle");

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
        className="fixed inset-0 z-150 flex items-center justify-center bg-black/95"
        onClick={phase === "reveal" ? onClose : undefined}
      >
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
                animate={{
                  scale: [1, 1.15, 1, 1.1, 1],
                  rotate: [0, 8, -8, 5, 0],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10"
              >
                <IconeDinamico
                  nome={iconeCategoria}
                  className={`h-20 w-20 ${tema.text}`}
                />
              </motion.div>
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className={`relative z-10 text-2xl font-extrabold tracking-wide ${tema.text}`}
              >
                {nomeCategoria}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase === "reveal" && (
            <motion.div
              key="reveal-phase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative flex flex-col items-center gap-6 text-center px-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`absolute -inset-24 blur-3xl opacity-20 rounded-full pointer-events-none ${tema.bg}`}
              />

              <motion.p
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className={`relative z-10 text-sm font-bold uppercase tracking-[0.3em] ${tema.text}`}
              >
                {nomeCategoria}
              </motion.p>

              {winner.vencedorNome ? (
                <>
                  <motion.div
                    initial={{ scale: 0, rotate: -15 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 180,
                      damping: 12,
                      delay: 0.25,
                    }}
                    className={`relative z-10 rounded-2xl overflow-hidden ring-4 ring-offset-2 ring-offset-black ${tema.ring} ${tema.photoGlow}`}
                  >
                    <AvatarLoad
                      jogador={{
                        nome: winner.vencedorNome,
                        fotoUrl: winner.vencedorFotoUrl,
                      }}
                      avatarSizeClasses="size-52 md:size-64"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.55 }}
                    className="relative z-10 flex flex-col items-center gap-2"
                  >
                    <h2 className="text-4xl md:text-6xl font-black text-white drop-shadow-2xl">
                      {winner.vencedorNome}
                    </h2>
                    {winner.detalhes && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.85 }}
                        className={`text-xl font-semibold ${tema.text}`}
                      >
                        {winner.detalhes}
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
                  <p className="text-3xl font-black text-white">
                    A ser anunciado
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
        >
          <X size={22} />
        </motion.button>
      </motion.div>

      {phase === "reveal" && <ConfettiCanvas />}
    </>
  );
}
