import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetPremiacaoById } from "@/hooks/premiacao/use-get-premiacao-by-id";
import PremiacaoCategoriaCard from "@/components/premiacao/premiacao-categoria-card";
import PremiacaoWinnerReveal from "@/components/premiacao/premiacao-winner-reveal";
import { getTemaPorNome } from "@/components/premiacao/temas-premiacao";

export default function PremiacaoDetalhesPage() {
  const { id } = useParams<{ id: string }>();
  const { data: premiacao, isLoading, error } = useGetPremiacaoById(id);
  
  console.log("premiacao", premiacao);

  const [selectedCatIndex, setSelectedCatIndex] = useState<number | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !premiacao) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-8">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <h2 className="text-2xl font-bold">Premiação não encontrada</h2>
        <Link to="/premiacoes"><Button variant="outline">Voltar ao Histórico</Button></Link>
      </div>
    );
  }

  const selectedCat = selectedCatIndex !== null ? premiacao.categorias[selectedCatIndex] : null;

  return (
    <div className="min-h-screen px-4 py-12 md:px-8">
      <div className="max-w-5xl mx-auto mb-12">
        <Link to="/premiacoes" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground gap-1 mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Voltar para o Histórico
        </Link>

        <div className="text-center">
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
            className="text-4xl md:text-6xl font-extrabold bg-linear-to-r from-yellow-300 via-amber-400 to-yellow-300 bg-clip-text text-transparent"
          >
            {premiacao.nome}
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground mt-3 text-base md:text-lg"
          >
            Clique em uma categoria para revelar o campeão
          </motion.p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {premiacao.categorias.map((cat, i) => {
          const tema = getTemaPorNome(cat.nome);
          return (
            <motion.div
              key={cat.idCategoria}
              className="h-full"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.12 * i + 0.5 }}
            >
              <PremiacaoCategoriaCard
                nome={cat.nome}
                icone={cat.funcaoReferencia || "trophy"}
                tipoCalculo={cat.tipoCalculo}
                tema={tema}
                onClick={() => setSelectedCatIndex(i)}
              />
            </motion.div>
          );
        })}
      </div>

      {selectedCat && (
        <PremiacaoWinnerReveal
          nomeCategoria={selectedCat.nome}
          iconeCategoria={selectedCat.funcaoReferencia || "trophy"}
          tema={getTemaPorNome(selectedCat.nome)}
          winner={{
            vencedorNome: selectedCat.vencedorNome,
            vencedorFotoUrl: selectedCat.vencedorFotoUrl || null,
            detalhes: selectedCat.detalhes || ""
          }}
          onClose={() => setSelectedCatIndex(null)}
        />
      )}
    </div>
  );
}