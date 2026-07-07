import { useEffect, useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PagamentoAprovado() {
  const webhookDisparado = useRef(false);

  useEffect(() => {
    if (webhookDisparado.current) return;
    webhookDisparado.current = true;

    fetch("https://pelada-n8n.duckdns.org/webhook/pagamento-aprovado", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }).catch((err) => console.error("Erro ao chamar o webhook:", err));
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center shadow-lg border-emerald-500/20 bg-emerald-500/5">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <CheckCircle2 className="h-16 w-16 text-emerald-500 animate-bounce" />
          </div>
          
          <CardTitle className="text-2xl font-bold tracking-tight text-emerald-600">
            Pagamento Recebido!
          </CardTitle>
          
          <CardDescription className="text-base text-muted-foreground">
            Sua assinatura foi confirmada. O saldo foi adicionado à caixinha!
          </CardDescription>

          <div className="pt-4">
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => window.location.href = "/"}>
              Voltar para o App
            </Button>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}