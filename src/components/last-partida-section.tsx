import { useGetLastPartida } from "@/hooks/partida/use-get-last-partida";
import PartidaCard from "./partida-card";
import SkeletonLastPartida from "./skeleton/skeleton-last-partida";
import ErrorSection from "./error-section";

export default function LastPartidaSection() {
  const { data, isLoading, error } = useGetLastPartida();

  return (
    <section className="flex flex-col gap-6 mx-auto py-4 text-center shadow-lg w-full">
      <h3 className="text-lg font-semibold">Última Partida</h3>
      {error && <ErrorSection />}
      {isLoading || !data ? <SkeletonLastPartida /> : <PartidaCard partida={data} />}
    </section>
  );
}
