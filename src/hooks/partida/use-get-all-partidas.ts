import { getAllPartidas } from "@/queries/partida/get-all-partidas";
import { useQuery } from "@tanstack/react-query";

export function useGetAllPartidas() {
  return useQuery({
    queryKey: ["partidas"],
    queryFn: getAllPartidas,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}