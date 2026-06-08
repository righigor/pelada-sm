import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { QrCode, Copy } from "lucide-react";
import IdentificaoCaixinha from "@/components/identificacao-caixinha";
import { useGetAllJogadores } from "@/hooks/jogadores/use-get-all-jogadores";
import type { JogadorNewResponseType, StatsJogadorType } from "@/types/jogadores/Jogador";
import LoadingEtapaCaixinha from "@/components/loading-etapa-caixinha";
import FormularioAdesaoCaixinha from "@/components/formulario-adesao-caixinha";
import { useCreateAssinatura } from "@/hooks/caixinha/use-create-assinatura";
import { ComponenteStatusAtivo } from "@/components/jogador-ativo-caixinha";

export type EtapaCadastro =
  | "identificacao"
  | "carregando"
  | "formulario_adesao"
  | "exibir_pix"
  | "ativo";

export default function CadastroCaixinhaPage() {
  const [etapa, setEtapa] = useState<EtapaCadastro>("ativo");
  const [jogadorSelecionado, setJogadorSelecionado] =
    useState<JogadorNewResponseType | null>({
  id: "jog_123456",
  nome: "Lucas Silva de Oliveira",
  telefone: "31999999999",
  cpf: "123.456.789-00",
  stats: {} as StatsJogadorType,
  fotoUrl: "https://randomuser.me/api/portraits/men/75.jpg",
  createdAt: {
    seconds: 1717852200, nanoseconds: 0,
    type: "firestore/timestamp/1.0"
  },
  updatedAt: {
    seconds: 1717852200, nanoseconds: 0,
    type: "firestore/timestamp/1.0"
  },
  financeiro: {
    status: 'active',           // Força o status ativo
    idPlano: 'plano_dia_10',    // Força o plano do dia 10
    mercadoPagoSubscriptionId: 'sub_mp_987654',
    pixPendente: null,
    ultimoPagamentoEm: new Date().toISOString()
  }
});
  const [pixDados, setPixDados] = useState<string | null>(null);

  const { data: jogadores } = useGetAllJogadores();
  const { mutate: criarAssinatura, isPending: isGerandoPix } = useCreateAssinatura();
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

        {etapa === "carregando" && <LoadingEtapaCaixinha isGerandoPix={isGerandoPix} />}

        {etapa === "formulario_adesao" && (
          <FormularioAdesaoCaixinha
            setPixDados={setPixDados}
            jogadorSelecionado={jogadorSelecionado!}
            setEtapa={setEtapa}
            criarAssinatura={criarAssinatura}
            isGerandoPix={isGerandoPix}
          />
        )}

        {/* ETAPA D: EXIBIR PIX (QR CODE E COPIA E COLA) */}
        {etapa === "exibir_pix" && (
          <>
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-xl font-bold text-slate-900">
                Assinatura Criada! 🚀
              </CardTitle>
              <CardDescription className="text-slate-500">
                Pague o primeiro Pix abaixo para ativar sua mensalidade.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-6">
              {/* Box para o QR Code (Bordas apenas, sem BG) */}
              <div className="w-44 h-44 rounded-xl border border-slate-200 flex items-center justify-center p-2 shadow-inner">
                <QrCode className="w-full h-full text-slate-700 stroke-[1.5]" />
              </div>

              <div className="w-full space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Pix Copia e Cola
                </label>
                <div className="flex gap-2">
                  <Input
                    readOnly
                    value={pixDados || ""}
                    className="h-11 border-slate-200 text-slate-600 font-mono text-xs shadow-inner"
                  />
                  <Button
                    variant="outline"
                    className="h-11 border-slate-200 px-3 flex items-center gap-1.5 text-slate-700"
                  >
                    <Copy className="w-4 h-4" /> Copiar
                  </Button>
                </div>
              </div>

              <Alert className="border-amber-200 text-amber-800">
                <AlertTitle className="font-semibold flex items-center gap-1.5 text-amber-900 text-sm">
                  Aviso Importante
                </AlertTitle>
                <AlertDescription className="text-xs text-amber-800 leading-relaxed">
                  Também enviamos o link deste QR Code para o seu WhatsApp. O
                  sistema identificará o pagamento automaticamente em até 1
                  minuto.
                </AlertDescription>
              </Alert>
            </CardContent>
          </>
        )}

        {etapa === 'ativo' && (
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
