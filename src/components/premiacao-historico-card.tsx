import { Link } from "react-router-dom";
import { Calendar, CheckCircle2, Users } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { PremiacaoEdicao } from "@/hooks/premiacao/use-get-premiacao-em-andamento";
import { AvatarImage, AvatarFallback, Avatar } from "@radix-ui/react-avatar";

interface PremiacaoHistoricoCardProps {
  p: PremiacaoEdicao;
}

export default function PremiacaoHistoricoCard({
  p,
}: PremiacaoHistoricoCardProps) {
  const isFinalizada = p.status === "FINALIZADA";
  const categoriasComVencedor = p.categorias.filter((cat) => cat.vencedorNome);

  return (
    <Link to={`/premiacoes/${p.id}`} className="block group h-full">
      <Card className="h-full hover:bg-accent/40 transition-all hover:shadow-md flex flex-col">
        <CardHeader>
          <div className="flex items-center gap-2 flex-wrap">
            {isFinalizada ? (
              <Badge variant="secondary" className="gap-1">
                <CheckCircle2 className="h-3 w-3" /> Concluído
              </Badge>
            ) : (
              <Badge className="gap-1 bg-emerald-600 hover:bg-emerald-700 text-white">
                ● Ao Vivo
              </Badge>
            )}
            <span className="text-xs text-muted-foreground">
              {p.categorias.length} categorias
            </span>
          </div>
          <CardTitle className="text-lg mt-2 group-hover:text-primary transition-colors">
            {p.nome}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex items-end">
          {isFinalizada && categoriasComVencedor.length > 0 ? (
            <div className="flex items-center pt-3 border-t w-full">
              {categoriasComVencedor.map((cat, index) => (
                <Avatar
                  key={cat.idCategoria}
                  className={`${index > 0 ? "-ml-2" : ""}`}
                  title={`${cat.vencedorNome} - ${cat.nome} (${cat.detalhes})`}
                >
                  {cat.vencedorFotoUrl ? (
                    <AvatarImage
                      src={cat.vencedorFotoUrl}
                      alt={cat.vencedorNome || ""}
                      className="rounded-full size-12 object-cover"
                    />
                  ) : null}
                  <AvatarFallback className="text-[10px] font-bold bg-muted">
                    {cat.vencedorNome?.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-4 text-muted-foreground gap-1 border-t pt-4 w-full">
              <Users className="h-5 w-5 opacity-50" />
              <p className="text-xs">
                {p.categorias.length} categorias em apuração
              </p>
            </div>
          )}
        </CardContent>

        <CardFooter className="text-xs text-muted-foreground gap-1.5 pt-0">
          <Calendar className="h-3.5 w-3.5" />
          Realizado em{" "}
          {new Date(p.dataFinalizacao || p.dataCriacao).toLocaleDateString(
            "pt-BR",
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
