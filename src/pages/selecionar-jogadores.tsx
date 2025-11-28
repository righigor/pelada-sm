import { useGetAllJogadores } from "@/hooks/jogadores/use-get-all-jogadores";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import type { JogadorResponseType } from "@/types/jogadores/Jogador";
import JogadorItemSelecionar from "@/components/jogador-item-selecionar";
import { usePartidaStore } from "@/stores/usePartidaStore";
import { Button } from "@/components/ui/button";

export default function SelecionarJogadoresPage() {
  const MAX_JOGADORES = 24;
  const navigate = useNavigate();
  const [selecionados, setSelecionados] = useState<JogadorResponseType[]>([]);
  const { data: todosJogadores } = useGetAllJogadores();

  const setJogadoresSelecionados = usePartidaStore(
    (state) => state.setJogadoresSelecionados
  );

  const handleToggleJogador = (jogador: JogadorResponseType) => {
    setSelecionados((prev) => {
      const isSelected = prev.find((p) => p.id === jogador.id);

      if (isSelected) {
        return prev.filter((p) => p.id !== jogador.id);
      } else if (prev.length < MAX_JOGADORES) {
        return [...prev, jogador];
      }
      return prev;
    });
  };

  const handleProximaEtapa = () => {
    if (selecionados.length === 0) return;
    setJogadoresSelecionados(selecionados);
    navigate("/partida/registrar-stats");
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center mb-6 flex-col md:flex-row gap-4">
        <h2 className=" text-sm md:text-xl font-semibold">⚽ Seleção da Pelada</h2>
        <p className="text-gray-300 text-xs md:text-lg">Você já selecionou {selecionados.length} jogadores.</p>

      </div>
      {todosJogadores?.map((jogador) => {
        const isSelected =
          selecionados.find((s) => s.id === jogador.id) !== undefined;
        const isDisabled = selecionados.length >= MAX_JOGADORES && !isSelected;

        return (
          <JogadorItemSelecionar
            key={jogador.id}
            jogador={jogador}
            isSelected={isSelected}
            onToggle={handleToggleJogador}
            isDisabled={isDisabled}
          />
        );
      })}

      <Button
        disabled={selecionados.length === 0}
        onClick={handleProximaEtapa}
        className="cursor-pointer"
      >
        Próxima etapa
      </Button>
    </div>
  );
}
