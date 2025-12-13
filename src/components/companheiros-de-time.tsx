import useGetAllNamesJogadores from "@/hooks/jogadores/use-get-names-jogadores";
import type { JogadorDetails } from "@/queries/jogadores/get-jogador-by-id";
import { getCompanheirosList } from "@/utils/get-companheiros-list";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { IconUsers } from "@tabler/icons-react";

interface CompanheirosDeTimeProps {
  jogador: JogadorDetails;
}

export default function CompanheirosDeTime({
  jogador,
}: CompanheirosDeTimeProps) {
  const { data: jogadoresInfo, isPending } = useGetAllNamesJogadores();

  if (isPending) {
    return <div>Carregando companheiros de time...</div>;
  }

  const companheirosList = getCompanheirosList(
    jogador.companheiros,
    jogadoresInfo
  );

  return (
    <Card className="md:p-4">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center text-md md:text-xl font-semibold">
          <IconUsers className="size-4 md:size-6 mr-2 text-primary" />
          Mais vezes no mesmo time
        </CardTitle>
        <CardDescription className="text-center text-xs">
          Jogadores que mais vezes jogaram no mesmo time que{" "}
          <span className="font-medium">{jogador.nome}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {companheirosList.map((companheiro, index) => (
            <li
              key={companheiro.id}
              className="flex justify-between items-center p-3 border-b last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <span className="font-bold w-6 text-center text-lg text-gray-600">
                  {index + 1}
                </span>
                <span className="font-medium">{companheiro.nome}</span>
              </div>

              <div className="flex items-center justify-center gap-1">
                <span className="font-bold">
                  {companheiro.partidasJuntas}
                </span>
                <span className="text-xs">
                  {companheiro.partidasJuntas > 1 ? "vezes" : "vez"}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
