import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useGetAllJogadores } from "@/hooks/jogadores/use-get-all-jogadores";

interface ModalVotoManualProps {
  nomeCategoria: string;
  onSalvarVoto: (dados: {
    vencedorId: string;
    vencedorNome: string;
    vencedorFotoUrl: string | null;
    detalhes: string;
  }) => void;
  trigger: React.ReactNode;
}

export function ModalVotoManual({
  nomeCategoria,
  onSalvarVoto,
  trigger,
}: ModalVotoManualProps) {
  const [open, setOpen] = useState(false);
  const [jogadorId, setJogadorId] = useState("");
  const [votos, setVotos] = useState("");

  const { data: jogadores, isLoading } = useGetAllJogadores();

  const handleSalvar = () => {
    if (!jogadorId || !votos) return;

    const jogadorSelecionado = jogadores?.find((j) => j.id === jogadorId);
    if (!jogadorSelecionado) return;

    onSalvarVoto({
      vencedorId: jogadorSelecionado.id,
      vencedorNome: jogadorSelecionado.nome,
      vencedorFotoUrl: jogadorSelecionado.fotoUrl,
      detalhes: `${votos} Votos`,
    });

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Votação: {nomeCategoria}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="jogador">Jogador Vencedor</Label>
            {isLoading ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground py-2">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />{" "}
                Carregando jogadores...
              </div>
            ) : (
              <Select value={jogadorId} onValueChange={setJogadorId}>
                <SelectTrigger id="jogador">
                  <SelectValue placeholder="Selecione o vencedor..." />
                </SelectTrigger>
                <SelectContent>
                  {jogadores?.map((j) => (
                    <SelectItem key={j.id} value={j.id}>
                      {j.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="votos">Quantidade de Votos</Label>
            <Input
              id="votos"
              type="number"
              placeholder="Ex: 14"
              value={votos}
              onChange={(e) => setVotos(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSalvar} disabled={!jogadorId || !votos}>
            Definir Vencedor
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
