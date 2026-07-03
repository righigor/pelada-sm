import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";
import { Smartphone, CreditCard } from "lucide-react";
import type { EtapaCadastro } from "@/pages/cadastro-caixinha-page";
import type { MetodoPagamento } from "@/types/caixinha/planos";

interface SelecaoMetodoPagamentoProps {
  metodoPagamento: MetodoPagamento;
  setMetodoPagamento: (metodo: MetodoPagamento) => void;
  setEtapa: (etapa: EtapaCadastro) => void;
}

export default function SelecaoMetodoPagamento({
  metodoPagamento,
  setMetodoPagamento,
  setEtapa,
}: SelecaoMetodoPagamentoProps) {
  const opcoes: {
    id: MetodoPagamento;
    label: string;
    desc: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: "pix",
      label: "PIX",
      desc: "Aprovação imediata via QR Code",
      icon: <Smartphone className="w-6 h-6" />,
    },
    {
      id: "cartao",
      label: "Cartão de Crédito",
      desc: "Cobrança automática recorrente",
      icon: <CreditCard className="w-6 h-6" />,
    },
  ];

  return (
    <>
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-xl font-bold">
          Forma de Pagamento 💳
        </CardTitle>
        <CardDescription className="text-slate-400">
          Como você prefere pagar?
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 pt-4">
        {opcoes.map((opt) => {
          const ativo = metodoPagamento === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => setMetodoPagamento(opt.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${
                ativo
                  ? "border-emerald-500 shadow-sm"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div
                className={`p-2 rounded-lg ${ativo ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}
              >
                {opt.icon}
              </div>
              <div>
                <p
                  className={`font-bold ${ativo ? "text-emerald-700" : "text-slate-700"}`}
                >
                  {opt.label}
                </p>
                <p className="text-sm text-slate-500">{opt.desc}</p>
              </div>
            </button>
          );
        })}
      </CardContent>

      <CardFooter className="flex gap-3">
        <Button
          variant="outline"
          onClick={() => setEtapa("selecao_plano")}
          className="h-11 border-slate-200 text-slate-600 font-medium"
        >
          Voltar
        </Button>
        <Button
          onClick={() => setEtapa("formulario_adesao")}
          className="flex-1 h-11 bg-emerald-600 hover:bg-emerald-700 font-semibold text-white transition-colors"
        >
          Continuar
        </Button>
      </CardFooter>
    </>
  );
}
