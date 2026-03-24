export type BackendError = {
  message: string;
  details?: {
    formErrors: string[];
    fieldErrors: Record<string, string[] | undefined>;
  };
};

export type HistoryItem = {
  id: number;
  original_text: string;
  translated_text: string;
  source_language: string;
  target_language: string;
  dialect: string;
  created_at: Date | null;
  user_id: number | null;
};
