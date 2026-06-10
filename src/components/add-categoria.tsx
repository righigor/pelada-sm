import { Input } from "./ui/input";
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "./ui/sheet";
import { Label } from "./ui/label";
import { Select } from "./ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  categoriaFormSchema,
  type CategoriaFormValues,
} from "@/utils/schemas/categoria-form-schema";
import LoadingButton from "./loading-button";
import { useCreateCategoria } from "@/hooks/premiacao/categoria/use-create-categoria";

interface AddCategoriaProps {
  onSuccess?: () => void;
}

export default function AddCategoria({ onSuccess }: AddCategoriaProps) {
  const { mutateAsync: createCategoria, isPending, error: apiError } = useCreateCategoria();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<CategoriaFormValues>({
    resolver: zodResolver(categoriaFormSchema),
    defaultValues: {
      nome: "",
      icone: "soccer-boot",
      tipoCalculo: "AUTOMATICO",
      funcaoReferencia: "",
    },
  });

  const tipoCalculoAtual = watch("tipoCalculo");

  async function onSubmit(data: CategoriaFormValues) {
    try {
      // Dispara a mutation e aguarda a resolução do Firebase
      await createCategoria({
        nome: data.nome,
        icone: data.icone,
        tipoCalculo: data.tipoCalculo,
        funcaoReferencia: data.tipoCalculo === "AUTOMATICO" ? data.funcaoReferencia : null,
      });

      reset();
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Erro ao criar categoria:", err);
      console.error("Detalhes do erro:", apiError);
    }
  }
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Criar Nova Categoria</SheetTitle>
      </SheetHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-6">
        {/* CAMPO: Nome da Categoria */}
        <div className="space-y-2">
          <Label htmlFor="nome">Nome da Categoria</Label>
          <Input
            id="nome"
            placeholder="Ex: Artilheiro do Ano, Inimigo do Gol"
            {...register("nome")}
          />
          {errors.nome && (
            <p className="text-xs font-medium text-destructive">
              {errors.nome.message}
            </p>
          )}
        </div>

        {/* CAMPO: Ícone */}
        <div className="space-y-2">
          <Label htmlFor="icone">Ícone Identificador</Label>
          <Input
            id="icone"
            placeholder="Ex: soccer-boot, trophy, shield-alert"
            {...register("icone")}
          />
          <p className="text-[0.8rem] text-muted-foreground">
            Insira o nome do ícone (Lucide React) que representará o prêmio.
          </p>
          {errors.icone && (
            <p className="text-xs font-medium text-destructive">
              {errors.icone.message}
            </p>
          )}
        </div>

        {/* CAMPO: Tipo de Cálculo */}
        <div className="space-y-2">
          <Label htmlFor="tipoCalculo">Método de Definição</Label>
          <Select
            value={tipoCalculoAtual}
            onValueChange={(value: "AUTOMATICO" | "MANUAL") =>
              setValue("tipoCalculo", value, { shouldValidate: true })
            }
          >
            <SelectTrigger id="tipoCalculo">
              <SelectValue placeholder="Selecione como o vencedor será definido" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AUTOMATICO">
                Automático (Calculado via Código)
              </SelectItem>
              <SelectItem value="MANUAL">
                Manual (Votação / Inserção Direta)
              </SelectItem>
            </SelectContent>
          </Select>
          {errors.tipoCalculo && (
            <p className="text-xs font-medium text-destructive">
              {errors.tipoCalculo.message}
            </p>
          )}
        </div>

        {/* CAMPO CONDICIONAL: Função de Referência */}
        {tipoCalculoAtual === "AUTOMATICO" && (
          <div className="bg-accent/40 border p-3 rounded-lg space-y-2 animate-in fade-in duration-200">
            <Label htmlFor="funcaoReferencia" className="text-foreground">
              Nome da Função no Código
            </Label>
            <Input
              id="funcaoReferencia"
              placeholder="Ex: calcularArtilheiro, calcularGarcom"
              {...register("funcaoReferencia")}
            />
            <p className="text-[0.8rem] text-muted-foreground">
              Deve bater exatamente com o nome da chave no dicionário de funções
              do seu front-end.
            </p>
            {errors.funcaoReferencia && (
              <p className="text-xs font-medium text-destructive">
                {errors.funcaoReferencia.message}
              </p>
            )}
          </div>
        )}

        <SheetFooter className="gap-2 sm:gap-0">
          <LoadingButton disabled={isPending} isLoading={isPending}>
            Salvar Categoria
          </LoadingButton>
        </SheetFooter>
      </form>
    </SheetContent>
  );
}
