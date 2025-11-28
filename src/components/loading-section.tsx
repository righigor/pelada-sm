import { Loader } from "lucide-react";

export default function LoadingSection() {
  return (
    <section className="mt-8 container mx-auto px-8 py-8">
      <Loader className="mx-auto mb-4 h-12 w-12 text-gray-400 animate-spin" />
      <h2 className="text-2xl font-semibold text-center text-gray-400">
        Carregando...
      </h2>
    </section>
  )
}