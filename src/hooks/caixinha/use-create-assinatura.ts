import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { 
  CreateAssinaturaPayload, 
  CreateAssinaturaResponse 
} from "@/types/caixinha/planos";

export function useCreateAssinatura() {
  const queryClient = useQueryClient();

  return useMutation<CreateAssinaturaResponse, Error, CreateAssinaturaPayload>({
    mutationFn: async (dados) => {
      const URL_N8N = "https://pelada-n8n.duckdns.org/webhook/criar-assinatura";

      const response = await fetch(URL_N8N, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });

      if (!response.ok) {
        throw new Error("Erro ao processar assinatura no n8n.");
      }

      const resultado = await response.json();
      console.log("resultado", resultado);
      return Array.isArray(resultado) ? resultado[0] : resultado;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jogadores"] });
    },
  });
}