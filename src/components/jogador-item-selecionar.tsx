import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Item, ItemActions, ItemTitle } from "@/components/ui/item";
import { Check, Plus } from "lucide-react"; // Ícones
import type { JogadorResponseType } from "@/types/jogadores/Jogador";
import AvatarLoad from "./avatar-load";

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
          <AvatarLoad jogador={jogador} avatarSizeClasses={avatarSizeClasses} isImageLoaded={isImageLoaded} setIsImageLoaded={setIsImageLoaded} />
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
