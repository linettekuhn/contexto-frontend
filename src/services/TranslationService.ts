import type { BackendError } from "../types";
import { authFetch } from "./AuthService";

const BASE_URL = import.meta.env.VITE_API_URL;

export type TranslateRequest = {
  original_text: string;
  source_language: string;
  target_language: string;
  dialect: string;
  formality: number;
};

export type TranslateResponse = {
  translation: string;
  db_record: {
    original_text: string;
    translated_text: string;
    source_language: string;
    target_language: string;
    dialect: string;
  };
};

export async function translateText(
  data: TranslateRequest,
): Promise<TranslateResponse> {
  // call translate endpoint in backend
  const response = await authFetch(`${BASE_URL}/translate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  // parse response
  const result = await response.json();

  // return result
  if (!response.ok) {
    throw result as BackendError;
  }

  return result;
}
