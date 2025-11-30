import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import LoadingButton from "./loading-button"

interface ConfirmDeletePartidaProps {
  mutate: (partidaId: string) => void;
  isLoading: boolean;
  partidaId: string;
}

export function ConfirmDeletePartida({ mutate, isLoading, partidaId }: ConfirmDeletePartidaProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full cursor-pointer">Excluir Partida</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza quer excluir a partida?</AlertDialogTitle>
          <AlertDialogDescription>
            Ao confirmar, os dados da partida serão salvos permanentemente.
            Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction>
            <LoadingButton
              onClick={() => mutate(partidaId)}
              isLoading={isLoading}
            >
              Confirmar e Excluir
            </LoadingButton>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
