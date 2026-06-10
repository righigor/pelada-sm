import { Copy } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";
import { CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "sonner";

interface PagamentoPixProps {
  pixDados: string | null;
  setPixDados(pix: string): void;
}

export default function PagamentoPix({ pixDados }: PagamentoPixProps) {
  const handleCopiar = () => {
    if (!pixDados) return;
    navigator.clipboard.writeText(pixDados);

    toast.success("Código copiado! 📋", {
      duration: 3000,
    });
  };
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
        <div className="w-44 h-44 rounded-xl border border-slate-200 flex items-center justify-center p-2 shadow-inner">
          <QRCodeSVG value={pixDados!} size={160} />
        </div>

        <div className="w-full space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Pix Copia e Cola
          </label>
          <div className="flex gap-2">
            <Input
              readOnly
              value={pixDados || ""}
              className="h-11 border-slate-200 text-slate-400 font-mono text-xs shadow-inner"
            />
            <Button
              className="h-11 border-slate-200 px-3 flex items-center gap-1.5 text-slate-700 cursor-pointer"
              onClick={handleCopiar}
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
            Também enviamos o link deste QR Code para o seu WhatsApp. O sistema
            identificará o pagamento automaticamente em até 1 minuto.
          </AlertDescription>
        </Alert>
      </CardContent>
    </>
  );
}
