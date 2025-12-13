import type { FieldValue } from "firebase/firestore";
import type { DestaquePartida } from "../destaques/Destaque";
import type { PartidaKey } from "../PartidaStore";

export interface JogadorUpdate {
  gols?: FieldValue;
  assistencias?: FieldValue;
  golContra?: FieldValue;
  partidas?: FieldValue;
  updatedAt?: Date;
  [key: string]: FieldValue | Date | undefined;
}

export interface ResumoPartida {
  artilheiro: DestaquePartida | null;
  maiorAssistente: DestaquePartida | null;
  bagre: DestaquePartida | null;
  golsTotais: number;
  jogadoresTotais: number;
  mvpGeral: DestaquePartida | null;
  mvpPorTime: Record<PartidaKey, DestaquePartida | null>;
}