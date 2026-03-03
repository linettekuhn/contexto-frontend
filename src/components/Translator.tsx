import { useEffect, useMemo, useState } from "react";
import styles from "./styles/Translator.module.css";
import TextBox from "./TextBox";
import TextBoxHeader from "./TextBoxHeader";
import Dropdown from "./Dropdown";
import { toast } from "react-toastify";
import { translateText } from "../services/TranslationService";
import type { BackendError } from "../types";

export default function Translator() {
  const [sourceText, setSourceText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("auto");
  const [targetLanguage, setTargetLanguage] = useState("es");
  const [targetDialect, setTargetDialect] = useState("dominican");
  const [translation, setTranslation] = useState("");
  const [loading, setLoading] = useState(false);

  const sourceLanguageOptions = [
    { label: "Detect Language", value: "auto" },
    { label: "English", value: "en" },
    { label: "Spanish", value: "es" },
    { label: "French", value: "fr" },
    { label: "Portuguese", value: "pt" },
    { label: "German", value: "de" },
    { label: "Italian", value: "it" },
  ];

  const targetLanguageOptions = [
    { label: "English", value: "en" },
    { label: "Spanish", value: "es" },
    { label: "French", value: "fr" },
    { label: "Portuguese", value: "pt" },
    { label: "German", value: "de" },
    { label: "Italian", value: "it" },
  ];

  const dialectMap: Record<string, { label: string; value: string }[]> =
    useMemo(
      () => ({
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
      }),
      [],
    );

  const targetDialectOptions = dialectMap[targetLanguage] || [
    { label: "Neutral", value: "neutral" },
  ];

  useEffect(() => {
    const dialects = dialectMap[targetLanguage];

    if (dialects) {
      setTargetDialect(dialects[0].value);
    }
  }, [targetLanguage, dialectMap]);

  const handleTranslate = async () => {
    try {
      setLoading(true);
      setTranslation("");

      const result = await translateText({
        original_text: sourceText,
        source_language: sourceLanguage,
        target_language: targetLanguage,
        dialect: targetDialect,
      });

      setTranslation(result.translation);
    } catch (error) {
      const backendError = error as BackendError;

      if (backendError.details) {
        const { formErrors, fieldErrors } = backendError.details;

        // grab error messages and remove falsy values
        const fieldMessages = Object.values(fieldErrors).flat().filter(Boolean);

        const errorMessages = [...formErrors, ...fieldMessages];

        toast.error(
          <div>
            {errorMessages.map((msg, index) => (
              <div key={index}>{msg}</div>
            ))}
          </div>,
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const translateButton = (
    <button className="button" onClick={handleTranslate}>
      Translate
    </button>
  );

  return (
    <div className={styles.translatorWrapper}>
      <div className={styles.buttonMobile}>{translateButton}</div>
      <div className={styles.translator}>
        <div className={styles.sourceWrapper}>
          <TextBoxHeader headerType="input">
            <div className={styles.selection}>
              FROM
              <Dropdown
                value={sourceLanguage}
                onChange={setSourceLanguage}
                options={sourceLanguageOptions}
              />
            </div>
          </TextBoxHeader>
          <TextBox
            value={sourceText}
            onChange={setSourceText}
            placeholder="Your original text goes here..."
            disabled={loading}
          />
        </div>
        <div className={styles.targetWrapper}>
          <TextBoxHeader headerType="output">
            <div className={styles.selection}>
              <p className="caption">TO</p>
              <Dropdown
                value={targetLanguage}
                onChange={setTargetLanguage}
                options={targetLanguageOptions}
              />
              <Dropdown
                value={targetDialect}
                onChange={setTargetDialect}
                options={targetDialectOptions}
              />
            </div>
            <div className={styles.buttonDesktop}>{translateButton}</div>
          </TextBoxHeader>
          <TextBox
            value={translation}
            placeholder="Your translated text goes here......"
            disabled={true}
          />
        </div>
      </div>
    </div>
  );
}
