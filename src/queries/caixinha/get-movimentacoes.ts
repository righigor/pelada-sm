import { db } from "@/firebase/config";
import type { MovimentacaoCaixinha } from "@/types/caixinha/caixinha";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export async function getMovimentacoes(): Promise<MovimentacaoCaixinha[]> {
  const movimentacoesRef = collection(db, "caixinha", "principal", "movimentacoes");
  const q = query(movimentacoesRef, orderBy("data", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      ...data,
      data: data.data?.toDate
        ? data.data.toDate().toISOString()
        : data.data,
      createdAt: data.createdAt?.toDate
        ? data.createdAt.toDate().toISOString()
        : data.createdAt,
    } as MovimentacaoCaixinha;
  });
}