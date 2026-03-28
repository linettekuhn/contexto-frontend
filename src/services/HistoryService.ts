import type { BackendError, HistoryItem } from "../types";
import { authFetch } from "./AuthService";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function getHistory(): Promise<HistoryItem[]> {
  // call history endpoint in backend
  const response = await authFetch(`${BASE_URL}/history`, {
    method: "GET",
  });

  // parse response
  const result = await response.json();

  // return result
  if (!response.ok) {
    throw result as BackendError;
  }

  return result.history;
}
