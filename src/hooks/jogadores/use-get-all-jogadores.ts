import { getAllJogadores } from "@/queries/jogadores/get-all-jogadores";
import { useQuery } from "@tanstack/react-query";

export function useGetAllJogadores() {
  return useQuery({
    queryKey: ["jogadores"],
    queryFn: getAllJogadores,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}