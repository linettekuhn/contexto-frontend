import type { BackendError, HistoryItem } from "../types";
import { authFetch } from "./AuthService";

const BASE_URL = "http://localhost:3009";

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
