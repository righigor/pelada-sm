import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllJogadores } from "@/hooks/jogadores/use-get-all-jogadores";
import { useUpdateJogadorStatus } from "@/hooks/jogadores/use-update-jogador-status";
import type { JogadorStatus } from "@/types/jogadores/Jogador";
import { getStatusLabel, getStatusVariant } from "@/utils/jogador/status";


export default function AdminJogadoresPage() {
  const { data: jogadores = [], isLoading, error } = useGetAllJogadores();

  const {
    mutate: atualizarStatus,
    isPending: isUpdating,
    variables,
  } = useUpdateJogadorStatus();

  function handleStatusChange(jogadorId: string, status: JogadorStatus) {
    atualizarStatus({
      jogadorId,
      status,
    });
  }

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <Card>
          <CardContent className="flex min-h-60 items-center justify-center">
            <p className="text-sm text-muted-foreground">
              Carregando jogadores...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <Card>
          <CardContent className="flex min-h-60 items-center justify-center">
            <p className="text-sm text-destructive">
              Erro ao carregar jogadores.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-1">
            <CardTitle>Gerenciar jogadores</CardTitle>

            <p className="text-sm text-muted-foreground">
              Altere o status dos jogadores da pelada.
            </p>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Jogador</TableHead>

                  <TableHead className="hidden sm:table-cell">
                    Status atual
                  </TableHead>

                  <TableHead className="w-[180px] text-right">
                    Alterar status
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {jogadores.map((jogador) => {
                  const isUpdatingJogador =
                    isUpdating && variables?.jogadorId === jogador.id;

                  return (
                    <TableRow key={jogador.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {jogador.fotoUrl ? (
                            <img
                              src={jogador.fotoUrl}
                              alt={jogador.nome}
                              className="size-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted font-semibold">
                              {jogador.nome?.charAt(0).toUpperCase()}
                            </div>
                          )}

                          <div className="min-w-0">
                            <p className="truncate font-medium">
                              {jogador.nome}
                            </p>

                            {jogador.telefone && (
                              <p className="truncate text-xs text-muted-foreground">
                                {jogador.telefone}
                              </p>
                            )}

                            <div className="mt-1 sm:hidden">
                              <Badge variant={getStatusVariant(jogador.status)}>
                                {getStatusLabel(jogador.status)}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="hidden sm:table-cell">
                        <Badge variant={getStatusVariant(jogador.status)}>
                          {getStatusLabel(jogador.status)}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <div className="flex justify-end">
                          <Select
                            value={jogador.status}
                            disabled={isUpdatingJogador}
                            onValueChange={(value) =>
                              handleStatusChange(
                                jogador.id,
                                value as JogadorStatus,
                              )
                            }
                          >
                            <SelectTrigger className="w-40">
                              <SelectValue />
                            </SelectTrigger>

                            <SelectContent>
                              <SelectItem value="ATIVO">Ativo</SelectItem>

                              <SelectItem value="LESIONADO">
                                Lesionado
                              </SelectItem>

                              <SelectItem value="INATIVO">Inativo</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}

                {jogadores.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="h-32 text-center text-muted-foreground"
                    >
                      Nenhum jogador encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
