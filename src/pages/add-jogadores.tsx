import InputFotoPerfil from "@/components/input-foto";
import LoadingButton from "@/components/loading-button";
import { Input } from "@/components/ui/input";
import { useCreateJogador } from "@/hooks/jogadores/use-create-jogador";
import { useState } from "react";

export default function AddJogadoresPage() {
  const [foto, setFoto] = useState<File | null>(null);
  const [nome, setNome] = useState("");
  const { mutate, isPending } = useCreateJogador();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nome.trim() && foto) {
      mutate({ nome, foto });
    }
  };

  return (
    <div className="flex h-[60vh] items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <InputFotoPerfil onFileChange={setFoto} />
          <Input
            type="text"
            placeholder="Nome do Jogador"
            className="w-full"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        <LoadingButton isLoading={isPending} type="submit" className="mt-4 w-full cursor-pointer">Adicionar Jogador</LoadingButton>
      </form>
    </div>
  );
}
