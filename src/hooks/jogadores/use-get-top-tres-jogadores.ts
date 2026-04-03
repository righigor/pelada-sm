import getTopTresJogadores from "@/queries/jogadores/get-top-tres-jogadores";
import type { StatField } from "@/types/partida/Estatisticas";
import { useQuery } from "@tanstack/react-query";


export const useGetTopTresJogadores = (
  key: StatField, 
  count = 3, 
  temporada?: string
) => {
  return useQuery({
    queryKey: ["top-tres-jogadores", key, count, temporada], 
    
    queryFn: () => getTopTresJogadores(key, count, temporada),
    
    staleTime: 1000 * 60 * 10,
  });
};