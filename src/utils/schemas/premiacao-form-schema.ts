import z from "zod";

export const premiacaoFormSchema = z.object({
  nome: z
    .string()
    .min(3, { message: "O nome da edição deve ter pelo menos 3 caracteres." }),
  categoriasIds: z
    .array(z.string())
    .min(1, {
      message: "Selecione ao menos uma categoria para esta premiação.",
    }),
});

export type PremiacaoFormValues = z.infer<typeof premiacaoFormSchema>;