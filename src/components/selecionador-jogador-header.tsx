import { Card, CardHeader, CardTitle } from "@/components/ui/card";

interface SelecionadorJogadorHeaderProps {
  timeAtualLabel: string;
  jogadoresNoTime: number;
  limiteMaximo: number;
}

export default function SelecionadorJogadorHeader({
  timeAtualLabel,
  jogadoresNoTime,
  limiteMaximo,
}: SelecionadorJogadorHeaderProps) {
  const colorEmojiMap: { [key: string]: string } = {
    azul: "🔵",
    preto: "⚫",
    branco: "⚪",
    vermelho: "🔴",
    goleiros: "🧤",
  };

  const getEmojiKey = () => {
    if (timeAtualLabel === "Goleiros") {
      return "goleiros";
    }

    const parts = timeAtualLabel.split(" ");
    if (parts.length > 1) {
      return parts[1].toLowerCase();
    }
    return ""; 
  };

  const emojiKey = getEmojiKey();

  return (
    <Card className="shadow-lg sticky top-25 z-10 max-w-3xl mx-auto w-full">
      <CardHeader className="flex flex-row items-center justify-center gap-8">
        <CardTitle className="text-md md:text-xl font-bold">
          {colorEmojiMap[emojiKey] || "⚽"}{" "}
          {timeAtualLabel}
        </CardTitle>
        <p className="text-base font-medium text-gray-400">
          {`Selecionados: ${jogadoresNoTime} / ${limiteMaximo}`}
        </p>
      </CardHeader>
    </Card>
  );
}
