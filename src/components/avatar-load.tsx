/* eslint-disable react-hooks/set-state-in-effect */
import type { JogadorResponseType } from "@/types/jogadores/Jogador";
import { getIniciais } from "@/utils/get-iniciais";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";
import { useEffect, useState } from "react";

interface AvatarLoadProps {
  jogador: JogadorResponseType;
  avatarSizeClasses: string;
}

export default function AvatarLoad({
  jogador,
  avatarSizeClasses,
}: AvatarLoadProps) {
  const [imageState, setImageState] = useState<'loading' | 'loaded' | 'error'>(
    jogador.fotoUrl ? 'loading' : 'loaded' 
  );

  useEffect(() => {
    setImageState(jogador.fotoUrl ? 'loading' : 'loaded');
  }, [jogador.fotoUrl]);

  if (!jogador.fotoUrl) {
    return (
      <Avatar className={`${avatarSizeClasses} rounded-md text-lg`}>
        <AvatarFallback>
          {getIniciais(jogador.nome)}
        </AvatarFallback>
      </Avatar>
    );
  }


  return (
    <Avatar className={`relative ${avatarSizeClasses} rounded-md`}>
      <AvatarImage
        src={jogador.fotoUrl}
        alt={jogador.nome}
        className={`object-cover transition-opacity duration-300 ${
          imageState === 'loaded' ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setImageState('loaded')}
        onError={() => setImageState('error')} // Falha no carregamento
      />

      {imageState === 'loading' && (
        <div className={`absolute top-0 left-0 ${avatarSizeClasses} overflow-hidden`}>
          <Skeleton className="w-full h-full" />
        </div>
      )}

      {imageState === 'error' && (
        <AvatarFallback
          className={`text-lg absolute inset-0 flex items-center justify-center`}
        >
          {getIniciais(jogador.nome)}
        </AvatarFallback>
      )}
    </Avatar>
  );
}