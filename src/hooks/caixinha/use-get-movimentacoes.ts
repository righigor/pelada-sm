import { getMovimentacoes } from "@/queries/caixinha/get-movimentacoes";
import { useQuery } from "@tanstack/react-query";

export function useGetMovimentacoes() {
  return useQuery({
    queryKey: ["movimentacoes_caixinha"],
    queryFn: getMovimentacoes,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}