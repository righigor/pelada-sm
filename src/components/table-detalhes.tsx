import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IconShoe, IconMoodSad, IconBallFootball } from "@tabler/icons-react";
import AvatarLoad from "@/components/avatar-load";
import type { JogadorEstatisticaCompleta } from "@/types/jogadores/Jogador";

interface TableDetalhesProps {
  listaEstatisticas: JogadorEstatisticaCompleta[];
}

export default function TableDetalhes({ listaEstatisticas }: TableDetalhesProps) {
  return (
    <Table className="w-full table-auto border rounded-2xl">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] text-center">#</TableHead>
              <TableHead className="w-[50px] text-center">Foto</TableHead>{" "}
              {/* ⭐️ Nova Coluna */}
              <TableHead>Nome</TableHead>
              <TableHead className="text-center">
                <IconBallFootball
                  size={16}
                  className="inline mr-1 text-green-600"
                />{" "}
                Gols
              </TableHead>
              <TableHead className="text-center">
                <IconShoe size={16} className="inline mr-1 text-blue-600" />{" "}
                Ass.
              </TableHead>
              <TableHead className="text-center">
                <IconMoodSad size={16} className="inline mr-1 text-red-600" />{" "}
                G.C.
              </TableHead>
              {/* Coluna Pts Removida */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {listaEstatisticas.map((jogador, index) => (
              <TableRow
                key={jogador.id}
                className={index < 3 ? "" : ""}
              >
                <TableCell className="text-center">
                  {index === 0 && "🥇"}
                  {index === 1 && "🥈"}
                  {index === 2 && "🥉"}
                  {index >= 3 && index + 1}
                </TableCell>

                {/* ⭐️ Célula da Foto */}
                <TableCell className="text-center">
                  <AvatarLoad
                    jogador={{
                      nome: jogador.nome,
                      fotoUrl: jogador.fotoUrl,
                    }} // 'as any' para compatibilidade com o tipo JogadorInfo
                    avatarSizeClasses="w-8 h-8 mx-auto"
                  />
                </TableCell>

                <TableCell className="font-medium">{jogador.nome}</TableCell>
                <TableCell className="text-center text-green-700">
                  {jogador.gols}
                </TableCell>
                <TableCell className="text-center text-blue-700">
                  {jogador.assistencias}
                </TableCell>
                <TableCell className="text-center text-red-700">
                  {jogador.golContra}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
  )
}