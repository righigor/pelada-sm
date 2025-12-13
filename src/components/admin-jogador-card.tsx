import { useState } from "react";
import LoadingButton from "./loading-button";
import { Card, CardDescription, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import useUpdatePhotoMutation from "@/hooks/jogadores/use-update-foto";
import type { JogadorResponseType } from "@/types/jogadores/Jogador";
import AvatarLoad from "./avatar-load";

interface AdminJogadorCardProps {
  jogador: JogadorResponseType;
}

export default function AdminJogadorCard({ jogador }: AdminJogadorCardProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { mutate, isPending } = useUpdatePhotoMutation();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFile) {
      mutate({ jogadorId: jogador.id, jogadorNome: jogador.nome, file: selectedFile });
    } else {
      alert("Selecione um arquivo de foto.");
    }
  };

  return (
    <Card className="shadow-lg p-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
      <div className="flex items-center space-x-4">
        <AvatarLoad jogador={jogador} avatarSizeClasses="" />
        <div>
          <CardTitle className="text-lg">{jogador.nome}</CardTitle>
          <CardDescription>ID: {jogador.id.substring(0, 8)}...</CardDescription>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 items-center w-full md:w-auto"
      >
        <Input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="w-full sm:w-auto"
          disabled={isPending}
        />
        <LoadingButton
          isLoading={isPending}
          type="submit"
          className="w-full sm:w-auto"
        >
          Atualizar Foto
        </LoadingButton>
      </form>
    </Card>
  );
}
