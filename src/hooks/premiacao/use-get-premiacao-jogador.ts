import { db } from "@/firebase/config";
import type { PremiacaoEdicao } from "@/types/premiacao/Resultado";
import type { TrofeuJogador } from "@/types/premiacao/Trofeu";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";


export function useGetPremiosJogador(jogadorId: string | undefined) {
  return useQuery<TrofeuJogador[]>({
    queryKey: ["premios_jogador", jogadorId],
    queryFn: async () => {
      if (!jogadorId) return [];

      const q = query(
        collection(db, "premiacoes"),
        where("status", "==", "FINALIZADA")
      );

      const querySnapshot = await getDocs(q);
      const trofeus: TrofeuJogador[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data() as PremiacaoEdicao;
        const categoriasVencidas = data.categorias.filter(
          (cat) => cat.vencedorId === jogadorId
        );

        categoriasVencidas.forEach((cat) => {
          trofeus.push({
            idPremiacao: doc.id,
            nomeEdicao: data.nome,
            nomeCategoria: cat.nome,
            detalhes: cat.detalhes,
            dataFinalizacao: data.dataFinalizacao || "",
          });
        });
      });

      return trofeus.sort((a, b) => 
        b.dataFinalizacao.localeCompare(a.dataFinalizacao)
      );
    },
    enabled: !!jogadorId,
  });
}