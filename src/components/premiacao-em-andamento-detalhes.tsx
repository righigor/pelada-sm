/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PremiacaoEdicao } from "@/hooks/premiacao/use-get-premiacao-em-andamento";
import { Button } from "./ui/button";
import { LinhaCategoria } from "./linha-categoria";
import { useState } from "react";
import { useSalvarPremiacao } from "@/hooks/premiacao/use-salvar-premiacao";
import LoadingButton from "./loading-button";

interface PremiacaoEmAndamentoDetalhesProps {
  p: PremiacaoEdicao;
  setPremiacaoSelecionada: (p: PremiacaoEdicao | null) => void;
}

export default function PremiacaoEmAndamentoDetalhes({
  p,
  setPremiacaoSelecionada,
}: PremiacaoEmAndamentoDetalhesProps) {
  const [valoresFinais, setValoresFinais] = useState<Record<string, any>>({});

  const { mutate: salvarPremiacao, isPending } = useSalvarPremiacao();

  const handleSubmit = () => {
    salvarPremiacao({
      premiacaoOriginal: p,
      valoresFinais,
    })
  };
  return (
    <div className="space-y-6">
      <div className="bg-muted/40 border rounded-xl p-6">
        <h3 className="text-lg font-medium mb-4">Categorias em Apuração</h3>

        <div className="grid md:grid-cols-3 gap-4">
          {p.categorias.map((cat) => (
            <LinhaCategoria key={cat.idCategoria} cat={cat} />
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button variant="outline" onClick={() => setPremiacaoSelecionada(null)}>
          Voltar
        </Button>
        <LoadingButton isLoading={isPending} onClick={handleSubmit}>Salvar Premiação</LoadingButton>
      </div>
    </div>
  );
}
