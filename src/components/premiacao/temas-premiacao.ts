export interface CategoryTheme {
  text: string;
  bg: string;
  bgMuted: string;
  border: string;
  ring: string;
  cardGlow: string;
  photoGlow: string;
}

const GOLD: CategoryTheme = {
  text: "text-[#FFE234]", bg: "bg-[#FFE234]", bgMuted: "bg-[#FFE234]/10",
  border: "border-[#FFE234]/30", ring: "ring-[#FFE234]",
  cardGlow: "shadow-[0_0_24px_rgba(255,226,52,0.08)]", photoGlow: "shadow-[0_0_50px_rgba(255,226,52,0.44)]",
};

const SILVER: CategoryTheme = {
  text: "text-[#A8B2BD]", bg: "bg-[#A8B2BD]", bgMuted: "bg-[#A8B2BD]/10",
  border: "border-[#A8B2BD]/30", ring: "ring-[#A8B2BD]",
  cardGlow: "shadow-[0_0_24px_rgba(168,178,189,0.08)]", photoGlow: "shadow-[0_0_50px_rgba(168,178,189,0.44)]",
};

const BRONZE: CategoryTheme = {
  text: "text-[#C97D2F]", bg: "bg-[#C97D2F]", bgMuted: "bg-[#C97D2F]/10",
  border: "border-[#C97D2F]/30", ring: "ring-[#C97D2F]",
  cardGlow: "shadow-[0_0_24px_rgba(201,125,47,0.08)]", photoGlow: "shadow-[0_0_50px_rgba(201,125,47,0.44)]",
};

export const getTemaPorNome = (nome: string): CategoryTheme => {
  const lower = nome.toLowerCase();
  if (lower.includes("bagre")) return BRONZE;
  if (lower.includes("craque")) return SILVER;
  return GOLD;
};