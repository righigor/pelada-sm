import { useState } from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useGetAllJogadores } from "@/hooks/jogadores/use-get-all-jogadores";

interface Props {
  onAdicionar: (jogadorId: string, nome: string) => void;
}

export function AddJogadorDialog({ onAdicionar }: Props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const { data: todosJogadores } = useGetAllJogadores();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 text-zinc-400 hover:text-white"
        >
          <Plus size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className=" text-white">
        <DialogHeader>
          <DialogTitle>Adicionar Jogador ao Pote</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="w-full justify-between"
              >
                {value
                  ? todosJogadores?.find((j) => j.id === value)?.nome
                  : "Selecionar jogador..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0">
              <Command>
                <CommandInput
                  placeholder="Buscar por nome..."
                  className="text-white"
                />
                <CommandEmpty>Jogador não encontrado.</CommandEmpty>
                <CommandGroup className="max-h-60 overflow-y-auto">
                  {todosJogadores?.map((jogador) => (
                    <CommandItem
                      key={jogador.id}
                      value={jogador.nome}
                      onSelect={(currentValue) => {
                        setValue(currentValue);
                        onAdicionar(jogador.id, jogador.nome);
                        setOpen(false);
                        setValue("");
                      }}
                      className="text-zinc-200cursor-pointer"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === jogador.id ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {jogador.nome}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </DialogContent>
    </Dialog>
  );
}
