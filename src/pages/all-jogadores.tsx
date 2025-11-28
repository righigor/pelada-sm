import JogadorCard from "@/components/jogador-card";
import SkeletonCard from "@/components/skeleton/skeleton-card";
import { useGetAllJogadores } from "@/hooks/jogadores/use-get-all-jogadores";

export default function AllJogadoresPage() {
  const { data, isPending } = useGetAllJogadores();

  return (
    <div className="flex flex-col mt-8 container mx-auto px-8 py-8">
      <h2 className="text-xl font-bold mb-4 text-center md:text-2xl">
        Todos os Jogadores
      </h2>
      <section>
        {isPending && <SkeletonCard />}
        {data?.map((jogador) => (
          <JogadorCard key={jogador.id} jogador={jogador} />
        ))}
      </section>
    </div>
  );
}
