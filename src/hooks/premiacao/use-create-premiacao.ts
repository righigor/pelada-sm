import { useMutation, useQueryClient } from '@tanstack/react-query';
import { collection, addDoc } from 'firebase/firestore';
import type { Categoria } from './categoria/use-get-all-categorias';
import { db } from '@/firebase/config';
import { toast } from 'sonner';


interface CreatePremiacaoInput {
  nome: string;
  categoriasSelecionadas: Categoria[];
}

export function useCreatePremiacao() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreatePremiacaoInput) => {
      const payload = {
        nome: data.nome,
        status: 'EM_ANDAMENTO',
        dataCriacao: new Date().toISOString(),
        categorias: data.categoriasSelecionadas.map(cat => ({
          idCategoria: cat.id,
          nome: cat.nome,
          tipoCalculo: cat.tipoCalculo,
          funcaoReferencia: cat.funcaoReferencia,
          vencedorId: null,
          vencedorNome: null,
          detalhes: ""
        }))
      };

      const docRef = await addDoc(collection(db, 'premiacoes'), payload);
      return docRef.id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['premiacoes_em_aberto'] });
      toast.success("Premiação criada com sucesso!")
    },
    onError: (error) => {
      console.error("Erro ao criar premiação:", error);
    }
  });
}