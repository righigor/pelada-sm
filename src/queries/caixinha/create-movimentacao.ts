import { db } from "@/firebase/config";
import type { MovimentacaoCaixinha } from "@/types/caixinha/caixinha";
import {
  collection,
  doc,
  serverTimestamp,
  runTransaction,
} from "firebase/firestore";

type TipoMovimentacao = MovimentacaoCaixinha["tipo"];

interface CreateMovimentacaoInput {
  tipo: TipoMovimentacao;
  descricao: string;
  valor: number;
  data: string;
}

export async function createMovimentacao(
  input: CreateMovimentacaoInput,
): Promise<void> {
  const caixinhaRef = doc(db, "caixinha", "principal");
  const movimentacaoRef = doc(
    collection(db, "caixinha", "principal", "movimentacoes"),
  );

  await runTransaction(db, async (transaction) => {
    const caixinhaSnap = await transaction.get(caixinhaRef);

    if (!caixinhaSnap.exists()) {
      throw new Error("Documento da caixinha não encontrado.");
    }

    const saldoAtual = caixinhaSnap.data().saldo as number;
    const novoSaldo =
      input.tipo === "entrada_extra"
        ? saldoAtual + input.valor
        : saldoAtual - input.valor;

    transaction.set(movimentacaoRef, {
      tipo: input.tipo,
      descricao: input.descricao,
      valor: input.valor,
      data: input.data,
      createdAt: serverTimestamp(),
    });

    transaction.update(caixinhaRef, {
      saldo: novoSaldo,
      updatedAt: serverTimestamp(),
    });
  });
}
