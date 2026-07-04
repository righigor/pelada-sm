import { db } from "@/firebase/config";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import type { PremiacaoEdicao } from "./use-get-premiacao-em-andamento";

export function useGetPremiacaoById(id: string | undefined) {
  return useQuery<PremiacaoEdicao | null>({
    queryKey: ["premiacao_detalhe", id],
    queryFn: async () => {
      if (!id) return null;
      const docRef = doc(db, "premiacoes", id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) return null;
      return { id: docSnap.id, ...docSnap.data() } as PremiacaoEdicao;
    },
    enabled: !!id,
  });
}