import { format } from "date-fns";
import type { Timestamp } from "firebase/firestore";

export function formatDate(date: Timestamp): string {
  return format(date.toDate(), "dd/MM/yyyy")
}