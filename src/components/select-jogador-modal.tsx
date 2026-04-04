/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IconPlus, IconSearch } from "@tabler/icons-react";

export function SelectJogadorModal({ onSelect }: { onSelect: (j: any) => void }) {
  const [open, setOpen] = useState(false);
  const [busca, setBusca] = useState("");
  const [jogadores, setJogadores] = useState<any[]>([]);

  useEffect(() => {
    if (open) {
      getDocs(collection(db, "jogadores")).then((snap) => {
        const list = snap.docs.map(d => ({ id: d.id, nome: d.data().nome }));
        setJogadores(list);
      });
    }
  }, [open]);

  const filtrados = jogadores.filter(j => 
    j.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="size-8">
          <IconPlus size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-zinc-900 border-zinc-800">
        <DialogHeader>
          <DialogTitle>Adicionar ao Pote</DialogTitle>
        </DialogHeader>
        <div className="relative mb-4">
          <IconSearch className="absolute left-3 top-3 text-zinc-500" size={18} />
          <Input 
            className="pl-10" 
            placeholder="Buscar jogador..." 
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
        <div className="max-h-[300px] overflow-y-auto space-y-1">
          {filtrados.map(jog => (
            <div 
              key={jog.id}
              onClick={() => {
                onSelect(jog);
                setOpen(false);
              }}
              className="p-3 hover:bg-zinc-800 rounded cursor-pointer transition-colors border border-transparent hover:border-zinc-700"
            >
              {jog.nome}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}