import { db } from "@/firebase/config";
import type { PagamentoRegistro } from "@/types/caixinha/caixinha";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export function useGetAllPagamentos() {
  return useQuery<PagamentoRegistro[]>({
    queryKey: ["todos_pagamentos"],
    queryFn: async () => {
      const pagamentosRef = collection(db, "pagamentos");
      const q = query(pagamentosRef, orderBy("dataPagamento", "desc"));
      
      const querySnapshot = await getDocs(q);
      const pagamentos: PagamentoRegistro[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        
        pagamentos.push({
          id: doc.id,
          ...data,
          dataPagamento: data.dataPagamento?.toDate 
            ? data.dataPagamento.toDate().toISOString() 
            : data.dataPagamento,
        } as PagamentoRegistro);
      });

      return pagamentos;
    },
  });
}