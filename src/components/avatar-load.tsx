import type { JogadorResponseType } from "@/types/jogadores/Jogador";
import { getIniciais } from "@/utils/get-iniciais";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";

interface AvatarLoadProps {
  jogador: JogadorResponseType;
  isImageLoaded: boolean;
  setIsImageLoaded: (loaded: boolean) => void;
  avatarSizeClasses: string;
}

export default function AvatarLoad({
  jogador,
  isImageLoaded,
  setIsImageLoaded,
  avatarSizeClasses,
}: AvatarLoadProps) {
  return (
    <Avatar className={`relative ${avatarSizeClasses} rounded-md`}>
      <AvatarImage
        src={jogador.fotoUrl ?? undefined}
        alt={jogador.nome}
        className={`object-cover transition-opacity duration-300 ${
          isImageLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setIsImageLoaded(true)}
        onError={(e) => {
          (e.target as HTMLImageElement).src = "";
          setIsImageLoaded(true);
        }}
      />

      {(!isImageLoaded || !jogador.fotoUrl) && (
        <div
          className={`absolute top-0 left-0 ${avatarSizeClasses}  overflow-hidden`}
        >
          <Skeleton className="w-full h-full" />
          {!jogador.fotoUrl && isImageLoaded && (
            <AvatarFallback
              className={`bg-gray-300 text-lg absolute inset-0 flex items-center justify-center`}
            >
              {getIniciais(jogador.nome)}
            </AvatarFallback>
          )}
        </div>
      )}
    </Avatar>
  );
}
