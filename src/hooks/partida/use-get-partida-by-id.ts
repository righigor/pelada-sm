import getPartidaByID from "@/queries/partida/get-partida-by-id";
import { useQuery } from "@tanstack/react-query";

export default function useGetPartidaByID(partidaId: string) {
  return useQuery({
    queryKey: ["partidaByID", partidaId],
    queryFn: () => getPartidaByID(partidaId),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  })
}