import { getLastPartida } from "@/queries/partida/get-last-partida"
import { useQuery } from "@tanstack/react-query"

export const useGetLastPartida = () => {
  return useQuery({
    queryKey: ['last-partida'],
    queryFn: getLastPartida,
    
  })
}