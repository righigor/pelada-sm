import type { JogadorResponseType } from "@/types/jogadores/Jogador";
import JogadorCard from "./jogador-card";

interface ListaJogadoresPartidaProps {
  listaEstatisticas: JogadorResponseType[];
}

export default function ListaJogadoresPartida({ listaEstatisticas }: ListaJogadoresPartidaProps) {
  return (
    <section className="pt-8">
        <h3 className="text-2xl font-semibold mb-4 pb-2 text-center">
          Estatísticas dos Jogadores
        </h3>

        {listaEstatisticas.map((jogador) => (
          <JogadorCard key={jogador.id} jogador={jogador} />
        ))}
      </section>
  );
}