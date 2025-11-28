// src/components/JogadorCard.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Item, ItemActions, ItemTitle } from "@/components/ui/item";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { getIniciais } from "@/utils/get-iniciais";
import { Check, Plus } from "lucide-react"; // Ícones
import type { JogadorResponseType } from "@/types/jogadores/Jogador";

interface JogadorCardProps {
  jogador: JogadorResponseType;
  isSelected: boolean;
  onToggle: (jogador: JogadorResponseType) => void;
  isDisabled: boolean;
}

export default function JogadorItemSelecionar({
  jogador,
  isSelected,
  onToggle,
  isDisabled,
}: JogadorCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const avatarSizeClasses = "w-14 h-14 md:w-20 md:h-20";

  const handleToggle = () => {
    if (!isDisabled || isSelected) {
      onToggle(jogador);
    }
  };

  return (
    <Item
      variant="outline"
      className={`mb-4 flex justify-between cursor-pointer transition-all duration-200 ${
        isSelected ? " border-green-400 shadow-md" : ""
      } ${isDisabled && !isSelected ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={handleToggle}
    >
      <ItemTitle>
        <div className="flex gap-2 md:gap-4 items-center">
          <Avatar className={`relative ${avatarSizeClasses}`}>
            <AvatarImage
              src={jogador.fotoUrl ?? undefined}
              alt={jogador.nome}
              className={`${avatarSizeClasses} rounded-md object-cover transition-opacity duration-300 ${
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
                className={`absolute top-0 left-0 ${avatarSizeClasses} rounded-md overflow-hidden`}
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
          <h2 className="md:text-xl text-xs font-bold">{jogador.nome}</h2>
        </div>
      </ItemTitle>

      <ItemActions>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleToggle();
          }}
          disabled={isDisabled && !isSelected}
          variant={isSelected ? "default" : "secondary"}
          className="cursor-pointer text-xs md:text-sm flex items-center gap-2"
        >
          {isSelected ? (
            <Check className="w-4 h-4" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
          {isSelected ? "Selecionado" : "Selecionar"}
        </Button>
      </ItemActions>
    </Item>
  );
}
