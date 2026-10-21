import { createContext } from "preact";
import { useContext } from "preact/hooks";
import type { ExportSession } from "../session";
export const SessionContext = createContext<ExportSession | null>(null);
export function useExportSession() {
  const session = useContext(SessionContext);
  if (!session) throw new Error("Export session is unavailable");
  return session;
}
