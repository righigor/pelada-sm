import { useState } from "react";
import { Card } from "@/components/ui/card";
import IdentificaoCaixinha from "@/components/identificacao-caixinha";
import { useGetAllJogadores } from "@/hooks/jogadores/use-get-all-jogadores";
import type {
  JogadorNewResponseType,
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

  export interface PixFluxoDados {
  pixCopiaECola: string;
  pixQrCodeBase64: string;
}

export default function CadastroCaixinhaPage() {
  const [etapa, setEtapa] = useState<EtapaCadastro>("identificacao");
  const [jogadorSelecionado, setJogadorSelecionado] =
    useState<JogadorNewResponseType | null>(null);
  const [pixDados, setPixDados] = useState<PixFluxoDados | null>(null);

  const { data: jogadores } = useGetAllJogadores();
  const { mutate: criarAssinatura, isPending: isGerandoPix } =
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
          />
        )}

        {etapa === "carregando" && (
          <LoadingEtapaCaixinha isGerandoPix={isGerandoPix} />
        )}

        {etapa === "formulario_adesao" && (
          <FormularioAdesaoCaixinha
            setPixDados={(dados: { pixCopiaECola: string; pixQrCodeBase64: string }) => setPixDados({
              pixCopiaECola: dados.pixCopiaECola,
              pixQrCodeBase64: dados.pixQrCodeBase64
            })}
            jogadorSelecionado={jogadorSelecionado!}
            setEtapa={setEtapa}
            criarAssinatura={criarAssinatura}
            isGerandoPix={isGerandoPix}
          />
        )}

        {etapa === "exibir_pix" && (
          <PagamentoPix pixDados={pixDados} />
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
