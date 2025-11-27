import { createJogador } from "@/queries/jogadores/create-jogador"
import type { CreateJogadorRequest } from "@/types/jogadores/CreateJogador"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export const useCreateJogador = () => {
  return useMutation({
    mutationFn: (data: CreateJogadorRequest) => createJogador(data),
    onError: (error) => {
      console.error("Error creating jogador:", error)
      toast.error("Erro ao criar jogador. Tente novamente.")
    },
    onSuccess: () => {
      toast.success("Jogador criado com sucesso!")
    },
  })
}