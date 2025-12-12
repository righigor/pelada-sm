import type { FieldValue } from "firebase/firestore";
import type { DestaquePartida } from "../destaques/Destaque";

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
}