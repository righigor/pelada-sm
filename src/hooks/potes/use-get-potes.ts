import { useQuery } from "@tanstack/react-query";
import { getPotes } from "@/queries/potes/get-potes";

export const useGetPotes = () => {
  return useQuery({
    queryKey: ["potes"],
    queryFn: getPotes,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
