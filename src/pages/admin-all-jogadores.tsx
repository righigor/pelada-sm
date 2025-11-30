import AdminJogadorCard from "@/components/admin-jogador-card";
import { useGetAllJogadores } from "@/hooks/jogadores/use-get-all-jogadores";

export default function AdminAllJogadoresPage() {
  const { data: jogadores, isLoading, error } = useGetAllJogadores();

  if (isLoading) {
    return (
      <div className="text-center p-8">Carregando lista de jogadores...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-600">
        Erro ao carregar jogadores: {error.message}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-12 mt-10">
      <h1 className="text-sm text-center md:text-3xl font-bold mb-6 border-b pb-2">
        🖼️ Gerenciamento de Fotos de Perfil
      </h1>

      <div className="space-y-4">
        {jogadores && jogadores.length > 0 ? (
          jogadores.map((jogador) => (
            <AdminJogadorCard key={jogador.id} jogador={jogador} />
          ))
        ) : (
          <p className="text-center text-gray-500">
            Nenhum jogador cadastrado ainda.
          </p>
        )}
      </div>
    </div>
  );
}
