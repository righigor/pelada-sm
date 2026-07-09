import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowDownLeft, ArrowUpRight, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { useCreateMovimentacao } from "@/hooks/caixinha/use-create-movimentacao";

const movimentacaoSchema = z.object({
  tipo: z.enum(["despesa", "entrada_extra"] as const, {
    error: "Selecione o tipo.",
  }),
  descricao: z
    .string()
    .min(3, "Mínimo 3 caracteres.")
    .max(100, "Máximo 100 caracteres."),
  valor: z
    .number({ error: "Informe um valor numérico." })
    .positive("O valor deve ser positivo.")
    .max(10000, "Valor máximo de R$ 10.000,00."),
  data: z.string().min(1, "Informe a data."),
});

type MovimentacaoFormData = z.infer<typeof movimentacaoSchema>;

export function FormMovimentacao() {
  const { mutate, isPending } = useCreateMovimentacao();

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<MovimentacaoFormData>({
    resolver: zodResolver(movimentacaoSchema),
    defaultValues: {
      tipo: "despesa",
      descricao: "",
      valor: undefined,
      data: format(new Date(), "yyyy-MM-dd"),
    },
  });

  const valorAtual = watch("valor");

  function onSubmit(data: MovimentacaoFormData) {
    mutate({
      tipo: data.tipo,
      descricao: data.descricao,
      valor: data.valor,
      data: new Date(data.data + "T12:00:00").toISOString(),
    });
    reset({
      tipo: "despesa",
      descricao: "",
      valor: undefined,
      data: format(new Date(), "yyyy-MM-dd"),
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Nova Movimentação
        </CardTitle>
        <CardDescription>
          Registre uma despesa ou uma entrada extra na caixinha. O saldo será
          atualizado automaticamente.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Campo: Tipo */}
          <div className="space-y-2">
            <Label htmlFor="tipo">Tipo</Label>
            <Controller
              name="tipo"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger id="tipo">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="despesa">
                      <span className="flex items-center gap-2">
                        <ArrowUpRight className="h-3.5 w-3.5 text-red-500" />
                        Despesa
                      </span>
                    </SelectItem>
                    <SelectItem value="entrada_extra">
                      <span className="flex items-center gap-2">
                        <ArrowDownLeft className="h-3.5 w-3.5 text-emerald-500" />
                        Entrada Extra
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.tipo && (
              <p className="text-sm font-medium text-destructive">
                {errors.tipo.message}
              </p>
            )}
          </div>

          {/* Campo: Descrição */}
          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição</Label>
            <Input
              id="descricao"
              placeholder="Ex: Bola Nike, Sobra do churrasco..."
              {...register("descricao")}
            />
            {errors.descricao && (
              <p className="text-sm font-medium text-destructive">
                {errors.descricao.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Campo: Valor */}
            <div className="space-y-2">
              <Label htmlFor="valor">Valor (R$)</Label>
              <Input
                id="valor"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0,00"
                value={valorAtual ?? ""}
                onChange={(e) => {
                  const val = e.target.value;
                  setValue("valor", val === "" ? 0 : parseFloat(val), {
                    shouldValidate: true,
                  });
                }}
              />
              {errors.valor && (
                <p className="text-sm font-medium text-destructive">
                  {errors.valor.message}
                </p>
              )}
            </div>

            {/* Campo: Data */}
            <div className="space-y-2">
              <Label htmlFor="data">Data</Label>
              <Input id="data" type="date" {...register("data")} />
              {errors.data && (
                <p className="text-sm font-medium text-destructive">
                  {errors.data.message}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full sm:w-auto"
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Registrar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
