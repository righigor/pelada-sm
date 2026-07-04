import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CardFooter } from "./ui/card";
import { useGetPremiosJogador } from "@/hooks/premiacao/use-get-premiacao-jogador";

interface TrofeusJogadorProps {
  jogadorId: string;
  temporada: string;
}

export default function TrofeusJogador({ jogadorId, temporada }: TrofeusJogadorProps) {
  const { data: trofeus, isLoading } = useGetPremiosJogador(jogadorId);
  const [trofeuAtivo, setTrofeuAtivo] = useState<string | null>(null);

  const handleToggle = (idTrofeu: string) => {
    setTrofeuAtivo((prev) => (prev === idTrofeu ? null : idTrofeu));
  };

  const trofeusFiltrados = trofeus?.filter((trofeu) => {
    if (temporada === "all" || !trofeu.dataFinalizacao) return true;
    const anoTrofeu = new Date(trofeu.dataFinalizacao).getFullYear().toString();
    return anoTrofeu === temporada;
  });

  if (isLoading || !trofeusFiltrados || trofeusFiltrados.length === 0) return null;

  return (
    <CardFooter className="border-t">
      <div className="w-full px-4">
        <div className="scroll-trofeus flex items-center justify-center gap-4 w-max mx-auto">
          {trofeusFiltrados.map((trofeu) => {
            const idTrofeu = `${trofeu.idPremiacao}-${trofeu.nomeCategoria}`;
            const isAtivo = trofeuAtivo === idTrofeu;

            return (
              <Tooltip 
                key={idTrofeu}
                open={isAtivo} 
                onOpenChange={(isOpen) => {
                  if (!isOpen) setTrofeuAtivo(null);
                }}
              >
                <TooltipTrigger asChild>
                  <img
                    src="/trofeu-pelada-sm.png" 
                    alt={`Troféu ${trofeu.nomeCategoria}`}
                    onPointerEnter={() => setTrofeuAtivo(idTrofeu)}
                    onPointerLeave={() => setTrofeuAtivo(null)}
  
                    onClick={() => handleToggle(idTrofeu)}
                    className="size-12 md:size-14 shrink-0 drop-shadow-[0_2px_8px_rgba(255,215,0,0.4)] hover:scale-110 hover:drop-shadow-[0_4px_12px_rgba(255,215,0,0.6)] active:scale-95 transition-all duration-200"
                  />
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-center">
                  <p className="font-semibold text-yellow-600">{trofeu.nomeCategoria}</p>
                  <p className="text-xs">{trofeu.nomeEdicao}</p>
                  {trofeu.detalhes && (
                    <p className="text-xs font-medium">
                      {trofeu.detalhes}
                    </p>
                  )}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </CardFooter>
  );
}