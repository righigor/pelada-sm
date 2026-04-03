/* eslint-disable @typescript-eslint/no-explicit-any */
export const formatarData = (data: any) => {
  if (!data) return "";

  if (typeof data.toDate === 'function') {
    return data.toDate().toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  }

  const d = new Date(data.seconds ? data.seconds * 1000 : data);
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
};