import { toast } from "sonner";

export default function ShowTimeEnded() {
    
  toast.warning("Alerta de Fim de Partida", {
    description: "Tempo esgotado!",
    duration: 10000,
    position: "top-center",
    action: {
      label: "Entendi",
      onClick: () => console.log("Usuário reconheceu o alerta"),
    },
    style: { backgroundColor: "#ff4d4f", color: "#ffffff" },
  });
}
