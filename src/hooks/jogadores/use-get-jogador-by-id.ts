import { getJogadorById, type JogadorDetails } from "@/queries/jogadores/get-jogador-by-id";
import { useQuery } from "@tanstack/react-query";

export const useGetJogadorDetails = (jogadorId: string) => {
    return useQuery<JogadorDetails, Error>({
        queryKey: ['jogadorDetails', jogadorId],
        queryFn: () => getJogadorById(jogadorId),
        enabled: !!jogadorId,
    });
};