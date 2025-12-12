import type { Timestamp } from "firebase/firestore";
import type { EstatisticasInputStore } from "../PartidaStore";
import type { ResumoPartida } from "./CreatePartida";

export interface PartidaByIDResponseType {
  id: string;
  dataPartida: Timestamp;
  local: string;
  timesEstatisticas: EstatisticasInputStore;
  resumoPartida: ResumoPartida;
}