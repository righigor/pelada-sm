import type { EstatisticasInputStore, PartidaKey } from "@/types/PartidaStore";
import TeamList from "./team-list";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Item, ItemContent, ItemMedia, ItemTitle } from "./ui/item";
import type { DestaquePartida } from "@/types/destaques/Destaque";
import { Trophy } from "lucide-react";

interface ListByTeamsProps {
  estatisticas: EstatisticasInputStore;
  teamsMvps: Record<PartidaKey, DestaquePartida | null>;
}

const teamEmojiMap: Record<string, string> = {
  azul: "🔵",
  preto: "⚫",
  branco: "⚪",
  vermelho: "🔴",
  goleiros: "🧤",
};

export default function ListByTeams({
  estatisticas,
  teamsMvps,
}: ListByTeamsProps) {
  return (
    <Card className="mb-8 mx-auto">
      <CardHeader className="text-center text-2xl font-bold">
        <CardTitle>Estatísticas por Time</CardTitle>
        <CardDescription className="text-xs">
          Veja as estatísticas detalhadas para cada time.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {Object.entries(estatisticas).map(([teamKey, grupo]) => (
          <Item
            key={teamKey}
            variant="outline"
            className="space-y-2 flex flex-col"
          >
            <div className="flex items-center gap-2">
              <ItemMedia>{teamEmojiMap[teamKey]}</ItemMedia>
              <ItemTitle className="capitalize text-xl text-center font-semibold flex items-center gap-2">
                {teamKey}
                <span className="flex items-center text-sm font-normal gap-1">
                  <Trophy className="inline-block ml-2 mb-1 size-4 text-yellow-500" />
                  <span>
                    {teamsMvps[teamKey as PartidaKey]
                      ? `${teamsMvps[teamKey as PartidaKey]!.nome}`
                      : "N/A"}
                  </span>
                </span>
              </ItemTitle>
            </div>
            <ItemContent>
              <TeamList jogadores={grupo} />
            </ItemContent>
          </Item>
        ))}
      </CardContent>
    </Card>
  );
}
