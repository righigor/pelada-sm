import type { JogadorEstatisticaCompleta } from "@/types/jogadores/Jogador";
import JogadorCard from "./jogador-card";

interface ListaJogadorePartidaProps {
  listaEstatisticas: JogadorEstatisticaCompleta[];
}

export default function ListaJogadorePartida({ listaEstatisticas }: ListaJogadorePartidaProps) {

  return (
    <section className="pt-8">
        <h3 className="text-2xl font-semibold mb-4 pb-2 text-center">
          Classificação da Partida
        </h3>

        {listaEstatisticas.map((jogador) => (
          <JogadorCard key={jogador.id} jogador={jogador} />
        ))}
      </section>
  );
}