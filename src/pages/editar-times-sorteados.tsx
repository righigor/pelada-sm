/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useGetPartidaByID from "@/hooks/partida/use-get-partida-by-id";
import { useGetAllJogadores } from "@/hooks/jogadores/use-get-all-jogadores";
import type { PartidaKey } from "@/types/PartidaStore";
import type {
  JogadorEstatistica,
  TimeData,
} from "@/types/partida/Estatisticas";
import { QuadroEdicaoTimes } from "@/components/quadro-edicoes-times";
import { ChevronLeft, Save } from "lucide-react";
import { toast } from "sonner";
import { useUpdateTimesPartida } from "@/hooks/partida/use-update-times-partida";
import LoadingButton from "@/components/loading-button";
import SkeletonEditarTimes from "@/components/skeleton/skeleton-editar-time";

export default function EditarTimesSorteadosPage() {
  const { partidaId } = useParams();
  const navigate = useNavigate();
  const [times, setTimes] = useState<Record<PartidaKey, TimeData> | null>(null);
  const { data: partida, isPending: loadingPartida } = useGetPartidaByID(
    partidaId!
  );
  const { data: listaAtletas } = useGetAllJogadores();
  const { mutate: salvarTimes, isPending: isSaving } = useUpdateTimesPartida(
    partidaId!
  );

  useEffect(() => {
    if (partida?.timesEstatisticas && !times) {
      setTimes(partida.timesEstatisticas);
    }
  }, [partida, times]);

  if (loadingPartida) {
    return <SkeletonEditarTimes />;
  }

  const handleSave = () => {
    if (times) {
      salvarTimes(times);
    }
  };

  const removerJogador = (timeKey: PartidaKey, jogadorId: string) => {
    if (!times) return;
    const novosTimes = { ...times };
    const { [jogadorId]: removido, ...jogadoresRestantes } =
      novosTimes[timeKey].jogadores;
    novosTimes[timeKey] = {
      ...novosTimes[timeKey],
      jogadores: jogadoresRestantes,
    };

    setTimes(novosTimes);
    toast.info("Jogador removido da lista.");
  };

  const adicionarJogador = (timeKey: PartidaKey, atletaId: string) => {
    if (!times || !listaAtletas) return;
    const atletaBase = listaAtletas.find((a) => a.id === atletaId);
    if (!atletaBase) return;
    const novoJogador: JogadorEstatistica = {
      nome: atletaBase.nome,
      gols: 0,
      assistencias: 0,
      golsContra: 0,
      dd: 0,
    };
    setTimes({
      ...times,
      [timeKey]: {
        ...times[timeKey],
        jogadores: {
          ...times[timeKey].jogadores,
          [atletaId]: novoJogador,
        },
      },
    });
  };

  return (
    <div className="flex flex-col mt-8 container mx-auto px-8 py-8 gap-4">
      <Card className="p-4 rounded-xl shadow-sm border">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Editar Escalação</h1>
          </div>
        </div>
        <LoadingButton isLoading={isSaving} onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" /> Salvar Alterações
        </LoadingButton>
      </Card>

      <QuadroEdicaoTimes
        times={times!}
        setTimes={setTimes}
        listaAtletas={listaAtletas!}
        removerJogador={removerJogador}
        adicionarJogador={adicionarJogador}
      />
    </div>
  );
}
