import { useParams } from "react-router-dom";
import { useGetJogadorDetails } from "@/hooks/jogadores/use-get-jogador-by-id";
import JogadorHeaderDetalhes from "@/components/jogador-header-detalhes";


export default function DetalhesJogadorPage() {
  const { id } = useParams<{ id: string }>();
  const { data: jogador, isLoading, error } = useGetJogadorDetails(id || "");

  if (isLoading) {
    return (
      <div className="text-center p-8">Carregando detalhes do jogador...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-600">Erro: {error.message}</div>
    );
  }

  if (!jogador) {
    return <div className="text-center p-8">Jogador não encontrado.</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <JogadorHeaderDetalhes jogador={jogador} />
    </div>
  );
}
