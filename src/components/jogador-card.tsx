import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import type { JogadorResponseType } from "@/types/jogadores/Jogador";
import { Avatar } from "@radix-ui/react-avatar";
import { IconBallFootball, IconShoe } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";
import { getIniciais } from "@/utils/get-iniciais";

interface JogadorItemProps {
  jogador: JogadorResponseType;
}

export default function JogadorCard({ jogador }: JogadorItemProps) {
  const navigate = useNavigate();
  const [isImageLoaded, setIsImageLoaded] = useState(false); 
  const avatarSizeClasses = "w-14 h-14 md:w-20 md:h-20";

  return (
    <Card className="mb-4 p-4 flex flex-row justify-between items-center cursor-pointer" onClick={() => navigate(`/jogadores/${jogador.id}`)}>
      <div className="flex gap-2 md:gap-4 items-center">
        <Avatar className={`relative ${avatarSizeClasses}`}>
          <AvatarImage
            src={jogador.fotoUrl ?? undefined}
            alt={jogador.nome}
            className={`${avatarSizeClasses} rounded-md object-cover transition-opacity duration-300 ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setIsImageLoaded(true)}
            onError={(e) => {
              (e.target as HTMLImageElement).src = '';
              setIsImageLoaded(true);
            }}
          />

          {(!isImageLoaded || !jogador.fotoUrl) && (
            <div 
              className={`absolute top-0 left-0 ${avatarSizeClasses} rounded-md overflow-hidden`}
            >
              <Skeleton className="w-full h-full" />
              {!jogador.fotoUrl && isImageLoaded && (
                <AvatarFallback className={`bg-gray-300 text-lg absolute inset-0 flex items-center justify-center`}>
                  {getIniciais(jogador.nome)}
                </AvatarFallback>
              )}
            </div>
          )}

        </Avatar>
        <h2 className="md:text-xl text-xs font-bold">{jogador.nome}
        </h2>
      </div>

      <div className="flex gap-4 items-center md:gap-8">
        <div className="flex items-center">
          <strong className="text-xs md:text-xl">{jogador.gols}</strong>
          <IconBallFootball className="inline-block ml-1 size-4 md:size-6" />
        </div>
        <div className="flex items-center">
          <strong className="text-xs md:text-xl">{jogador.assistencias}</strong>
          <IconShoe className="inline-block ml-1 size-4 md:size-6" />
        </div>
        <div className="flex items-center">
          <strong className="text-xs md:text-xl">{jogador.golContra}</strong>
          <IconBallFootball className="inline-block ml-1 text-red-700 size-4 md:size-6" />
        </div>
      </div>
    </Card>
  );
}
