import { Button } from "./ui/button";

interface StatsCounterProps {
  jogadorId: string;
  tipo: "gols" | "assistencias" | "golContra";
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icone: any;
  cor: string;
  value: number;
  onUpdate: (
    jogadorId: string,
    tipo: "gols" | "assistencias" | "golContra",
    value: number
  ) => void;
}

export default function StatsCounter({
  jogadorId,
  tipo,
  label,
  Icone,
  cor,
  value,
  onUpdate,
}: StatsCounterProps) {
  return (
    <div className="flex flex-col items-center space-x-2 border p-2 rounded-lg w-full md:w-auto mb-2 md:mb-0">
      <div className="flex items-center space-x-1 mb-1">
        <Icone className={`size-3 ${cor}`} />
        <span className="text-xs text-gray-200">{label}</span>
      </div>
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          size="icon-sm"
          onClick={() => onUpdate(jogadorId, tipo, -1)}
          disabled={value === 0}
        >
          -
        </Button>
        <strong className="text-sm md:text-xl font-extrabold">{value}</strong>
        <Button
          variant="outline"
          size="icon-sm"
          onClick={() => onUpdate(jogadorId, tipo, 1)}
        >
          +
        </Button>
      </div>
    </div>
  );
}
