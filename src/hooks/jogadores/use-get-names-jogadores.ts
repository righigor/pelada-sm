import { getAllNameJogadores } from "@/queries/jogadores/get-all-name-jogadores";
import { useQuery } from "@tanstack/react-query";

export default function useGetAllNamesJogadores() {
  return useQuery({
    queryKey: ["jogadores-names"],
    queryFn: getAllNameJogadores,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}