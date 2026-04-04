import { useParams } from "react-router-dom";
import { useGetJogadorDetails } from "@/hooks/jogadores/use-get-jogador-by-id";
import JogadorHeaderDetalhes from "@/components/jogador-header-detalhes";
import JogadorTimesDetalhes from "@/components/jogador-times-detalhes";
import CompanheirosDeTime from "@/components/companheiros-de-time";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { JogadorDetalhesStatsType } from "@/types/jogadores/Jogador";

export default function DetalhesJogadorPage() {
  const { id } = useParams<{ id: string }>();
  const { data: jogador, isPending, error } = useGetJogadorDetails(id || "");
  const anoAtual = new Date().getFullYear().toString();
  const [temporada, setTemporada] = useState<string>(anoAtual);

  if (isPending) {
    return (
      <div className="text-center p-8">Carregando detalhes do jogador...</div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center p-8 text-red-600">Erro: {error.message}</div>
    );
  }
  
  if (!jogador) {
    return <div className="text-center p-8">Jogador não encontrado.</div>;
  }
  const anosDisponiveis = Object.keys(jogador?.stats.temporadas || {}).sort(
    (a, b) => b.localeCompare(a)
  );

  if (!anosDisponiveis.includes(anoAtual)) {
    anosDisponiveis.unshift(anoAtual);
  }

  const statsExibicao =
    temporada === "all"
      ? jogador.stats
      : jogador.stats.temporadas?.[temporada] ||
        ({
          gols: 0,
          assistencias: 0,
          golsContra: 0,
          partidas: 0,
          defesasDificeis: 0,
          mvpsGeral: 0,
          mvpsPorTime: 0,
          times: {},
          companheiros: {},
        } as JogadorDetalhesStatsType);

  return (
    <div className="container mx-auto p-8 space-y-8">
      <div className="mt-4 flex justify-end items-center gap-4">
        <span className="text-sm font-medium text-zinc-400">
          Filtrar Temporada:
        </span>
        <Select value={temporada} onValueChange={setTemporada}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione o ano" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Histórico Geral</SelectItem>
            {anosDisponiveis.map((ano) => (
              <SelectItem key={ano} value={ano}>
                Temporada {ano}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <JogadorHeaderDetalhes jogador={jogador} statsExibicao={statsExibicao} />
      <JogadorTimesDetalhes jogador={jogador} statsExibicao={statsExibicao} />
      <CompanheirosDeTime jogador={jogador} statsExibicao={statsExibicao} />
    </div>
  );
}
