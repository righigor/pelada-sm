import SectionMvps from "@/components/section-mvps";
import useGetAllNamesJogadores from "@/hooks/jogadores/use-get-names-jogadores";
import useGetPartidaByID from "@/hooks/partida/use-get-partida-by-id";
import { formatDate } from "@/utils/format-date";
import { getAllGols } from "@/utils/get-all-gols";
import getArtilheiro from "@/utils/get-artilheiro";
import { getAssistente } from "@/utils/get-assistente";
import { getBagre } from "@/utils/get-bagre";
import { IconBallFootball } from "@tabler/icons-react";
import { useParams } from "react-router-dom";

export default function DetalhesPartidaPage() {
  const { partidaId } = useParams<{ partidaId: string }>();
  const { data: partida, error, isLoading } = useGetPartidaByID(partidaId!);
  const { data: jogadoresNames } = useGetAllNamesJogadores();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !partida) {
    return <div>Error loading partida details</div>;
  }

  const artilheiro = getArtilheiro(partida.jogadoresEstatisticas);
  const artilheiroName =
    artilheiro && jogadoresNames ? jogadoresNames[artilheiro.jogadorId] : null;
  const assistente = getAssistente(partida.jogadoresEstatisticas);
  const assistenteName =
    assistente && jogadoresNames ? jogadoresNames[assistente.jogadorId] : null;
  const bagre = getBagre(partida.jogadoresEstatisticas);
  const bagreName =
    bagre && jogadoresNames ? jogadoresNames[bagre.jogadorId] : null;

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
              {getAllGols(partida.jogadoresEstatisticas)}
            </p>
            <p className="text-sm text-gray-500">Gols Totais</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">
              {Object.keys(partida.jogadoresEstatisticas).length}
            </p>
            <p className="text-sm text-gray-500">Jogadores</p>
          </div>
        </div>
      </header>
      <SectionMvps
        artilheiro={artilheiro} 
        artilheiroName={artilheiroName}
        assistente={assistente}
        assistenteName={assistenteName}
        bagre={bagre}
        bagreName={bagreName}
      />
    </div>
  );
}
