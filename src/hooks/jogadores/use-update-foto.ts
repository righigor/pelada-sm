import { updateJogadorPhoto } from "@/queries/jogadores/update-foto";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useUpdatePhotoMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ jogadorId, file }: { jogadorId: string; file: File }) => 
            updateJogadorPhoto(jogadorId, file),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['jogadoresList'] });
            toast.success("Foto atualizada com sucesso!");
        },
        onError: (error) => {
            toast.error(`Erro ao fazer upload da foto: ${error.message}`);
        },
    });
};