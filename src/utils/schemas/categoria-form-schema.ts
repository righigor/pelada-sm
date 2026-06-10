import z from "zod";

export const categoriaFormSchema = z
  .object({
    nome: z
      .string()
      .min(3, { message: "O nome deve ter pelo menos 3 caracteres." }),
    icone: z.string().min(1, { message: "Escolha um identificador de ícone." }),
    tipoCalculo: z.enum(["AUTOMATICO", "MANUAL"] as const, {
      error: "Selecione o tipo de cálculo.",
    }),
    funcaoReferencia: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.tipoCalculo === "AUTOMATICO" && !data.funcaoReferencia) {
        return false;
      }
      return true;
    },
    {
      message: "O nome da função é obrigatório para cálculos automáticos.",
      path: ["funcaoReferencia"],
    },
  );

export type CategoriaFormValues = z.infer<typeof categoriaFormSchema>;
