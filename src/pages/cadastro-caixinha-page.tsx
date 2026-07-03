import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useGetAllJogadores } from "@/hooks/jogadores/use-get-all-jogadores";
import type { JogadorNewResponseType } from "@/types/jogadores/Jogador";
import LoadingEtapaCaixinha from "@/components/loading-etapa-caixinha";
import SelecaoPlanoCaixinha from "@/components/selecao-plano-caixinha";
import FormularioAdesaoCaixinha from "@/components/formulario-adesao-caixinha";
import { ComponenteStatusAtivo } from "@/components/jogador-ativo-caixinha";
import PagamentoPix from "@/components/pagamento-pix";
import PagamentoCartaoRedirect from "@/components/pagamento-cartao-redirect";
import type { MetodoPagamento, PixFluxoDados, TipoPlano } from "@/types/caixinha/planos";
import { useCreateAssinatura } from "@/hooks/caixinha/use-create-assinatura";
import IdentificaoCaixinha from "@/components/identificacao-caixinha";
import SelecaoMetodoPagamento from "@/components/seleciona-metodo-pagamento";

export type EtapaCadastro =
  | "identificacao"
  | "carregando"
  | "selecao_plano"
  | "selecao_pagamento"
  | "formulario_adesao"
  | "exibir_pix"
  | "redirecionar_cartao"
  | "ativo";


export default function CadastroCaixinhaPage() {
  const [etapa, setEtapa] = useState<EtapaCadastro>("identificacao");
  const [jogadorSelecionado, setJogadorSelecionado] = useState<JogadorNewResponseType | null>(null);
  const [pixDados, setPixDados] = useState<PixFluxoDados | null>(null);
  const [planoSelecionado, setPlanoSelecionado] = useState<TipoPlano>("mensal");
  const [metodoPagamento, setMetodoPagamento] = useState<MetodoPagamento>("pix");
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  const { data: jogadores } = useGetAllJogadores();
  const { mutate: criarAssinatura, isPending: isGerandoPagamento } =
    useCreateAssinatura();

  if (!jogadores) return null;

  const handleSetEtapa = (novaEtapa: EtapaCadastro) => {
    if (novaEtapa === "exibir_pix" && jogadorSelecionado?.assinatura) {
      setPixDados({
        pixCopiaECola: jogadorSelecionado.assinatura.pixCopiaECola || "",
        pixQrCodeBase64: jogadorSelecionado.assinatura.pixQrCodeBase64 || "",
      });
    }
    setEtapa(novaEtapa);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 mt-8 font-sans antialiased">
      <Card className="border-slate-200/80 shadow-md">
        {etapa === "identificacao" && (
          <IdentificaoCaixinha
            jogadores={jogadores}
            setJogadorSelecionado={setJogadorSelecionado}
            jogadorSelecionado={jogadorSelecionado}
            setEtapa={handleSetEtapa}
            setCheckoutUrl={setCheckoutUrl}
          />
        )}

        {etapa === "carregando" && (
          <LoadingEtapaCaixinha isGerandoPix={isGerandoPagamento} />
        )}

        {etapa === "selecao_plano" && (
          <SelecaoPlanoCaixinha
            planoSelecionado={planoSelecionado}
            setPlanoSelecionado={setPlanoSelecionado}
            setEtapa={handleSetEtapa}
          />
        )}

        {etapa === "selecao_pagamento" && (
          <SelecaoMetodoPagamento
            metodoPagamento={metodoPagamento}
            setMetodoPagamento={setMetodoPagamento}
            setEtapa={handleSetEtapa}
          />
        )}

        {etapa === "formulario_adesao" && (
          <FormularioAdesaoCaixinha
            planoSelecionado={planoSelecionado}
            metodoPagamento={metodoPagamento}
            jogadorSelecionado={jogadorSelecionado!}
            setEtapa={handleSetEtapa}
            criarAssinatura={criarAssinatura}
            isGerandoPagamento={isGerandoPagamento}
            setPixDados={setPixDados}
            setCheckoutUrl={setCheckoutUrl}
          />
        )}

        {etapa === "exibir_pix" && (
          <PagamentoPix pixDados={pixDados} />
        )}

        {etapa === "redirecionar_cartao" && checkoutUrl && (
          <PagamentoCartaoRedirect checkoutUrl={checkoutUrl} />
        )}

        {etapa === "ativo" && (
          <ComponenteStatusAtivo
            jogadorSelecionado={jogadorSelecionado}
            setEtapa={setEtapa}
            setJogadorSelecionado={setJogadorSelecionado}
          />
        )}
      </Card>
    </div>
  );
}