import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { CategoryTheme } from "./temas-premiacao";
import { IconeDinamico } from "./icone-dinamico";


interface PremiacaoCategoriaCardProps {
  nome: string;
  icone: string;
  tipoCalculo: "AUTOMATICO" | "MANUAL";
  tema: CategoryTheme;
  onClick: () => void;
}

export default function PremiacaoCategoriaCard({
  nome,
  icone,
  tipoCalculo,
  tema,
  onClick,
}: PremiacaoCategoriaCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -6 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className="cursor-pointer h-full"
    >
      <Card
        className={`relative overflow-hidden h-full border-2 transition-all duration-300 bg-background/80 ${tema.border} ${tema.cardGlow}`}
      >
        <CardContent className="p-6 flex flex-col items-center text-center gap-4 h-full min-h-[280px]">
          <div className={`p-3 rounded-full mt-1 ${tema.bgMuted}`}>
            <IconeDinamico nome={icone} className={`h-8 w-8 ${tema.text}`} />
          </div>

          <div>
            <h3 className={`text-base font-bold ${tema.text}`}>{nome}</h3>
            <p className="text-xs text-muted-foreground mt-1">
              {tipoCalculo === "AUTOMATICO"
                ? "Cálculo Automático"
                : "Votação Popular"}
            </p>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center gap-3">
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-4xl select-none"
            >
              ?
            </motion.div>
            {tipoCalculo === "MANUAL" && (
              <Badge
                variant="outline"
                className={`text-xs ${tema.bgMuted} ${tema.text} ${tema.border}`}
              >
                Votação Popular
              </Badge>
            )}
          </div>

          <p className={`text-xs opacity-50 mt-auto ${tema.text}`}>
            Clique para revelar ✦
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
