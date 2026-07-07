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
import { Calendar, CreditCard, QrCode } from "lucide-react";
import LoadingButton from "./loading-button";
import { toast } from "sonner";
import {
  PLANOS,
  type MetodoPagamento,
  type PixFluxoDados,
  type TipoPlano,
  type CreateAssinaturaPayload,
  type CreateAssinaturaResponse,
} from "@/types/caixinha/planos";

interface FormularioAdesaoCaixinhaProps {
  planoSelecionado: TipoPlano;
  metodoPagamento: MetodoPagamento;
  jogadorSelecionado: JogadorNewResponseType;
  setEtapa(etapa: EtapaCadastro): void;
  criarAssinatura: (
    variables: CreateAssinaturaPayload,
    options?: {
      onSuccess?: (data: CreateAssinaturaResponse) => void;
      onError?: (error: Error) => void;
    },
  ) => void;
  isGerandoPagamento: boolean;
  setPixDados: (dados: PixFluxoDados) => void;
  setCheckoutUrl: (url: string) => void;
}

export default function FormularioAdesaoCaixinha({
  planoSelecionado,
  metodoPagamento,
  jogadorSelecionado,
  setEtapa,
  criarAssinatura,
  isGerandoPagamento,
  setPixDados,
  setCheckoutUrl,
}: FormularioAdesaoCaixinhaProps) {
  const [cpf, setCpf] = useState("");
  const [diaVencimento, setDiaVencimento] = useState("10");
  const planoConfig = PLANOS.find((p) => p.id === planoSelecionado)!;

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
  const mostrarDiasVencimento =
    metodoPagamento === "pix" && planoSelecionado === "mensal";

  const handleGerarAssinatura = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!cpfValido) return;

    const payload: CreateAssinaturaPayload = {
      jogadorId: jogadorSelecionado.id,
      nome: jogadorSelecionado.nome,
      telefone: jogadorSelecionado.telefone,
      cpf: cpf.replace(/\D/g, ""),
      diaVencimento: mostrarDiasVencimento ? diaVencimento : null,
      plano: planoSelecionado,
      metodoPagamento: metodoPagamento,
    };

    criarAssinatura(payload, {
      onSuccess: (data) => {
        const { assinatura } = data;

        if (
          metodoPagamento === "pix" &&
          assinatura.pixCopiaECola &&
          assinatura.pixQrCodeBase64
        ) {
          setPixDados({
            pixCopiaECola: assinatura.pixCopiaECola,
            pixQrCodeBase64: assinatura.pixQrCodeBase64.startsWith("data:image")
              ? assinatura.pixQrCodeBase64
              : `data:image/png;base64,${assinatura.pixQrCodeBase64}`,
          });
          setEtapa("exibir_pix");
        } else if (metodoPagamento === "cartao" && assinatura.checkoutUrl) {
          setCheckoutUrl(assinatura.checkoutUrl);
          setEtapa("redirecionar_cartao");
        } else {
          toast.error("Os dados de retorno do pagamento estão inválidos.");
        }
      },
      onError: () => {
        toast.error("Houve um erro ao processar. Tente novamente.");
      },
    });
  };

  const opcoesDias = ["5", "10", "15"];

  return (
    <>
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl font-bold">
          Fala, {jogadorSelecionado.nome}! 👋
        </CardTitle>
        <CardDescription className="text-slate-400">
          Plano{" "}
          <span className="text-white font-semibold">{planoConfig.nome}</span> (
          {planoConfig.meses}x de R${" "}
          {planoConfig.valorMensal.toFixed(2).replace(".", ",")}) —{" "}
          <span className="text-white font-semibold">
            Total: R$ {planoConfig.valorTotal.toFixed(2).replace(".", ",")}
            {metodoPagamento === "cartao" && (
              <span> + 5% de taxa no Cartão de Crédito, totalizando R$ {(planoConfig.valorTotal * 1.05).toFixed(2).replace(".", ",")}</span>
            )}
          </span>
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

        {mostrarDiasVencimento && (
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
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center cursor-pointer transition-all select-none
                      ${ativo ? "border-emerald-950 ring-1 ring-emerald-800 text-emerald-700 font-bold bg-emerald-50/10" : "border-slate-200 text-slate-600 hover:border-slate-300 font-medium"}`}
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
              A sua cobrança recorrente via Pix será gerada próximo a essa data.
            </p>
          </div>
        )}

        {!mostrarDiasVencimento && (
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-start gap-2">
            {metodoPagamento === "cartao" ? (
              <CreditCard className="w-4 h-4 text-emerald-600 mt-0.5" />
            ) : (
              <QrCode className="w-4 h-4 text-emerald-600 mt-0.5" />
            )}
            <p className="text-xs text-slate-500">
              {metodoPagamento === "cartao"
                ? "O cartão será cobrado uma vez no valor total. As renovações futuras serão automáticas."
                : "O Pix será gerado no valor total agora. As renovações serão lembradas via WhatsApp no dia do pagamento."}
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex gap-3 pt-2">
        <Button
          variant="outline"
          onClick={() => setEtapa("selecao_pagamento")}
          className="h-11 border-slate-200 text-slate-600 font-medium"
        >
          Voltar
        </Button>

        <LoadingButton
          onClick={handleGerarAssinatura}
          disabled={!cpfValido}
          isLoading={isGerandoPagamento}
          className="flex-1 h-11 bg-emerald-600 hover:bg-emerald-700 font-semibold text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {metodoPagamento === "pix" ? "Gerar Meu Pix" : "Ir para o Pagamento"}
        </LoadingButton>
      </CardFooter>
    </>
  );
}
