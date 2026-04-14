import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";

export function RegistraStatsPartidaCardBtn() {
  return (
    <Button
      className="cursor-pointer"
    >
      <PlusIcon className="size-4" />
      Registrar Stats
    </Button>
  )
}