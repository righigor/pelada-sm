import GolsChart from "@/components/gols-chart";
import ListaJogadoresPartida from "@/components/lista-jogadores-partida";
import SectionMvps from "@/components/section-mvps";
import useGetAllNamesJogadores from "@/hooks/jogadores/use-get-names-jogadores";
import useGetPartidaByID from "@/hooks/partida/use-get-partida-by-id";
import { formatDate } from "@/utils/format-date";
import { getGolsChartData } from "@/utils/get-gols-chart-data";
import { IconBallFootball } from "@tabler/icons-react";
import { useParams } from "react-router-dom";
import { getListaCompleta } from "@/utils/get-lista-completa";
import LoadingSection from "@/components/loading-section";
import ErrorSection from "@/components/error-section";

export default function DetalhesPartidaPage() {
  const { partidaId } = useParams<{ partidaId: string }>();
  const { data: partida, error, isLoading } = useGetPartidaByID(partidaId!);
  const { data: jogadoresInfos } = useGetAllNamesJogadores();

  if (isLoading) {
    return <LoadingSection />;
  }

  if (error || !partida) {
    return <ErrorSection />;
  }

  if (!jogadoresInfos || !partida) return null;


  // const chartData = getGolsChartData(
  //   partida.jogadoresEstatisticas,
  //   jogadoresNames
  // );

  // const listaEstatisticas = getListaCompleta(
  //   partida.jogadoresEstatisticas,
  //   jogadoresInfos
  // );

  return (
    <div className="mt-8 container mx-auto px-8 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold mb-1 text-center">
          Detalhes da Partida
        </h1>

        <h2 className="text-xl font-medium mb-4 text-center text-gray-300">
          {formatDate(partida.dataPartida)} - {partida.local}
        </h2>

        <div className="flex justify-center gap-6 items-center p-4 rounded-lg shadow-sm">
          <div className="text-center">
            <p className="text-3xl font-bold flex items-center justify-center gap-1">
              <IconBallFootball size={24} />
              {partida.resumoPartida.golsTotais}
            </p>
            <p className="text-sm text-gray-500">Gols Totais</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">
              {partida.resumoPartida.jogadoresTotais}
            </p>
            <p className="text-sm text-gray-500">Jogadores</p>
          </div>
        </div>
      </header>
      <SectionMvps
        artilheiro={partida.resumoPartida.artilheiro}
        artilheiroFotoUrl={jogadoresInfos[partida.resumoPartida.artilheiro?.jogadorId ?? ""]?.fotoUrl ?? null}
        assistente={partida.resumoPartida.maiorAssistente}
        assistenteFotoUrl={jogadoresInfos[partida.resumoPartida.maiorAssistente?.jogadorId ?? ""]?.fotoUrl ?? null}
        bagre={partida.resumoPartida.bagre}
        bagreFotoUrl={jogadoresInfos[partida.resumoPartida.bagre?.jogadorId ?? ""]?.fotoUrl ?? null}
      />

      {/* <GolsChart data={chartData} />

      <ListaJogadoresPartida
        listaEstatisticas={listaEstatisticas}
      /> */}

    </div>
  );
}
