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
import { IconSearch } from "@tabler/icons-react";
import { useMemo, useState } from "react";

export default function AllJogadoresPage() {
  const { data, isPending } = useGetAllJogadores();
  const anoAtual = new Date().getFullYear().toString();
  const [temporada, setTemporada] = useState<string>(anoAtual);
  const [searchTerm, setSearchTerm] = useState("");
  const anosDisponiveis = Object.keys(data?.[0]?.stats.temporadas || {}).sort(
    (a, b) => b.localeCompare(a)
  );

  if (!anosDisponiveis.includes(anoAtual)) {
    anosDisponiveis.unshift(anoAtual);
  }

  const jogadoresFiltrados = useMemo(() => {
    if (!data) return [];

    return data.filter((jogador) => {
      const matchesSearch = jogador.nome
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesSearch;
    });
  }, [data, searchTerm]);

  return (
    <div className="flex flex-col mt-8 container mx-auto px-8 py-8 gap-2">
      <h2 className="text-xl font-bold mb-4 text-center md:text-2xl">
        Todos os Jogadores
      </h2>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 rounded-xl border ">
        <div className="relative w-full md:max-w-sm">
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
          <Input
            placeholder="Buscar jogador pelo nome..."
            className="pl-10 bg-zinc-950 border-zinc-800 focus:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex justify-end items-center gap-4">
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
      </div>
      <section>
        {isPending && <SkeletonCard />}
        {!isPending && jogadoresFiltrados.length === 0 && (
          <div className="text-center py-20 text-zinc-500">
            Nenhum jogador encontrado com o nome "{searchTerm}".
          </div>
        )}
        {jogadoresFiltrados.map((jogador) => (
          <JogadorCardList
            key={jogador.id}
            jogador={jogador}
            temporadaFiltro={temporada}
          />
        ))}
      </section>
    </div>
  );
}
