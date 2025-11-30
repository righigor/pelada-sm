import AdminPartidaCard from "@/components/admin-partida-card";
import SkeletonCard from "@/components/skeleton/skeleton-card";
import { useGetAllPartidas } from "@/hooks/partida/use-get-all-partidas";

export default function AdminAllPartidasPage() {
  const { data, isPending } = useGetAllPartidas();

  return (
    <div className="flex flex-col mt-8 container mx-auto px-8 py-8">
      <h2 className="text-xl font-bold mb-4 text-center md:text-2xl">
        Todas as Partidas
      </h2>
      <section>
        {isPending && <SkeletonCard />}
        {data?.map((partida) => (
          <AdminPartidaCard key={partida.id} partida={partida} />
        ))}
      </section>
    </div>
  );
}
