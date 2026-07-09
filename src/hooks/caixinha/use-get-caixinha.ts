import { db } from "@/firebase/config";
import type { CaixinhaData } from "@/types/caixinha/caixinha";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";

export function useGetCaixinha() {
  return useQuery<CaixinhaData | null>({
    queryKey: ["caixinha_saldo"],
    queryFn: async () => {
      const docRef = doc(db, "caixinha", "principal");
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return null;
      }

      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as CaixinhaData;
    },
  });
}