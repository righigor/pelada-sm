import { Button } from "@/components/ui/button";

export default function PremiacoesPage() {
  return (
    <div className="mt-8 container mx-auto px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Premiações da Pelada</h1>

        <Button>
          Criar Premiação
        </Button>
      </div>
    </div>
  )
}