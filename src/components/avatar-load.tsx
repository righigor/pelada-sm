/* eslint-disable react-hooks/set-state-in-effect */
import type {
  JogadorAvatarType,
  JogadorNewResponseType,
} from "@/types/jogadores/Jogador";
import { getIniciais } from "@/utils/get-iniciais";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";
import { useEffect, useRef, useState } from "react";

interface AvatarLoadProps {
  jogador: JogadorNewResponseType | JogadorAvatarType | null;
  avatarSizeClasses: string;
}

export default function AvatarLoad({
  jogador,
  avatarSizeClasses,
}: AvatarLoadProps) {
  // Ref que guarda qual URL está autorizada a atualizar o estado no momento
  const currentUrlRef = useRef(jogador?.fotoUrl ?? null);

  const [imageState, setImageState] = useState<"loading" | "loaded" | "error">(
    jogador?.fotoUrl ? "loading" : "loaded"
  );

  useEffect(() => {
    if (!jogador?.fotoUrl) {
      setImageState("loaded");
      return;
    }

    // Se a URL mudou (ex: o componente foi reciclado pelo React para outro jogador)
    if (currentUrlRef.current !== jogador.fotoUrl) {
      currentUrlRef.current = jogador.fotoUrl; // Trava a nova URL
      setImageState("loading");                 // Reseta para o skeleton
    }
  }, [jogador?.fotoUrl]);

  // 1. Caso o objeto jogador inteiro seja nulo (nosso fallback de segurança)
  if (!jogador) {
    return (
      <Avatar className={`${avatarSizeClasses} rounded-md text-lg`}>
        <AvatarFallback>?</AvatarFallback>
      </Avatar>
    );
  }

  // 2. Caso não tenha URL de foto
  if (!jogador.fotoUrl) {
    return (
      <Avatar className={`${avatarSizeClasses} rounded-md text-lg`}>
        <AvatarFallback>{getIniciais(jogador.nome)}</AvatarFallback>
      </Avatar>
    );
  }

  // 3. Caso tenha URL de foto
  return (
    <Avatar className={`relative ${avatarSizeClasses} rounded-md`}>
      <AvatarImage
        src={jogador.fotoUrl}
        alt={jogador.nome}
        className={`object-cover transition-opacity duration-300 ${
          imageState === "loaded" ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => {
          // SÓ atualiza para "loaded" se a URL que terminou de carregar 
          // for EXATAMENTE a que está na nossa Ref (a atual)
          if (currentUrlRef.current === jogador.fotoUrl) {
            setImageState("loaded");
          }
        }}
        onError={() => {
          // SÓ atualiza para "error" se a URL que falhou 
          // for EXATAMENTE a que está na nossa Ref (a atual)
          if (currentUrlRef.current === jogador.fotoUrl) {
            setImageState("error");
          }
        }}
      />

      {imageState === "loading" && (
        <div
          className={`absolute top-0 left-0 ${avatarSizeClasses} overflow-hidden`}
        >
          <Skeleton className="w-full h-full" />
        </div>
      )}

      {imageState === "error" && (
        <AvatarFallback
          className={`text-lg absolute inset-0 flex items-center justify-center`}
        >
          {getIniciais(jogador.nome)}
        </AvatarFallback>
      )}
    </Avatar>
  );
}