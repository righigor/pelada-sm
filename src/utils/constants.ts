export const LOCAL_SM = "Colégio Santa Maria - Nova Suíça";

export const PARTIDA_STATUS = {
  AGUARDANDO: "aguardando",
  EM_ANDAMENTO: "em_andamento",
  FINALIZADO: "finalizado",
} as const;

export type PartidaStatusType = typeof PARTIDA_STATUS[keyof typeof PARTIDA_STATUS];