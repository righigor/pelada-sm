import type { JogadorDetails } from "@/queries/jogadores/get-jogador-by-id";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

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


export default function JogadorTimesDetalhes({ jogador }: JogadorTimesDetalhesProps) {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Times</CardTitle>
        <CardDescription className="text-xs">Lista de quantas vezes o jogador já jogou em cada time</CardDescription>
      </CardHeader>
      <CardContent>
        {jogador.partidas === 0 ? (
          <p className="text-center text-gray-400">Nenhum time encontrado para este jogador.</p>
        ) : (
          Object.entries(jogador.times).map(([team, count]) => (
            <div key={team} className="flex justify-between items-center py-2 border-b last:border-b-0">
              <div className="flex items-center gap-2">
                <span className="text-xl ">{teamEmojiMap[team]}</span>
                <span className="capitalize font-medium">{team}</span>
              </div>
              <span className="font-bold">{count} {count === 1 ? "Partida" : "Partidas"}</span>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}