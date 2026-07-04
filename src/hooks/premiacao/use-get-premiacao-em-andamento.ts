import { db } from "@/firebase/config";
import type { PremiacaoEdicao } from "@/types/premiacao/Resultado";
import { useQuery } from "@tanstack/react-query";
import { collection, query, where, getDocs } from "firebase/firestore";

export function useGetPremiacoesEmAndamento() {
  return useQuery<PremiacaoEdicao[]>({
    queryKey: ["premiacoes_em_aberto"],
    queryFn: async () => {
      const q = query(
        collection(db, "premiacoes"),
        where("status", "==", "EM_ANDAMENTO"),
      );

      const querySnapshot = await getDocs(q);
      const premiacoes: PremiacaoEdicao[] = [];

      querySnapshot.forEach((doc) => {
        premiacoes.push({
          id: doc.id,
          ...doc.data(),
        } as PremiacaoEdicao);
      });

      return premiacoes.sort((a, b) =>
        b.dataCriacao.localeCompare(a.dataCriacao),
      );
    },
  });
}
