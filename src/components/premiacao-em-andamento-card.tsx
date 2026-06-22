import type { PremiacaoEdicao } from "@/hooks/premiacao/use-get-premiacao-em-andamento";
import { Calendar } from "lucide-react";

interface PremiacaoEmAndamentoCardProps {
  p: PremiacaoEdicao;
  setPremiacaoSelecionada: (p: PremiacaoEdicao) => void;
}

export default function PremiacaoEmAndamentoCard({
  p,
  setPremiacaoSelecionada,
}: PremiacaoEmAndamentoCardProps) {
  return (
    <div
      key={p.id}
      onClick={() => setPremiacaoSelecionada(p)}
      className="group border rounded-xl p-5 bg-card hover:bg-accent/40 cursor-pointer shadow-sm transition-all hover:shadow-md flex flex-col justify-between"
    >
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800 animate-pulse">
            ● Ao Vivo
          </span>
          <span className="text-xs text-muted-foreground">
            {p.categorias.length} categorias inclusas
          </span>
        </div>
        <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
          {p.nome}
        </h3>
      </div>

      <div className="flex items-center text-xs text-muted-foreground gap-1.5 mt-5 pt-3 border-t">
        <Calendar className="h-3.5 w-3.5" />
        Iniciada em {new Date(p.dataCriacao).toLocaleDateString("pt-BR")}
      </div>
    </div>
  );
}
