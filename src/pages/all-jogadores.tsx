import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { useGetAllJogadores } from "@/hooks/jogadores/use-get-all-jogadores";
import { Avatar } from "@radix-ui/react-avatar";
import { IconBallFootball, IconShoe } from "@tabler/icons-react";


export default function AllJogadoresPage() {

  const {data} = useGetAllJogadores();

  return (
    <div>
      {data?.map(jogador => (
        <Card key={jogador.id} className="mb-4 p-4 flex flex-row justify-between items-center">
          <div className="flex gap-4 items-center">
            <Avatar>
              <AvatarImage src={jogador.fotoUrl ?? undefined} alt={jogador.nome} className="w-20 h-20 rounded-md" />
              <AvatarFallback>{jogador.nome.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold mb-2">{jogador.nome}</h2>
          </div>

          <div className="flex gap-8">
            <div>
              <strong>0</strong> 
              <IconBallFootball className="inline-block ml-1 mb-1" />
            </div>
            <div>
              <strong>0</strong>
              <IconShoe className="inline-block ml-1 mb-1" />
            </div>
            <div>
              <strong>0</strong> 
              <IconBallFootball className="inline-block ml-1 mb-1 text-red-700" />
            </div>
          </div>

        </Card>
      ))}

    </div>
  );
}