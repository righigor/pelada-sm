import { useState } from "react";
import { Card } from "@/components/ui/card";
import IdentificaoCaixinha from "@/components/identificacao-caixinha";
import { useGetAllJogadores } from "@/hooks/jogadores/use-get-all-jogadores";
import type {
  JogadorNewResponseType,
  StatsJogadorType,
} from "@/types/jogadores/Jogador";
import LoadingEtapaCaixinha from "@/components/loading-etapa-caixinha";
import FormularioAdesaoCaixinha from "@/components/formulario-adesao-caixinha";
import { useCreateAssinatura } from "@/hooks/caixinha/use-create-assinatura";
import { ComponenteStatusAtivo } from "@/components/jogador-ativo-caixinha";
import PagamentoPix from "@/components/pagamento-pix";

export type EtapaCadastro =
  | "identificacao"
  | "carregando"
  | "formulario_adesao"
  | "exibir_pix"
  | "ativo";

export default function CadastroCaixinhaPage() {
  const [etapa, setEtapa] = useState<EtapaCadastro>("exibir_pix");
  const [jogadorSelecionado, setJogadorSelecionado] =
    useState<JogadorNewResponseType | null>({
      id: "jog_123456",
      nome: "Lucas Silva de Oliveira",
      telefone: "31999999999",
      cpf: "123.456.789-00",
      stats: {} as StatsJogadorType,
      fotoUrl: "https://randomuser.me/api/portraits/men/75.jpg",
      createdAt: {
        seconds: 1717852200,
        nanoseconds: 0,
        type: "firestore/timestamp/1.0",
      },
      updatedAt: {
        seconds: 1717852200,
        nanoseconds: 0,
        type: "firestore/timestamp/1.0",
      },
      financeiro: {
        status: "active", // Força o status ativo
        idPlano: "plano_dia_10", // Força o plano do dia 10
        mercadoPagoSubscriptionId: "sub_mp_987654",
        pixPendente: null,
        ultimoPagamentoEm: new Date().toISOString(),
      },
    });
  const [pixDados, setPixDados] = useState<string | null>("00020101021226730014br.gov.bcb.pix2551pix-qr.mercadopago.com/emv/v2/c3b1a2e3-4f5g-6h7i-8j9k-0l1m2n3o4p5q520400005303986540510.505802BR5924Caixinha Pelada Adesaoc6009BeloHoriz62070503***6304A1B2");

  const { data: jogadores } = useGetAllJogadores();
  const { mutate: criarAssinatura, isPending: isGerandoPix } =
    useCreateAssinatura();
  if (!jogadores) return null;

  return (
    <div className="w-full max-w-md mx-auto p-4 mt-8 font-sans antialiased">
      <Card className="border-slate-200/80 shadow-md">
        {etapa === "identificacao" && (
          <IdentificaoCaixinha
            jogadores={jogadores}
            setJogadorSelecionado={setJogadorSelecionado}
            jogadorSelecionado={jogadorSelecionado}
            setEtapa={setEtapa}
          />
        )}

        {etapa === "carregando" && (
          <LoadingEtapaCaixinha isGerandoPix={isGerandoPix} />
        )}

        {etapa === "formulario_adesao" && (
          <FormularioAdesaoCaixinha
            setPixDados={setPixDados}
            jogadorSelecionado={jogadorSelecionado!}
            setEtapa={setEtapa}
            criarAssinatura={criarAssinatura}
            isGerandoPix={isGerandoPix}
          />
        )}

        {etapa === "exibir_pix" && (
          <PagamentoPix pixDados={pixDados} setPixDados={setPixDados} />
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
