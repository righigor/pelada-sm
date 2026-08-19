import type { JogadorStatus } from "@/types/jogadores/Jogador";

export function getStatusVariant(
  status: JogadorStatus,
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "ATIVO":
      return "default";

    case "LESIONADO":
      return "destructive";

    case "INATIVO":
      return "secondary";

    default:
      return "outline";
  }
}

export function getStatusLabel(status: JogadorStatus) {
  switch (status) {
    case "ATIVO":
      return "Ativo";

    case "LESIONADO":
      return "Lesionado";

    case "INATIVO":
      return "Inativo";
  }
}