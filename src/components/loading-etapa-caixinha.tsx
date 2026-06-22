import { CardContent } from "./ui/card";

interface LoadingEtapaCaixinhaProps {
  isGerandoPix: boolean;
}

export default function LoadingEtapaCaixinha({ isGerandoPix }: LoadingEtapaCaixinhaProps) {
  return (
    <CardContent className="py-12 flex flex-col items-center justify-center space-y-4">
      <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      {isGerandoPix ? (
        <p className="text-sm font-medium text-slate-600">
          Gerando seu Pix... Quase lá!
        </p>
      ) : (
        <p className="text-sm font-medium text-slate-600">
          Carregando...
        </p>
      )}
    </CardContent>
  );
}
