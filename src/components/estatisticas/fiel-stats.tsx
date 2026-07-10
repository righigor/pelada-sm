import { useMemo } from "react";
import { calcularFieloesDeTimes } from "@/utils/estatisticas/times-helpers";
import CardTime from "./card-fiel";
import FielSkeleton from "./skeleton/fiel-skeleton";
import FielError from "./errors/fiel-error";
import type { JogadorNewResponseType } from "@/types/jogadores/Jogador";

interface FieloesTimesProps {
  jogadores: JogadorNewResponseType[] | undefined;
  isLoading: boolean;
}

export function FieloesTimes({ jogadores, isLoading }: FieloesTimesProps) {
  const fieis = useMemo(() => {
    if (!jogadores) return null;
    return calcularFieloesDeTimes(jogadores);
  }, [jogadores]);

  if (isLoading) {
    return <FielSkeleton />;
  }

  if (!fieis) {
    return <FielError />;
  }

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
      <CardTime timeKey="azul" fiel={fieis.azul} />
      <CardTime timeKey="preto" fiel={fieis.preto} />
      <CardTime timeKey="branco" fiel={fieis.branco} />
      <CardTime timeKey="vermelho" fiel={fieis.vermelho} />
      <CardTime timeKey="goleiros" fiel={fieis.goleiros} />
    </div>
  );
}
