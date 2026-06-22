import { useForm } from "react-hook-form";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2, AlertCircle } from "lucide-react";
import { useGetAllCategorias } from "@/hooks/premiacao/categoria/use-get-all-categorias";
import { useCreatePremiacao } from "@/hooks/premiacao/use-create-premiacao";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  premiacaoFormSchema,
  type PremiacaoFormValues,
} from "@/utils/schemas/premiacao-form-schema";
import LoadingButton from "./loading-button";

interface AddPremiacaoProps {
  onSuccess?: () => void;
}

export default function AddPremiacao({ onSuccess }: AddPremiacaoProps) {
  const {
    data: categoriasDisponiveis,
    isLoading: isLoadingCats,
    error: errorCats,
  } = useGetAllCategorias();
  const {
    mutateAsync: createPremiacao,
    isPending: isSaving,
    error: apiError,
  } = useCreatePremiacao();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<PremiacaoFormValues>({
    resolver: zodResolver(premiacaoFormSchema),
    defaultValues: {
      nome: "",
      categoriasIds: [],
    },
  });

  const categoriasSelecionadas = watch("categoriasIds");

  const handleCheckboxChange = (categoriaId: string, checked: boolean) => {
    if (checked) {
      setValue("categoriasIds", [...categoriasSelecionadas, categoriaId], {
        shouldValidate: true,
      });
    } else {
      setValue(
        "categoriasIds",
        categoriasSelecionadas.filter((id) => id !== categoriaId),
        { shouldValidate: true },
      );
    }
  };

  async function onSubmit(data: PremiacaoFormValues) {
    if (!categoriasDisponiveis) return;
    const objetosCategoriasSelecionadas = categoriasDisponiveis.filter((cat) =>
      data.categoriasIds.includes(cat.id),
    );
    try {
      await createPremiacao({
        nome: data.nome,
        categoriasSelecionadas: objetosCategoriasSelecionadas,
      });
      reset();
      if (onSuccess) onSuccess();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <SheetContent className="sm:max-w-md overflow-y-auto">
      <SheetHeader>
        <SheetTitle>Iniciar Nova Premiação</SheetTitle>
      </SheetHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
        <div className="space-y-2">
          <Label htmlFor="nomePremiacao">Nome da Edição</Label>
          <Input
            id="nomePremiacao"
            placeholder="Ex: Semestre 2026.1 - Pelada SM"
            {...register("nome")}
          />
          {errors.nome && (
            <p className="text-xs font-medium text-destructive">
              {errors.nome.message}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <div>
            <Label>Categorias Inclusas</Label>
            <p className="text-[0.8rem] text-muted-foreground">
              Selecione quais prêmios serão distribuídos nesta edição.
            </p>
          </div>
          {isLoadingCats && (
            <div className="flex items-center justify-center py-6 text-sm text-muted-foreground gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Carregando
              categorias...
            </div>
          )}

          {errorCats && (
            <div className="flex items-center gap-2 p-3 text-xs rounded-lg border border-destructive/20 bg-destructive/10 text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>Erro ao carregar categorias globais.</span>
            </div>
          )}

          {!isLoadingCats && categoriasDisponiveis && (
            <div className="border rounded-lg divide-y bg-card max-h-60 overflow-y-auto">
              {categoriasDisponiveis.length === 0 ? (
                <p className="p-4 text-xs text-center text-muted-foreground italic">
                  Nenhuma categoria cadastrada. Crie uma categoria primeiro!
                </p>
              ) : (
                categoriasDisponiveis.map((cat) => (
                  <Label
                    key={cat.id}
                    className="flex items-start gap-3 p-3 text-sm cursor-pointer hover:bg-accent/40 transition-colors select-none"
                  >
                    <Input
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary accent-primary"
                      checked={categoriasSelecionadas.includes(cat.id)}
                      onChange={(e) =>
                        handleCheckboxChange(cat.id, e.target.checked)
                      }
                    />
                    <div className="space-y-0.5">
                      <span className="font-medium text-foreground flex items-center gap-1.5">
                        {cat.nome}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        {cat.tipoCalculo === "AUTOMATICO"
                          ? `Automático (fx: ${cat.funcaoReferencia})`
                          : "Manual / Votação"}
                      </span>
                    </div>
                  </Label>
                ))
              )}
            </div>
          )}
          {errors.categoriasIds && (
            <p className="text-xs font-medium text-destructive">
              {errors.categoriasIds.message}
            </p>
          )}
        </div>

        {apiError && (
          <p className="text-sm font-medium text-destructive bg-destructive/10 p-3 rounded-lg">
            {apiError.message || "Erro ao salvar a premiação no Firebase."}
          </p>
        )}

        <SheetFooter className="pt-4 border-t gap-2 sm:gap-0">
          <LoadingButton type="submit" className="w-full" isLoading={isSaving}>
            Criar Premiação
          </LoadingButton>
        </SheetFooter>
      </form>
    </SheetContent>
  );
}
