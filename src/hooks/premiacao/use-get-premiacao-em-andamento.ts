import { db } from "@/firebase/config";
import { useQuery } from "@tanstack/react-query";
import { collection, query, where, getDocs } from "firebase/firestore";

export interface PremiacaoEdicao {
  id: string;
  nome: string;
  status: "EM_ANDAMENTO" | "FINALIZADA";
  dataCriacao: string;
  dataFinalizacao: string | null;
  categorias: Array<{
    idCategoria: string;
    nome: string;
    tipoCalculo: "AUTOMATICO" | "MANUAL";
    funcaoReferencia: string | null;
    vencedorId: string | null;
    vencedorNome: string | null;
    vencedorFotoUrl: string | null;
    detalhes: string;
  }>;
}

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
