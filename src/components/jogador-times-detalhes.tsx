import type { JogadorDetails } from "@/queries/jogadores/get-jogador-by-id";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import type { StatsJogadorType } from "@/types/jogadores/Jogador";

interface JogadorTimesDetalhesProps {
  jogador: JogadorDetails;
}

const teamEmojiMap: Record<string, string> = {
  azul: "🔵",
  preto: "⚫",
  branco: "⚪",
  vermelho: "🔴",
  goleiros: "🧤",
};


interface JogadorTimesDetalhesProps {
  statsExibicao: Omit<StatsJogadorType, "temporadas">;
}

export default function JogadorTimesDetalhes({ statsExibicao }: JogadorTimesDetalhesProps) {
  const timesEntries = Object.entries(statsExibicao.times || {});

  return (
    <Card>
      <CardHeader className="text-center pb-2">
        <CardTitle>Participação por Times</CardTitle>
      </CardHeader>
      <CardContent>
        {timesEntries.length === 0 ? (
          <p className="text-center text-zinc-500 py-4">Sem dados neste período.</p>
        ) : (
          timesEntries.map(([team, count]) => (
            <div key={team} className="flex justify-between py-2 border-b last:border-0">
               <span className="capitalize">{teamEmojiMap[team]} {team}</span>
               <span className="font-bold">{count as number} {count === 1 ? 'jogo' : 'jogos'}</span>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}