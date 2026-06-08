import { Button } from "./ui/button";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Input } from "./ui/input";
import type { JogadorNewResponseType } from "@/types/jogadores/Jogador";
import type { EtapaCadastro } from "@/pages/cadastro-caixinha-page";
import { useState } from "react";
import { Calendar, CreditCard } from "lucide-react";
import LoadingButton from "./loading-button";

interface FormularioAdesaoCaixinhaProps {
  jogadorSelecionado: JogadorNewResponseType;
  setEtapa(etapa: EtapaCadastro): void;
  criarAssinatura: (
    variables: {
      jogadorId: string;
      nome: string;
      telefone: string;
      cpf: string;
      diaVencimento: string;
    },
    options?: {
      onSuccess?: (data: { sucesso: boolean; pixCopiaECola: string }) => void;
      onError?: (error: Error) => void;
    },
  ) => void;
  isGerandoPix: boolean;
  setPixDados(pix: string): void;
}

export default function FormularioAdesaoCaixinha({
  jogadorSelecionado,
  setEtapa,
  criarAssinatura,
  isGerandoPix,
  setPixDados
}: FormularioAdesaoCaixinhaProps) {
  const [cpf, setCpf] = useState("");
  const [diaVencimento, setDiaVencimento] = useState("10");

  const aplicarMascaraCPF = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .substring(0, 14);
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(aplicarMascaraCPF(e.target.value));
  };

  const cpfValido = cpf.replace(/\D/g, "").length === 11;

  const handleGerarAssinatura = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!cpfValido) return;
    criarAssinatura({
      jogadorId: jogadorSelecionado.id,
      nome: jogadorSelecionado.nome,
      telefone: jogadorSelecionado.telefone,
      cpf: cpf.replace(/\D/g, ''),
      diaVencimento: diaVencimento
    }, {
      onSuccess: (data) => {
        setPixDados(data.pixCopiaECola);
        setEtapa('exibir_pix');
      },
      onError: () => {
        alert("Houve um erro ao gerar o seu Pix. Tente novamente.");
      }
    });
  };

  const opcoesDias = ["5", "10", "15"];
  return (
    <>
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl font-bold">
          Fala, {jogadorSelecionado.nome}! 👋
        </CardTitle>
        <CardDescription className="text-slate-300">
          Você ainda não é mensalista. Vamos ativar sua assinatura de **R$
          10,50/mês**.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-400 flex items-center gap-1.5">
            <CreditCard className="w-4 h-4 text-slate-200" /> Seu CPF
          </label>
          <Input
            type="text"
            placeholder="000.000.000-00"
            value={cpf}
            onChange={handleCpfChange}
            className="h-11 border-slate-200 focus-visible:ring-emerald-500"
          />
          <p className="text-xs text-slate-400">
            Obrigatório pelo Banco Central para emitir cobranças via Mercado
            Pago.
          </p>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-400 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-slate-200" /> Melhor dia de
            vencimento mensal
          </label>
          <div className="grid grid-cols-3 gap-3">
            {opcoesDias.map((dia) => {
              const ativo = diaVencimento === dia;
              return (
                <label
                  key={dia}
                  className={`
                    flex flex-col items-center justify-center p-3 rounded-xl border text-center cursor-pointer transition-all select-none
                    ${
                      ativo
                        ? "border-emerald-900 ring-1 ring-emerald-800 text-emerald-700 font-bold"
                        : "border-slate-200 text-slate-600 hover:border-slate-300 font-medium"
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="diaVencimento"
                    value={dia}
                    checked={ativo}
                    onChange={() => setDiaVencimento(dia)}
                    className="sr-only"
                  />
                  <span className="text-xs text-slate-400 font-normal mb-0.5">
                    Todo dia
                  </span>
                  <span className="text-lg tracking-tight">{dia}</span>
                </label>
              );
            })}
          </div>
          <p className="text-xs text-slate-400">
            A sua cobrança recorrente será gerada automaticamente próximo a essa
            data.
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex gap-3 pt-2">
        <Button
          variant="outline"
          onClick={() => setEtapa("identificacao")}
          className="h-11 border-slate-200 text-slate-600 font-medium"
        >
          Voltar
        </Button>

        <LoadingButton
          onClick={handleGerarAssinatura}
          disabled={!cpfValido}
          isLoading={isGerandoPix}
          className="flex-1 h-11 bg-emerald-600 hover:bg-emerald-700 font-semibold text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Gerar Meu Pix
        </LoadingButton>
      </CardFooter>
    </>
  );
}
