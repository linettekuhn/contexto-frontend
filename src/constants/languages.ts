export const SOURCE_LANGUAGE_OPTIONS = [
  { label: "Detect Language", value: "auto" },
  { label: "English", value: "en" },
  { label: "Spanish", value: "es" },
  { label: "French", value: "fr" },
  { label: "Portuguese", value: "pt" },
  { label: "German", value: "de" },
  { label: "Italian", value: "it" },
];

export const TARGET_LANGUAGE_OPTIONS = [
  { label: "English", value: "en" },
  { label: "Spanish", value: "es" },
  { label: "French", value: "fr" },
  { label: "Portuguese", value: "pt" },
  { label: "German", value: "de" },
  { label: "Italian", value: "it" },
];

export const DIALECT_MAP: Record<string, { label: string; value: string }[]> = {
  es: [
    { label: "Neutral", value: "neutral" },
    { label: "Dominican", value: "dominican" },
    { label: "Mexican", value: "mexican" },
    { label: "Colombian", value: "colombian" },
    { label: "Argentinian", value: "argentinian" },
    { label: "Castilian (Spain)", value: "castilian" },
  ],
  en: [
    { label: "Neutral", value: "neutral" },
    { label: "American", value: "american" },
    { label: "British", value: "british" },
    { label: "Australian", value: "australian" },
  ],
  fr: [
    { label: "Neutral", value: "neutral" },
    { label: "France", value: "france" },
    { label: "Canadian (Quebec)", value: "quebecois" },
  ],
  pt: [
    { label: "Neutral", value: "neutral" },
    { label: "Brazilian", value: "brazilian" },
    { label: "European", value: "european" },
  ],
  de: [
    { label: "Neutral", value: "neutral" },
    { label: "Germany", value: "germany" },
    { label: "Swiss", value: "swiss" },
  ],
  it: [
    { label: "Neutral", value: "neutral" },
    { label: "Standard Italian", value: "standard" },
    { label: "Southern", value: "southern" },
  ],
};

export function getLanguageLabel(value: string): string {
  return (
    SOURCE_LANGUAGE_OPTIONS.find((l) => l.value === value)?.label ??
    TARGET_LANGUAGE_OPTIONS.find((l) => l.value === value)?.label ??
    value
  );
}

export function getDialectLabel(language: string, dialect: string): string {
  return (
    DIALECT_MAP[language]?.find((d) => d.value === dialect)?.label ?? dialect
  );
}
