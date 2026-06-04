import { setVotoPremiacao } from "@/queries/premiacao/set-voto-premiacao";
import type { VotoPremiado } from "@/queries/premiacao/get-votos-premiacao";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useSetVotoPremiacao(temporada: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      campo,
      voto,
    }: {
      campo: "craqueGalera" | "bagreGalera";
      voto: VotoPremiado;
    }) => setVotoPremiacao(temporada, campo, voto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["premiacao-votos", temporada] });
    },
  });
}
