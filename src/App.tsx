function App() {
  return (
    
    <section 
      className="relative w-full h-[300px] md:h-[450px] bg-cover bg-center flex items-center justify-center text-center overflow-hidden top-10"
      style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(/hero.JPG)` }}
    >
      {/* Overlay para escurecer a imagem e melhorar a leitura do texto */}
      <div className="absolute inset-0 bg-black opacity-40"></div> 
      
      {/* Conteúdo do Hero */}
      {/* <div className="relative z-10 p-4 max-w-2xl mx-auto text-white">
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4 animate-fade-in-up">
          {title}
        </h1>
        <p className="text-lg md:text-xl mb-8 animate-fade-in-up delay-200">
          {description}
        </p>
        <Button 
          onClick={handleButtonClick} 
          className="px-8 py-3 text-lg md:text-xl bg-blue-600 hover:bg-blue-700 transition-colors duration-300 shadow-lg animate-fade-in-up delay-400"
        >
          {buttonText}
        </Button>
      </div> */}
    </section>
  );
}

export default App
