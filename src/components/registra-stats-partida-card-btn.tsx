import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";

export function RegistraStatsPartidaCardBtn() {
  return (
    <Button
      className="cursor-pointer"
    >
      <PlusIcon className="size-4 md:w-4 md:h-4 mr-1" />
      Registrar Estatísticas
    </Button>
  )
}