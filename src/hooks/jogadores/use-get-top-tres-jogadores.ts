import type { KeyType } from "@/queries/jogadores/get-top-tres-jogadores";
import getTopTresJogadores from "@/queries/jogadores/get-top-tres-jogadores";
import { useQuery } from "@tanstack/react-query";

export const useGetTopTresJogadores = (key: KeyType, count = 3) => {
  return useQuery({
    queryKey: ["top-tres-jogadores", key, count],
    queryFn: () => getTopTresJogadores(key, count),
    staleTime: 1000 * 60 * 10,
  });
};
