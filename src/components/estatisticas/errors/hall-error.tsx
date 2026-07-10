interface HallErrorProps {
  message?: string;
}

export default function HallError({ message }: HallErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-8 text-center">
      <p className="text-sm text-muted-foreground">
        {message || "Nenhum dado disponível para exibir."}
      </p>
    </div>
  );
}
