import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Calendar } from "lucide-react";
import type { JogadorNewResponseType } from "@/types/jogadores/Jogador";
import type { EtapaCadastro } from "@/pages/cadastro-caixinha-page";

interface ComponenteStatusAtivoProps {
  jogadorSelecionado: JogadorNewResponseType | null;
  setEtapa: (etapa: EtapaCadastro) => void;
  setJogadorSelecionado: (jogador: JogadorNewResponseType | null) => void;
}

export function ComponenteStatusAtivo({
  jogadorSelecionado,
  setEtapa,
  setJogadorSelecionado,
}: ComponenteStatusAtivoProps) {
  const handleSair = () => {
    setJogadorSelecionado(null);
    setEtapa("identificacao");
  };

  const obterNomePlano = (diaVencimento: string | null | undefined) => {
    if (diaVencimento) {
      return `Todo dia ${diaVencimento.padStart(2, "0")}`;
    }
    return "Mensal";
  };

  return (
    <>
      <CardContent className="py-10 flex flex-col items-center justify-center text-center space-y-6">
        <div className="w-16 h-16 rounded-full border border-emerald-200 flex items-center justify-center shadow-inner">
          <CheckCircle2 className="w-10 h-10 text-emerald-600" />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold">Mensalista Ativo! 🎉</h3>
          <p className="text-sm text-slate-300 max-w-xs mx-auto leading-relaxed">
            Fala,{" "}
            <span className="font-semibold text-white">
              {jogadorSelecionado?.nome}
            </span>
            ! Sua assinatura de **R$ 10,50** via Mercado Pago está confirmada e
            rodando.
          </p>
        </div>

        <div className="space-y-0.5">
          <span className="text-xs text-slate-400 flex items-center gap-1 justify-center">
            <Calendar className="w-3.5 h-3.5" /> Vencimento
          </span>
          <span className="text-sm font-semibold text-slate-400">
            {obterNomePlano(jogadorSelecionado?.assinatura?.diaVencimento)}
          </span>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          onClick={handleSair}
          variant="outline"
          className="w-full h-11 border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors"
        >
          Voltar para o Início
        </Button>
      </CardFooter>
    </>
  );
}