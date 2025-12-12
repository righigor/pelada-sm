import MvpCard from "./mvp-card";
import { IconBallFootball, IconShoe, IconFish } from "@tabler/icons-react";
import type { DestaquePartida } from "@/types/destaques/Destaque";

interface SectionMvpsProps {
  artilheiro: DestaquePartida | null;
  artilheiroFotoUrl?: string | null;
  assistente: DestaquePartida | null;
  assistenteFotoUrl?: string | null;
  bagre: DestaquePartida | null;
  bagreFotoUrl?: string | null;
}

export default function SectionMvps({
  artilheiro,
  artilheiroFotoUrl,
  assistente,
  assistenteFotoUrl,
  bagre,
  bagreFotoUrl,
}: SectionMvpsProps) {


  return (
    <section className="mx-auto border bg-blue-950/35 p-4 rounded-lg mb-8 flex flex-col gap-6 items-center">
      <h3 className="text-xl font-semibold">Destaques da pelada</h3>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 ">
        <MvpCard
          title="Artilheiro"
          icon={<IconBallFootball />}
          name={artilheiro?.nome ?? "N/A"}
          fotoUrl={artilheiroFotoUrl ?? null}
          stat={artilheiro?.stat ?? null}
          type="gols"
          fallbackMessage="Nenhum gol marcado"
        />
        <MvpCard
          title="Maior Assistente"
          icon={<IconShoe />}
          name={assistente?.nome ?? "N/A"}
          fotoUrl={assistenteFotoUrl ?? null}
          stat={assistente?.stat ?? null}
          type="assistencias"
          fallbackMessage="Nenhuma assistência registrada"
        />
        <MvpCard
          title="Maior Bagre"
          icon={<IconFish />}
          name={bagre?.nome ?? "N/A"}
          fotoUrl={bagreFotoUrl ?? null}
          stat={bagre?.stat ?? null}
          type="gols contra"
          fallbackMessage="Ninguém foi bagre hoje"
        />
      </div>
    </section>
  );
}
