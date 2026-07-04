import { db } from "@/firebase/config";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import type { PremiacaoEdicao } from "./use-get-premiacao-em-andamento";

export function useGetAllPremiacoes() {
  return useQuery<PremiacaoEdicao[]>({
    queryKey: ["todas_premiacoes"],
    queryFn: async () => {
      const querySnapshot = await getDocs(collection(db, "premiacoes"));
      const premiacoes: PremiacaoEdicao[] = [];

      querySnapshot.forEach((doc) => {
        premiacoes.push({
          id: doc.id,
          ...doc.data(),
        } as PremiacaoEdicao);
      });

      return premiacoes.sort((a, b) =>
        b.dataCriacao.localeCompare(a.dataCriacao)
      );
    },
  });
}