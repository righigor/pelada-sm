import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CriarAssinaturaPayload {
  jogadorId: string;
  nome: string;
  telefone: string;
  cpf: string;
  diaVencimento: string;
}

interface CriarAssinaturaResponse {
  sucesso: boolean;
  pixCopiaECola: string;
}

export function useCreateAssinatura() {
  const queryClient = useQueryClient();

  return useMutation<CriarAssinaturaResponse, Error, CriarAssinaturaPayload>({
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

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jogadores"] });
    },
  });
}
