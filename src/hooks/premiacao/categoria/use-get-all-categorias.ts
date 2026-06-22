import { db } from '@/firebase/config';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';

export interface Categoria {
  id: string;
  nome: string;
  icone: string;
  tipoCalculo: 'AUTOMATICO' | 'MANUAL';
  funcaoReferencia: string | null;
}

export function useGetAllCategorias() {
  return useQuery<Categoria[]>({
    queryKey: ['categorias_premios'],
    queryFn: async () => {
      const querySnapshot = await getDocs(collection(db, 'categorias_premios'));
      const categorias: Categoria[] = [];
      
      querySnapshot.forEach((doc) => {
        categorias.push({
          id: doc.id,
          ...doc.data()
        } as Categoria);
      });
      
      return categorias;
    }
  });
}