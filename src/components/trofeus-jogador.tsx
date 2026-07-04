import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGetPremiosJogador } from "@/hooks/premiacao/use-get-premiacao-jogador";
import { CardFooter } from "./ui/card";

interface TrofeusJogadorProps {
  jogadorId: string;
  temporada: string;
}

export default function TrofeusJogador({
  jogadorId,
  temporada,
}: TrofeusJogadorProps) {
  const { data: trofeus, isLoading } = useGetPremiosJogador(jogadorId);

  const trofeusFiltrados = trofeus?.filter((trofeu) => {
    if (temporada === "all" || !trofeu.dataFinalizacao) return true;

    // Extrai o ano da string "2026-06-04T23:23:10.162Z" e compara com o filtro
    const anoTrofeu = new Date(trofeu.dataFinalizacao).getFullYear().toString();
    return anoTrofeu === temporada;
  });

  if (isLoading || !trofeusFiltrados || trofeusFiltrados.length === 0)
    return null;

  return (
    <CardFooter className="border-t">
      <div className="w-full px-4">
        <div className="scroll-trofeus flex items-center justify-center gap-4 w-max mx-auto">
          {trofeusFiltrados.map((trofeu) => (
            <Tooltip key={`${trofeu.idPremiacao}-${trofeu.nomeCategoria}`}>
              <TooltipTrigger asChild>
                <img
                  src="/trofeu-pelada-sm.png"
                  alt={`Troféu ${trofeu.nomeCategoria}`}
                  className="size-12 md:size-14 shrink-0 drop-shadow-[0_2px_8px_rgba(255,215,0,0.4)] hover:scale-110 hover:drop-shadow-[0_4px_12px_rgba(255,215,0,0.6)] transition-all duration-200 cursor-default"
                />
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-center">
                <p className="font-semibold text-yellow-600">
                  {trofeu.nomeCategoria}
                </p>
                <p className="text-xs">{trofeu.nomeEdicao}</p>
                {trofeu.detalhes && (
                  <p className="text-xs font-medium">{trofeu.detalhes}</p>
                )}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </CardFooter>
  );
}
