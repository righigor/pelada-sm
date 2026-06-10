import { db } from '@/firebase/config';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'sonner';

interface CreateCategoriaInput {
  nome: string;
  icone: string;
  tipoCalculo: 'AUTOMATICO' | 'MANUAL';
  funcaoReferencia: string | null | undefined;
}

export function useCreateCategoria() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateCategoriaInput) => {
      const payload = {
        nome: data.nome,
        icone: data.icone,
        tipoCalculo: data.tipoCalculo,
        funcaoReferencia: data.tipoCalculo === 'AUTOMATICO' ? data.funcaoReferencia : null,
      };

      const docRef = await addDoc(collection(db, 'categorias_premios'), payload);
      return docRef.id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categorias_premios'] });
      toast.success('Categoria criada com sucesso!');
    },
    onError: (error) => {
      console.error("Erro ao salvar categoria no Firestore:", error);
      toast.error('Erro ao criar categoria.');
    }
  });
}