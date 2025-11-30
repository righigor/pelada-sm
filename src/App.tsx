import LastPartidaSection from "./components/last-partida-section";

function App() {
  

  return (
    <div className="flex flex-col gap-8">
      <section
        className="relative w-full h-[300px] md:h-[450px] bg-cover bg-center flex items-center justify-center text-center overflow-hidden top-10"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(/hero.JPG)`,
        }}
      />
      <div className="mt-8 mx-auto w-full max-w-4xl px-4">
        <LastPartidaSection />
      </div>
    </div>
  );
}

export default App;
