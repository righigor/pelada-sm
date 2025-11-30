import LastPartidaSection from "./components/last-partida-section";
import RankingCard from "./components/ranking-card";
import { useGetTopTresJogadores } from "./hooks/jogadores/use-get-top-tres-jogadores";
import { IconBallFootball } from "@tabler/icons-react";

function App() {
  const { data: golsData } = useGetTopTresJogadores("gols", 3);
  const { data: assistenciasData } = useGetTopTresJogadores("assistencias", 3);
  const { data: golContraData } = useGetTopTresJogadores("golContra", 3);

  return (
    <div className="flex flex-col gap-8">
      <section
        className="relative w-full h-[300px] md:h-[450px] bg-cover bg-center flex items-center justify-center text-center overflow-hidden top-10"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(/hero.JPG)`,
        }}
      />
      <div className="mt-8 mx-auto w-full px-10 gap-4 flex flex-col">
        <LastPartidaSection />

        <div className="border w-full  border-gray-900" />
        <div className="flex flex-col gap-6 text-center mt-4">
          <h3 className="text-lg md:text-2xl font-semibold">
            Destaques da Pelada
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <RankingCard
              data={golsData!}
              isLoading={false}
              title="Top Goleadores"
              icon={<IconBallFootball />}
              dataKey="gols"
              unit="Gols"
              color="#8884d8"
            />

            <RankingCard
              data={assistenciasData!}
              isLoading={false}
              title="Top Assistências"
              icon={<IconBallFootball />}
              dataKey="assistencias"
              unit="Assistências"
              color="#8884d8"
            />

            <RankingCard
              data={golContraData!}
              isLoading={false}
              title="Top Gols Contra"
              icon={<IconBallFootball />}
              dataKey="golContra"
              unit="Gols Contra"
              color="#8884d8"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
