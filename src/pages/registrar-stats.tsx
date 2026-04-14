import { ConfirmSaveStats } from "@/components/confirm-save-stats";
import JogadorCardStats from "@/components/jogador-card-stats";
import TimerDisplay from "@/components/timer-display";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { CorTime } from "@/types/Partida";
import type { JogadorNewResponseType } from "@/types/jogadores/Jogador";
import type { PartidaKey } from "@/types/PartidaStore";
import useGetPartidaByID from "@/hooks/partida/use-get-partida-by-id";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateStats } from "@/hooks/partida/use-update-stats";
import { formatarData } from "@/utils/formatar-data";
import { TimeHeaderCard } from "@/components/time-header-card";
import { useUpdateVitorias } from "@/hooks/partida/use-update-vitorias";
import LoadingSection from "@/components/loading-section";
import NotFoundPage from "@/components/not-found";
import { useFinalizePartida } from "@/hooks/partida/use-finaliza-partida";
import { PARTIDA_STATUS } from "@/utils/constants";

type EstatisticaKeyType = "gols" | "assistencias" | "golsContra" | "dd";

const colorEmojiMap: { [key: string]: string } = {
  azul: "🔵",
  preto: "⚫",
  branco: "⚪",
  vermelho: "🔴",
  goleiros: "🧤",
};

export default function RegistrarStatsPage() {
  const navigate = useNavigate();
  const { partidaId } = useParams();
  const { data: partida, isPending: isPartidaPending } = useGetPartidaByID(
    partidaId || ""
  );
  const { mutate } = useUpdateStats(partidaId || "");
  const { mutate: mutateVitorias } = useUpdateVitorias(partidaId || "");
  const { mutate: mutateFinalize, isPending: isFinalizePending } =
    useFinalizePartida();

  if (!partidaId) {
    return (
      <div className="container mx-auto px-8 py-12">
        Partida ID is required.
      </div>
    );
  }
  if (isPartidaPending) {
    return <LoadingSection />;
  }

  if (!partida && !isPartidaPending) {
    return <NotFoundPage />;
  }

  if (partida.status === PARTIDA_STATUS.FINALIZADO) {
    navigate(`/partida/${partidaId}`);
    return null;
  }

  const handleFinalizar = () => {
    if (partida) {
      mutateFinalize(partida);
    }
  };

  const handleUpdate = (
    partidaKey: PartidaKey,
    jogadorId: string,
    estatisticaKey: EstatisticaKeyType,
    value: number
  ) => {
    mutate({
      time: partidaKey,
      jogadorId,
      campo: estatisticaKey,
      valor: value,
    });
  };

  const getLabel = (key: CorTime | "goleiros") => {
    const emoji = colorEmojiMap[key] || "⚽";

    let labelText;
    if (key === "goleiros") {
      labelText = "Goleiros";
    } else {
      labelText = `Time ${key.charAt(0).toUpperCase() + key.slice(1)}`;
    }

    return `${emoji} ${labelText}`;
  };

  return (
    <div className="container mx-auto px-8 py-12">
      <TimerDisplay />

      <div className="mb-4 flex items-center justify-center gap-2">
        <h2 className="text-sm md:text-lg font-semibold">
          Data: {formatarData(partida.dataPartida) || "Data não disponível"}
        </h2>
        <span>-</span>
        <h3 className="text-sm md:text-lg font-semibold">
          📊 Registro da Partida
        </h3>
      </div>

      <section className="mb-10">
        <Accordion type="single" collapsible className="w-full">
          {Object.entries(partida.timesEstatisticas ?? {}).map(
            ([key, timeData]) => {
              const partidaKey = key as PartidaKey;
              const jogadoresArray = Object.values(timeData.jogadores || {});
              if (jogadoresArray.length === 0) return null;
              const label = getLabel(partidaKey as CorTime | "goleiros");
              return (
                <AccordionItem key={key} value={key}>
                  <AccordionTrigger className="text-base md:text-lg font-semibold capitalize cursor-pointer">
                    {label}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-4">
                      {key === "goleiros" ? null : (
                        <TimeHeaderCard
                          vitorias={timeData.vitorias || 0}
                          onUpdate={(valor) => {
                            mutateVitorias({ time: partidaKey, valor });
                          }}
                        />
                      )}
                      {Object.entries(timeData.jogadores || {}).map(
                        ([id, stats]) => (
                          <JogadorCardStats
                            key={id}
                            partidaKey={partidaKey}
                            jogador={
                              {
                                id: id,
                                nome: stats.nome,
                              } as JogadorNewResponseType
                            }
                            estatisticas={stats}
                            handleUpdate={(time, jogadorId, campo, valor) =>
                              handleUpdate(time, jogadorId, campo, valor)
                            }
                          />
                        )
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            }
          )}
        </Accordion>
      </section>

      <ConfirmSaveStats
        handleSalvarPartida={handleFinalizar}
        isLoading={isFinalizePending}
      />
    </div>
  );
}
