import { ConfirmSaveStats } from "@/components/confirm-save-stats";
import JogadorCardStats from "@/components/jogador-card-stats";
import TimerDisplay from "@/components/timer-display";
import { useCreatePartida } from "@/hooks/partida/use-create-partida";
import { usePartidaStore } from "@/stores/usePartidaStore";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { CorTime } from "@/types/Partida";
import type { JogadorResponseType } from "@/types/jogadores/Jogador";

type EstatisticaKeyType = "gols" | "assistencias" | "golContra";

const colorEmojiMap: { [key: string]: string } = {
  azul: "🔵",
  preto: "⚫",
  branco: "⚪",
  vermelho: "🔴",
  goleiros: "🧤",
};

const ALL_PARTIDA_GROUPS: (CorTime | "goleiros")[] = [
  "azul",
  "preto",
  "branco",
  "vermelho",
  "goleiros",
];

export default function RegistrarStatsPage() {
  const timesSelecionados = usePartidaStore((state) => state.timesSelecionados);
  const estatisticasInput = usePartidaStore((state) => state.estatisticasInput);
  const updateEstatistica = usePartidaStore((state) => state.updateEstatistica);

  const { mutate, isPending } = useCreatePartida();

  if (
    !timesSelecionados ||
    Object.values(timesSelecionados).flat().length === 0
  ) {
    return (
      <div className="p-8 text-center">
        Carregando dados ou redirecionando...
      </div>
    );
  }

  const handleUpdate = (
    timeCor: CorTime,
    jogadorId: string,
    estatisticaKey: EstatisticaKeyType,
    value: number
  ) => {
    // O valor passado é o incremento/decremento (+1 ou -1)
    const currentStat =
      estatisticasInput?.[timeCor]?.jogadores[jogadorId]?.[estatisticaKey] || 0;
    const newStat = Math.max(0, currentStat + value); // Garante que o placar não é negativo

    updateEstatistica(timeCor, jogadorId, estatisticaKey, newStat);
  };

  const handleSalvarPartida = () => {
    const data = {
      date: new Date(),
      jogadoresEstatisticas: estatisticas,
    };
    console.log("Salvar partida:", data);
    mutate(data);
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
          Data: {new Date().toLocaleDateString()}
        </h2>
        <span>-</span>
        <h3 className="text-sm md:text-lg font-semibold">
          📊 Registro da Partida
        </h3>
      </div>

      <section className="mb-10">
        <Accordion type="single" collapsible className="w-full">
          {ALL_PARTIDA_GROUPS.map((key) => {
            const jogadoresDoTime: JogadorResponseType[] =
              timesSelecionados[key] || [];

            if (jogadoresDoTime.length === 0) return null;

            const label = getLabel(key);

            return (
              <AccordionItem key={key} value={key}>
                <AccordionTrigger className="text-base md:text-lg font-semibold capitalize cursor-pointer">
                  {label}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col ">
                    {jogadoresDoTime.map((jogador) => (
                      <JogadorCardStats
                        key={jogador.id}
                        jogador={jogador}
                        estatisticas={{}}
                        handleUpdate={handleUpdate}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </section>

      <ConfirmSaveStats
        handleSalvarPartida={handleSalvarPartida}
        isLoading={isPending}
      />
    </div>
  );
}
