export default function HeroError() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-8 text-center">
      <p className="text-sm text-muted-foreground">
        Nenhuma partida encontrada para calcular as estatísticas.
      </p>
    </div>
  );
}
