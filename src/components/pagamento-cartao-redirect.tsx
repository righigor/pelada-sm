import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { CreditCard, ExternalLink } from "lucide-react";

interface PagamentoCartaoRedirectProps {
  checkoutUrl: string;
}

export default function PagamentoCartaoRedirect({ checkoutUrl }: PagamentoCartaoRedirectProps) {
  return (
    <>
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-xl font-bold">Quase lá! 💳</CardTitle>
        <CardDescription className="text-slate-400">
          Clique no botão abaixo para preencher seus dados de cartão com segurança no Mercado Pago.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-center space-y-6 pt-4">
        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center">
          <CreditCard className="w-10 h-10 text-slate-400" />
        </div>

        <Alert className="border-blue-200 text-blue-800 bg-blue-50/50 w-full">
          <AlertTitle className="font-semibold text-blue-900 text-sm">
            Cobrança Automática
          </AlertTitle>
          <AlertDescription className="text-xs text-blue-700 leading-relaxed">
            Ao pagar no Mercado Pago, sua assinatura ficará ativa e as próximas cobranças serão feitas automaticamente no mesmo cartão.
          </AlertDescription>
        </Alert>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 w-full">
        <Button
          onClick={() => window.open(checkoutUrl, "_blank")}
          className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 font-bold text-white transition-colors flex items-center justify-center gap-2 text-base"
        >
          Pagar no Mercado Pago <ExternalLink className="w-4 h-4" />
        </Button>
        
        <p className="text-[11px] text-slate-400 text-center leading-relaxed">
          Após confirmar o pagamento, o sistema atualizará seu status automaticamente em instantes. Você pode fechar esta aba se preferir.
        </p>
      </CardFooter>
    </>
  );
}