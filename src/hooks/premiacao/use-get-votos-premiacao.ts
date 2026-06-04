import { getVotosPremiacao } from "@/queries/premiacao/get-votos-premiacao";
import { useQuery } from "@tanstack/react-query";

export function useGetVotosPremiacao(temporada: string) {
  return useQuery({
    queryKey: ["premiacao-votos", temporada],
    queryFn: () => getVotosPremiacao(temporada),
    staleTime: 0,
  });
}
