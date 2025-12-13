import { useGetAllJogadores } from "@/hooks/jogadores/use-get-all-jogadores";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { JogadorResponseType } from "@/types/jogadores/Jogador";
import JogadorItemSelecionar from "@/components/jogador-item-selecionar";
import { usePartidaStore } from "@/stores/usePartidaStore";
import { JOGADORES_POR_TIME } from "@/types/Partida";
import { Separator } from "@/components/ui/separator";
import SelecionadorJogadorHeader from "@/components/selecionador-jogador-header";
import SelecionarJogadoresFooter from "@/components/selecionar-jogador-footer";
import type { PartidaKey } from "@/types/PartidaStore";

export const MAX_GOLEIROS = 2;
export const STEPS = [
  "azul",
  "preto",
  "branco",
  "vermelho",
  "goleiros",
] as const;
export type StepType = (typeof STEPS)[number];

export default function SelecionarJogadoresPage() {
  const { data: todosJogadores } = useGetAllJogadores();
  const navigate = useNavigate();

  const setTimesSelecionados = usePartidaStore(
    (state) => state.setTimesSelecionados
  );

  const [currentStep, setCurrentStep] = useState<StepType>("azul");
  const [times, setTimes] = useState<Record<PartidaKey, JogadorResponseType[]>>(
    {
      azul: [],
      preto: [],
      branco: [],
      vermelho: [],
      goleiros: [],
    }
  );

  const todosSelecionados = useMemo(() => {
    return Object.values(times).flat();
  }, [times]);

  const jogadoresDisponiveis = useMemo(() => {
    if (!todosJogadores) return [];
    return todosJogadores.filter(
      (jogador) =>
        !todosSelecionados.find((s) => s.id === jogador.id) ||
        times[currentStep].find((s) => s.id === jogador.id)
    );
  }, [todosJogadores, todosSelecionados, currentStep, times]);

  const handleToggleJogador = (jogador: JogadorResponseType) => {
    setTimes((prevTimes) => {
      const timeAtual = prevTimes[currentStep];
      const isSelectedForCurrentTime = timeAtual.find(
        (j) => j.id === jogador.id
      );

      let novoTimeAtual;
      if (isSelectedForCurrentTime) {
        novoTimeAtual = timeAtual.filter((j) => j.id !== jogador.id);
      } else {
        const max =
          currentStep === "goleiros" ? MAX_GOLEIROS : JOGADORES_POR_TIME;
        if (timeAtual.length < max) {
          novoTimeAtual = [...timeAtual, jogador];
        } else {
          return prevTimes;
        }
      }
      return {
        ...prevTimes,
        [currentStep]: novoTimeAtual,
      };
    });
  };

  const handleProximaEtapa = () => {
    const currentIndex = STEPS.indexOf(currentStep as StepType);

    if (currentIndex < STEPS.length - 1) {
      const next = STEPS[currentIndex + 1] as StepType;
      setCurrentStep(next);
    } else {
      setTimesSelecionados(times);
      navigate("/partida/registrar-stats");
      console.log("Times Selecionados:", times);
    }
  };

  const handleEtapaAnterior = () => {
    const currentIndex = STEPS.indexOf(currentStep as StepType);
    if (currentIndex > 0) {
      const previous = STEPS[currentIndex - 1] as StepType;
      setCurrentStep(previous);
    }
  };

  const timeAtualLabel =
    currentStep === "goleiros"
      ? "Goleiros"
      : `Time ${currentStep.charAt(0).toUpperCase() + currentStep.slice(1)}`;

  const limiteMaximo =
    currentStep === "goleiros" ? MAX_GOLEIROS : JOGADORES_POR_TIME;
  const jogadoresNoTime = times[currentStep].length;
  const isLastStep = currentStep === "goleiros";
  const isFirstStep = currentStep === "azul";

  const canAdvance = isLastStep ? true : jogadoresNoTime === JOGADORES_POR_TIME;

  return (
    <div className="flex flex-col gap-6 container mx-auto px-4 md:px-8 py-8">
      <h2 className="text-xl font-semibold text-center mt-4">
        ⚽ Seleção da Pelada
      </h2>
      <Separator />

      <SelecionadorJogadorHeader
        timeAtualLabel={timeAtualLabel}
        jogadoresNoTime={jogadoresNoTime}
        limiteMaximo={limiteMaximo}
      />

      <div className="flex flex-col gap-3">
        {jogadoresDisponiveis.map((jogador) => {
          const isSelectedForCurrentTime = times[currentStep].some(
            (s) => s.id === jogador.id
          );

          const isAlreadyAssigned =
            todosSelecionados.some((s) => s.id === jogador.id) &&
            !isSelectedForCurrentTime;

          const isTeamFull =
            jogadoresNoTime >= limiteMaximo && !isSelectedForCurrentTime;

          const isDisabled = isAlreadyAssigned || isTeamFull;

          return (
            <JogadorItemSelecionar
              key={jogador.id}
              jogador={jogador}
              isSelected={isSelectedForCurrentTime}
              onToggle={handleToggleJogador}
              isDisabled={isDisabled}
            />
          );
        })}
      </div>

      <SelecionarJogadoresFooter
        canAdvance={canAdvance}
        handleEtapaAnterior={handleEtapaAnterior}
        handleProximaEtapa={handleProximaEtapa}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
      />
    </div>
  );
}
