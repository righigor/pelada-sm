import type { Timestamp } from "firebase/firestore";
import type { PartidaKey } from "../PartidaStore";
import type { ResumoPartida } from "./CreatePartida";
import type { TimeData } from "./Estatisticas";
import type { PartidaStatusType } from "@/utils/constants";


export interface PartidaByIDResponseType {
  id: string;
  dataPartida: Timestamp;
  local: string;
  status: PartidaStatusType;
  timesEstatisticas: Record<PartidaKey, TimeData>;
  resumoPartida: ResumoPartida;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}