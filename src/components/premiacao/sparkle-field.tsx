import { motion } from "motion/react";

const SPARKLES = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 30 + 12,
  delay: Math.random() * 1.5,
  dur: Math.random() * 0.8 + 0.4,
  sym: ["✦", "✧", "★", "✨", "⭐", "💫", "🌟", "✵", "✶"][
    Math.floor(Math.random() * 9)
  ],
  repeatDelay: Math.random() * 1.5 + 0.2,
}));

export default function SparkleField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {SPARKLES.map((s) => (
        <motion.span
          key={s.id}
          className="absolute select-none text-yellow-300 leading-none"
          style={{ left: `${s.x}%`, top: `${s.y}%`, fontSize: s.size }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.4, 0.7, 1.6, 0],
            opacity: [0, 1, 0.6, 1, 0],
            rotate: [0, 60, -40, 120, 180],
          }}
          transition={{
            delay: s.delay,
            duration: s.dur,
            repeat: Infinity,
            repeatDelay: s.repeatDelay,
            ease: "easeInOut",
          }}
        >
          {s.sym}
        </motion.span>
      ))}
    </div>
  );
}
