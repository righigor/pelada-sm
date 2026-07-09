import { db } from "@/firebase/config";
import { doc, runTransaction } from "firebase/firestore";

export async function deleteMovimentacao(movimentacaoId: string): Promise<void> {
  const caixinhaRef = doc(db, "caixinha", "principal");
  const movimentacaoRef = doc(db, "caixinha", "principal", "movimentacoes", movimentacaoId);

  await runTransaction(db, async (transaction) => {
    const [caixinhaSnap, movimentacaoSnap] = await Promise.all([
      transaction.get(caixinhaRef),
      transaction.get(movimentacaoRef),
    ]);

    if (!caixinhaSnap.exists()) {
      throw new Error("Documento da caixinha não encontrado.");
    }

    if (!movimentacaoSnap.exists()) {
      throw new Error("Movimentação não encontrada.");
    }

    const movData = movimentacaoSnap.data();
    const saldoAtual = caixinhaSnap.data().saldo as number;

    const novoSaldo =
      movData.tipo === "entrada_extra"
        ? saldoAtual - movData.valor
        : saldoAtual + movData.valor;

    transaction.delete(movimentacaoRef);
    transaction.update(caixinhaRef, {
      saldo: novoSaldo,
      updatedAt: movData.createdAt ?? null,
    });
  });
}