import { useState } from "react";
import { UserPlus, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "./ui/scroll-area";

interface DialogAdicionarProps {
  disponiveis: { id: string; nome: string }[];
  onAdicionar: (atletaId: string) => void;
}

export function DialogAdicionarJogador({
  disponiveis,
  onAdicionar,
}: DialogAdicionarProps) {
  const [busca, setBusca] = useState("");
  const [open, setOpen] = useState(false);
  const atletasFiltrados = disponiveis.filter((atleta) =>
    atleta.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const handleSelecionar = (id: string) => {
    onAdicionar(id);
    setOpen(false);
    setBusca("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full mt-auto border-dashed border-slate-700 text-slate-500 hover:text-slate-200 h-10 bg-transparent font-bold text-xs"
        >
          <UserPlus className="mr-2 h-4 w-4" />
          ADICIONAR JOGADOR
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-slate-900 border-slate-800 text-slate-100 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="uppercase tracking-tight">
            Convocar Atleta
          </DialogTitle>
        </DialogHeader>

        <div className="relative my-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <Input
            placeholder="Buscar nome do atleta..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-10 bg-slate-800 border-slate-700 focus:ring-blue-500"
          />
        </div>

        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-2">
            {atletasFiltrados.length > 0 ? (
              atletasFiltrados.map((atleta) => (
                <div
                  key={atleta.id}
                  onClick={() => handleSelecionar(atleta.id)}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-blue-500 hover:bg-slate-800 cursor-pointer transition-all group"
                >
                  <span className="font-medium uppercase text-sm tracking-wide group-hover:text-blue-400">
                    {atleta.nome}
                  </span>
                  <UserPlus className="h-4 w-4 text-slate-500 group-hover:text-blue-400" />
                </div>
              ))
            ) : (
              <p className="text-center text-slate-500 py-10 text-sm">
                Nenhum atleta disponível ou encontrado.
              </p>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
