import { storage } from "@/firebase/config";
import { ref, deleteObject } from "firebase/storage";
import { toast } from "sonner";

export async function deleteFoto(photoUrl: string): Promise<void> {
    if (!photoUrl) return;

    try {
        const fileRef = ref(storage, photoUrl);
        await deleteObject(fileRef);
        toast.success(`Foto excluída do Storage com sucesso.`);
    } catch (error) {
        toast.error(`Aviso: Falha ao excluir a foto. ${error}`);
    }
}