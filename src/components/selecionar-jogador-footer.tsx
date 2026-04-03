import LoadingButton from "./loading-button";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface SelecionarJogadoresFooterProps {
  isFirstStep: boolean;
  isLastStep: boolean;
  canAdvance: boolean;
  isPending: boolean;
  handleEtapaAnterior: () => void;
  handleProximaEtapa: () => void;
}

export default function SelecionarJogadoresFooter({
  canAdvance,
  handleEtapaAnterior,
  handleProximaEtapa,
  isFirstStep,
  isLastStep,
  isPending,
}: SelecionarJogadoresFooterProps) {
  return (
    <Card className="fixed bottom-5 shadow-lg z-10 max-w-3xl mx-auto left-4 right-4 p-4">
      <div className="flex justify-between gap-4">
        <Button
          onClick={handleEtapaAnterior}
          disabled={isFirstStep}
          variant="outline"
          className="cursor-pointer"
        >
          Voltar
        </Button>

        <LoadingButton
          onClick={handleProximaEtapa}
          disabled={!canAdvance}
          className="cursor-pointer"
          isLoading={isPending}
        >
          {isLastStep ? "Finalizar Seleção" : "Próxima Etapa"}
        </LoadingButton>
      </div>
    </Card>
  );
}
