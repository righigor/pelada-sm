export type JogadorType = {
  id: string;
  nome: string;
  fotoUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface FirestoreTimestamp {
  type: 'firestore/timestamp/1.0';
  seconds: number;
  nanoseconds: number;
}

export interface JogadorResponseType {
  id: string;
  nome: string;
  fotoUrl: string | null;
  gols: number;
  assistencias: number;
  golContra: number;
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp; 
}

export type JogadorNameMap = {
  [id: string]: string;
}