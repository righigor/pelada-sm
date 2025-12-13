import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface SelecionarJogadoresFooterProps {
  isFirstStep: boolean;
  isLastStep: boolean;
  canAdvance: boolean;
  handleEtapaAnterior: () => void;
  handleProximaEtapa: () => void;
}

export default function SelecionarJogadoresFooter({
  canAdvance,
  handleEtapaAnterior,
  handleProximaEtapa,
  isFirstStep,
  isLastStep,
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

        <Button disabled={!canAdvance} onClick={handleProximaEtapa} className="cursor-pointer">
          {isLastStep ? "Finalizar Seleção" : "Próxima Etapa"}
        </Button>
      </div>
    </Card>
  );
}
