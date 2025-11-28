import { ConfirmSaveStats } from "@/components/confirm-save-stats";
import JogadorCardStats from "@/components/jogador-card-stats";
import { useCreatePartida } from "@/hooks/partida/use-create-partida";
import { usePartidaStore } from "@/stores/usePartidaStore";

export interface EstatisticaKeyType {
  key: "gols" | "assistencias" | "golContra";
}

export default function RegistrarStatsPage() {
  const jogadores = usePartidaStore((state) => state.jogadoresSelecionados);
  const estatisticas = usePartidaStore((state) => state.estatisticas);
  const updateEstatistica = usePartidaStore((state) => state.updateEstatistica);

  const { mutate, isPending } = useCreatePartida();

  if (jogadores.length === 0) {
    return (
      <div className="p-8 text-center">
        Carregando dados ou redirecionando...
      </div>
    );
  }

  const handleUpdate = (
    jogadorId: string,
    estatisticaKey: EstatisticaKeyType["key"],
    value: number
  ) => {
    const currentStat = estatisticas[jogadorId]?.[estatisticaKey] || 0;
    const newStat = currentStat + value;
    console.log(
      `Atualizando ${estatisticaKey} do jogador ${jogadorId}: ${currentStat} -> ${newStat}`
    );
    updateEstatistica(jogadorId, estatisticaKey, newStat);
  };

  const handleSalvarPartida = () => {
    const data = {
      date: new Date(),
      jogadoresEstatisticas: estatisticas,
    };
    console.log("Salvar partida:", data);
    mutate(data);
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-center gap-2">
        <h2 className="text-sm md:text-lg font-semibold">
          Data: {new Date().toLocaleDateString()}
        </h2>
        <span>-</span>
        <h3 className="text-sm md:text-lg font-semibold">
          📊 Registro da Partida
        </h3>
      </div>

      <section>
        {jogadores.map((jogador) => (
          <JogadorCardStats
            key={jogador.id}
            jogador={jogador}
            handleUpdate={handleUpdate}
            estatisticas={estatisticas}
          />
        ))}
      </section>

      <ConfirmSaveStats
        handleSalvarPartida={handleSalvarPartida}
        isLoading={isPending}
      />
    </div>
  );
}
