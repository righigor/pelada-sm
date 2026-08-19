import JogadorCardList from "@/components/jogador-card-list";
import SkeletonCard from "@/components/skeleton/skeleton-card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllJogadores } from "@/hooks/jogadores/use-get-all-jogadores";
import type {
  JogadorDetalhesStatsType,
  JogadorNewResponseType,
} from "@/types/jogadores/Jogador";
import { IconSearch } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

type OrdenacaoJogador =
  | "alfabetica"
  | "gols"
  | "assistencias"
  | "golsContra"
  | "defesasDificeis";

const statsVazios: JogadorDetalhesStatsType = {
  gols: 0,
  assistencias: 0,
  golsContra: 0,
  partidas: 0,
  defesasDificeis: 0,
  mvpsGeral: 0,
  mvpsPorTime: 0,
  times: {
    azul: null,
    preto: null,
    branco: null,
    vermelho: null,
    goleiros: null,
  },
  companheiros: {},
};

function getStatsJogador(
  jogador: JogadorNewResponseType,
  temporada: string,
): JogadorDetalhesStatsType {
  if (!jogador.stats) {
    return statsVazios;
  }

  if (temporada === "all") {
    return jogador.stats;
  }

  return jogador.stats.temporadas?.[temporada] ?? statsVazios;
}

function ordenarJogadores(
  jogadores: JogadorNewResponseType[],
  ordenacao: OrdenacaoJogador,
  temporada: string,
) {
  return [...jogadores].sort((a, b) => {
    if (ordenacao === "alfabetica") {
      return a.nome.localeCompare(b.nome, "pt-BR");
    }

    const statsA = getStatsJogador(a, temporada);
    const statsB = getStatsJogador(b, temporada);

    const valorA = statsA[ordenacao];
    const valorB = statsB[ordenacao];

    if (valorB !== valorA) {
      return valorB - valorA;
    }

    return a.nome.localeCompare(b.nome, "pt-BR");
  });
}

export default function AllJogadoresPage() {
  const { data, isPending } = useGetAllJogadores();

  const anoAtual = new Date().getFullYear().toString();

  const [temporada, setTemporada] = useState<string>(anoAtual);
  const [searchTerm, setSearchTerm] = useState("");
  const [ordenacao, setOrdenacao] =
    useState<OrdenacaoJogador>("alfabetica");

  const anosDisponiveis = useMemo(() => {
    if (!data || data.length === 0) {
      return [anoAtual];
    }

    const anos = new Set<string>();

    data.forEach((jogador) => {
      Object.keys(jogador.stats?.temporadas ?? {}).forEach((ano) => {
        anos.add(ano);
      });
    });

    anos.add(anoAtual);

    return Array.from(anos).sort((a, b) =>
      b.localeCompare(a),
    );
  }, [data, anoAtual]);

  const jogadoresFiltrados = useMemo(() => {
    if (!data) return [];

    const termo = searchTerm.trim().toLowerCase();

    const filtrados = data.filter((jogador) =>
      jogador.nome.toLowerCase().includes(termo),
    );

    return ordenarJogadores(
      filtrados,
      ordenacao,
      temporada,
    );
  }, [data, searchTerm, ordenacao, temporada]);

  const jogadoresAtivos = useMemo(() => {
    return jogadoresFiltrados.filter(
      (jogador) =>
        jogador.status === "ATIVO" ||
        jogador.status === "LESIONADO",
    );
  }, [jogadoresFiltrados]);

  const jogadoresInativos = useMemo(() => {
    return jogadoresFiltrados.filter(
      (jogador) => jogador.status === "INATIVO",
    );
  }, [jogadoresFiltrados]);

  const nenhumJogadorEncontrado =
    jogadoresAtivos.length === 0 &&
    jogadoresInativos.length === 0;

  return (
    <div className="container mx-auto mt-8 flex flex-col gap-6 px-8 py-8">
      <h2 className="text-center text-xl font-bold md:text-2xl">
        Todos os Jogadores
      </h2>

      <div className="flex flex-col gap-4 rounded-xl border p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-sm">
          <IconSearch className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />

          <Input
            placeholder="Buscar jogador pelo nome..."
            className="border-zinc-800 bg-zinc-950 pl-10 focus:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <span className="whitespace-nowrap text-sm font-medium text-zinc-400">
              Temporada:
            </span>

            <Select
              value={temporada}
              onValueChange={setTemporada}
            >
              <SelectTrigger className="w-[170px]">
                <SelectValue placeholder="Selecione o ano" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">
                  Histórico Geral
                </SelectItem>

                {anosDisponiveis.map((ano) => (
                  <SelectItem key={ano} value={ano}>
                    Temporada {ano}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="whitespace-nowrap text-sm font-medium text-zinc-400">
              Ordenar:
            </span>

            <Select
              value={ordenacao}
              onValueChange={(value) =>
                setOrdenacao(value as OrdenacaoJogador)
              }
            >
              <SelectTrigger className="w-[190px]">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="alfabetica">
                  Ordem alfabética
                </SelectItem>

                <SelectItem value="gols">
                  Gols
                </SelectItem>

                <SelectItem value="assistencias">
                  Assistências
                </SelectItem>

                <SelectItem value="golsContra">
                  Gols contra
                </SelectItem>

                <SelectItem value="defesasDificeis">
                  Defesas difíceis
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {isPending && (
        <section>
          <SkeletonCard />
        </section>
      )}

      {!isPending && nenhumJogadorEncontrado && (
        <div className="py-20 text-center text-zinc-500">
          Nenhum jogador encontrado com o nome "{searchTerm}".
        </div>
      )}

      {!isPending && jogadoresAtivos.length > 0 && (
        <section>
          <div className="mb-4">
            <h3 className="text-lg font-bold">
              Jogadores
            </h3>

            <p className="text-sm text-muted-foreground">
              Jogadores ativos e lesionados que fazem parte da pelada.
            </p>
          </div>

          {jogadoresAtivos.map((jogador) => (
            <Link
              key={jogador.id}
              to={`/jogadores/${jogador.id}`}
            >
              <JogadorCardList
                jogador={jogador}
                temporadaFiltro={temporada}
              />
            </Link>
          ))}
        </section>
      )}

      {!isPending && jogadoresInativos.length > 0 && (
        <section className="border-t pt-6">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-muted-foreground">
              Jogadores Inativos
            </h3>

            <p className="text-sm text-muted-foreground">
              Jogadores que não fazem mais parte da pelada.
            </p>
          </div>

          <div className="opacity-70">
            {jogadoresInativos.map((jogador) => (
              <Link
                key={jogador.id}
                to={`/jogadores/${jogador.id}`}
              >
                <JogadorCardList
                  jogador={jogador}
                  temporadaFiltro={temporada}
                />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}