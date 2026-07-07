import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import type { EtapaCadastro } from "@/pages/cadastro-caixinha-page";
import { PLANOS, type TipoPlano } from "@/types/caixinha/planos";

interface SelecaoPlanoCaixinhaProps {
  planoSelecionado: TipoPlano;
  setPlanoSelecionado: (plano: TipoPlano) => void;
  setEtapa: (etapa: EtapaCadastro) => void;
}

export default function SelecaoPlanoCaixinha({
  planoSelecionado,
  setPlanoSelecionado,
  setEtapa,
}: SelecaoPlanoCaixinhaProps) {
  return (
    <div>
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-xl font-bold">Escolha seu Plano ⚽</CardTitle>
        <CardDescription className="text-slate-400">
          Todos os planos custam R$ 10,00/mês, com uma taxa de 5% no Cartão de Crédito. Escolha por quanto tempo quer garantir sua vaga.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 py-4">
        {PLANOS.map((plano) => {
          const ativo = planoSelecionado === plano.id;
          return (
            <button
              key={plano.id}
              onClick={() => setPlanoSelecionado(plano.id)}
              className={`w-full relative flex items-center justify-between p-4 rounded-xl border-2 text-left transition-all ${
                ativo
                  ? "border-emerald-500 shadow-sm"
                  : "border-slate-200 hover:border-slate-300 "
              }`}
            >
              
              <div>
                <p className={`font-bold text-lg ${ativo ? "text-emerald-700" : "text-slate-700"}`}>
                  {plano.nome}
                </p>
                <p className="text-sm text-slate-500">
                  {plano.meses === 1 ? "Cobrado todo mês" : `Garantido por ${plano.meses} meses`}
                </p>
              </div>

              <div className="text-right">
                <p className={`text-xl font-bold ${ativo ? "text-emerald-700" : "text-slate-800"}`}>
                  R$ {plano.valorTotal.toFixed(2).replace('.', ',')}
                </p>
                {plano.meses > 1 && (
                  <p className="text-xs text-slate-400">R$ {plano.valorMensal.toFixed(2).replace('.', ',')}/mês</p>
                )}
              </div>
            </button>
          );
        })}
      </CardContent>

      <CardFooter>
        <Button
          onClick={() => setEtapa("selecao_pagamento")}
          className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 font-semibold text-white transition-colors"
        >
          Continuar
        </Button>
      </CardFooter>
    </div>
  );
}