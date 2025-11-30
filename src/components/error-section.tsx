import { AlertCircle } from "lucide-react";

export default function ErrorSection() {
  return (
    <section className="mt-8 container mx-auto px-8 py-8">
      <AlertCircle className="mx-auto mb-4 h-12 w-12 text-gray-400" />
      <h2 className="text-2xl font-semibold text-center text-gray-400">
        Erro ao carregar os dados. Recarregue a página para tentar novamente.
      </h2>
    </section>
  )
}