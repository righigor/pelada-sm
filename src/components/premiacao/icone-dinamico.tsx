import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface IconeDinamicoProps {
  nome: string;
  className?: string;
}

export function IconeDinamico({ nome, className }: IconeDinamicoProps) {
  const Icon = (LucideIcons as unknown as Record<string, LucideIcon>)[nome] || LucideIcons.Trophy;
  return <Icon className={className} />;
}