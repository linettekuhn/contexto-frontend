export type BackendError = {
  error: string;
  details?: {
    formErrors: string[];
    fieldErrors: Record<string, string[] | undefined>;
  };
};
