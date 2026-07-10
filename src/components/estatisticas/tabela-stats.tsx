import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type SortingState,
  type ColumnDef,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpDown } from "lucide-react";
import {
  getTabelaEstatisticas,
  type JogadorStatRow,
} from "@/utils/estatisticas/table-helper";
import AvatarLoad from "../avatar-load";
import { ScrollArea } from "../ui/scroll-area";
import type { JogadorNewResponseType } from "@/types/jogadores/Jogador";
import TabelaSkeleton from "./skeleton/tabela-skeleton";
import TabelaError from "./errors/tabela-error";

const colunas: ColumnDef<JogadorStatRow>[] = [
  {
    accessorKey: "nome",
    header: "Jogador",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <AvatarLoad jogador={row.original} avatarSizeClasses="size-12" />
        <span className="truncate font-medium">{row.original.nome}</span>
      </div>
    ),
  },
  {
    accessorKey: "partidas",
    header: ({ column }) => <HeaderOrdenavel column={column} titulo="Jogos" />,
    cell: ({ row }) => (
      <span className="font-mono text-center">{row.getValue("partidas")}</span>
    ),
  },
  {
    accessorKey: "gols",
    header: ({ column }) => <HeaderOrdenavel column={column} titulo="Gols" />,
    cell: ({ row }) => (
      <span className="font-mono text-center font-semibold text-emerald-600 dark:text-emerald-400">
        {row.getValue("gols")}
      </span>
    ),
  },
  {
    accessorKey: "assistencias",
    header: ({ column }) => (
      <HeaderOrdenavel column={column} titulo="Assist." />
    ),
    cell: ({ row }) => (
      <span className="font-mono text-center text-blue-600 dark:text-blue-400">
        {row.getValue("assistencias")}
      </span>
    ),
  },
  {
    accessorKey: "golsContra",
    header: ({ column }) => <HeaderOrdenavel column={column} titulo="G/C" />,
    cell: ({ row }) => (
      <span className="font-mono text-center text-rose-600 dark:text-rose-400">
        {row.getValue("golsContra")}
      </span>
    ),
  },
  {
    accessorKey: "defesasDificeis",
    header: ({ column }) => <HeaderOrdenavel column={column} titulo="DD" />,
    cell: ({ row }) => (
      <span className="font-mono text-center text-violet-600 dark:text-violet-400">
        {row.getValue("defesasDificeis")}
      </span>
    ),
  },
  {
    accessorKey: "gaTotal",
    header: ({ column }) => <HeaderOrdenavel column={column} titulo="G/A" />,
    cell: ({ row }) => (
      <span className="font-mono text-center font-bold">
        {row.getValue("gaTotal")}
      </span>
    ),
  },
  {
    accessorKey: "gaMedio",
    header: ({ column }) => (
      <HeaderOrdenavel column={column} titulo="G/A Méd" />
    ),
    cell: ({ row }) => (
      <span className="font-mono text-center">{row.getValue("gaMedio")}</span>
    ),
  },
  {
    accessorKey: "mvpsGeral",
    header: ({ column }) => <HeaderOrdenavel column={column} titulo="MVP G" />,
    cell: ({ row }) => (
      <span className="font-mono text-center text-amber-600 dark:text-amber-400">
        {row.getValue("mvpsGeral")}
      </span>
    ),
  },
  {
    accessorKey: "mvpsPorTime",
    header: ({ column }) => <HeaderOrdenavel column={column} titulo="MVP T" />,
    cell: ({ row }) => (
      <span className="font-mono text-center text-amber-600/70 dark:text-amber-400/70">
        {row.getValue("mvpsPorTime")}
      </span>
    ),
  },
];

function HeaderOrdenavel({
  column,
  titulo,
}: {
  column: {
    toggleSorting: (desc: boolean) => void;
    getIsSorted: () => "asc" | "desc" | false;
  };
  titulo: string;
}) {
  return (
    <div
      className="flex cursor-pointer select-none items-center gap-1"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {titulo}
      <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground/50" />
    </div>
  );
}

interface TabelaEstatisticasProps {
  jogadores: JogadorNewResponseType[] | undefined;
  isLoading: boolean;
}

export function TabelaEstatisticas({
  jogadores,
  isLoading,
}: TabelaEstatisticasProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const dados = useMemo(() => {
    if (!jogadores) return [];
    return getTabelaEstatisticas(jogadores);
  }, [jogadores]);

  const table = useReactTable({
    data: dados,
    columns: colunas,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  if (isLoading) {
    return <TabelaSkeleton />;
  }

  if (!dados || !jogadores) {
    return <TabelaError />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Ranking Completo
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <ScrollArea className="h-[400px] w-full">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="px-4 text-center whitespace-nowrap"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} className="hover:bg-muted/50">
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className="px-4 py-2.5 border-r text-center whitespace-nowrap"
                        >
                          {cell.id.includes("nome") ? (
                            <div className="text-left">
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              )}
                            </div>
                          ) : (
                            flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={colunas.length}
                      className="h-24 text-center text-muted-foreground"
                    >
                      Nenhum jogador com partidas registradas.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
