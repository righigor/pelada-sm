import { Copy } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";
import { CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { toast } from "sonner";
import type { PixFluxoDados } from "@/types/caixinha/planos";

interface PagamentoPixProps {
  pixDados: PixFluxoDados | null;
}

export default function PagamentoPix({ pixDados }: PagamentoPixProps) {
  const handleCopiar = () => {
    if (!pixDados?.pixCopiaECola) return;
    navigator.clipboard.writeText(pixDados.pixCopiaECola);

    toast.success("Código copiado! 📋", {
      duration: 3000,
    });
  };

  console.log(pixDados)

  return (
    <>
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-xl font-bold">
          Assinatura Criada! 🚀
        </CardTitle>
        <CardDescription className="text-slate-500">
          Pague o primeiro Pix abaixo para ativar sua mensalidade.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-6">
        
        {/* Renderiza a imagem real em Base64 vinda do Mercado Pago */}
        <div className="w-44 h-44 rounded-xl border border-slate-200 flex items-center justify-center p-2 shadow-inner bg-white">
          {pixDados?.pixQrCodeBase64 ? (
            <img 
              src={pixDados.pixQrCodeBase64} 
              alt="Mercado Pago Pix QR Code" 
              className="w-40 h-40 object-contain"
            />
          ) : (
            <div className="text-xs text-slate-400">Carregando QR Code...</div>
          )}
        </div>

        <div className="w-full space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Pix Copia e Cola
          </label>
          <div className="flex gap-2">
            <Input
              readOnly
              value={pixDados?.pixCopiaECola || ""}
              className="h-11 border-slate-200 text-slate-400 font-mono text-xs shadow-inner truncate"
            />
            <Button
              className="h-11 border-slate-200 px-3 flex items-center gap-1.5 text-slate-700 cursor-pointer bg-slate-50 hover:bg-slate-100 border transition-colors"
              onClick={handleCopiar}
            >
              <Copy className="w-4 h-4" /> Copiar
            </Button>
          </div>
        </div>

        <Alert className="border-amber-200 text-amber-800 bg-amber-50/50">
          <AlertTitle className="font-semibold flex items-center gap-1.5 text-amber-900 text-sm">
            Aviso Importante
          </AlertTitle>
          <AlertDescription className="text-xs text-amber-800 leading-relaxed">
            Também enviamos o link deste QR Code para o seu WhatsApp. O sistema
            identificará o pagamento automaticamente em até 1 minuto.
          </AlertDescription>
        </Alert>
      </CardContent>
    </>
  );
}