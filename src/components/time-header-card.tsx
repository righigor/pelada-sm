import { IconTrophy } from "@tabler/icons-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export const TimeHeaderCard = ({
  vitorias,
  onUpdate,
}: {
  vitorias: number;
  onUpdate: (valor: number) => void;
}) => (
  <Card className="flex items-center justify-between border-zinc-800 mt-3 p-3">
    <div className="flex flex-col items-center gap-2 w-full">
      <span className="text-sm font-medium text-gray-200 flex items-center gap-1">
        <IconTrophy className="size-4 text-yellow-500" />
        <span>Vitórias</span>
      </span>

      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          size="icon-sm"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onUpdate(-1);
          }}
          disabled={vitorias === 0}
        >
          -
        </Button>

        <strong className="text-sm md:text-xl font-extrabold text-white">
          {vitorias}
        </strong>

        <Button
          variant="outline"
          size="icon-sm"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onUpdate(1);
          }}
        >
          +
        </Button>
      </div>
    </div>
  </Card>
);
