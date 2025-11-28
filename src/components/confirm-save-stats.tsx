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

interface ConfirmSaveStatsProps {
  handleSalvarPartida: () => void;
  isLoading: boolean;
}

export function ConfirmSaveStats({ handleSalvarPartida, isLoading }: ConfirmSaveStatsProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full cursor-pointer">Salvar Dados</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza quer salvar os dados?</AlertDialogTitle>
          <AlertDialogDescription>
            Ao confirmar, os dados da partida serão salvos permanentemente.
            Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction>
            <LoadingButton
              onClick={handleSalvarPartida}
              isLoading={isLoading}
            >
              Confirmar e Salvar
            </LoadingButton>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
