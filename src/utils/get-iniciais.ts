export function getIniciais(nome: string): string {
  const names = nome.trim().split(/\s+/);
  if (names.length === 0) return "";

  const primeirasLetras = names.slice(0, 2).map(n => n.charAt(0).toUpperCase());
  return primeirasLetras.join("");
}