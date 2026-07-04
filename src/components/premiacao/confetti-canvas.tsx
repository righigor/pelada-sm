import { useEffect, useRef } from "react";

export default function ConfettiCanvas() {
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
      "#FFD700",
      "#FFA500",
      "#FF4500",
      "#00BFFF",
      "#32CD32",
      "#FF69B4",
      "#9370DB",
      "#FF8C00",
      "#ffffff",
      "#00CED1",
      "#ADFF2F",
    ];

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      rotation: number;
      rotSpeed: number;
      color: string;
      w: number;
      h: number;
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

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-200 pointer-events-none"
    />
  );
}
