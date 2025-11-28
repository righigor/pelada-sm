import type { Artilheiro } from "@/utils/get-artilheiro";
import MvpCard from "./mvp-card";
import { IconBallFootball, IconShoe, IconFish } from "@tabler/icons-react";
import type { JogadorNameMap } from "@/types/jogadores/Jogador";

interface SectionMvpsProps {
  artilheiroName: JogadorNameMap[string] | null;
  artilheiro: Artilheiro | null;
  assistenteName: JogadorNameMap[string] | null;
  assistente: Artilheiro | null;
  bagreName: JogadorNameMap[string] | null;
  bagre: Artilheiro | null;
}

export default function SectionMvps({
  artilheiroName,
  artilheiro,
  assistenteName,
  assistente,
  bagreName,
  bagre,
}: SectionMvpsProps) {


  return (
    <section className="mx-auto border bg-blue-950/35 p-4 rounded-lg mb-8 flex flex-col gap-6 items-center">
      <h3 className="text-xl font-semibold">Destaques da pelada</h3>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 ">
        <MvpCard
          title="Artilheiro"
          icon={<IconBallFootball />}
          name={artilheiroName?.nome ?? "N/A"}
          fotoUrl={artilheiroName?.fotoUrl ?? null}
          stat={artilheiro?.stat ?? null}
          type="gols"
          fallbackMessage="Nenhum gol marcado"
        />
        <MvpCard
          title="Maior Assistente"
          icon={<IconShoe />}
          name={assistenteName?.nome ?? "N/A"}
          fotoUrl={assistenteName?.fotoUrl ?? null}
          stat={assistente?.stat ?? null}
          type="assistencias"
          fallbackMessage="Nenhuma assistência registrada"
        />
        <MvpCard
          title="Maior Bagre"
          icon={<IconFish />}
          name={bagreName?.nome ?? "N/A"}
          fotoUrl={bagreName?.fotoUrl ?? null}
          stat={bagre?.stat ?? null}
          type="gols contra"
          fallbackMessage="Ninguém foi bagre hoje"
        />
      </div>
    </section>
  );
}
