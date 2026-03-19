import type { BackendError } from "../types";

//TODO: change back to vite env
const BASE_URL = "http://localhost:3009/";

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
  console.log(data);

  // call translate endpoint in backend
  const response = await fetch(BASE_URL, {
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

  console.log(result);
  return result;
}
