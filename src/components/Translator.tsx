import { useEffect, useState } from "react";
import styles from "./styles/Translator.module.css";
import TextBox from "./TextBox";
import TextBoxHeader from "./TextBoxHeader";
import Dropdown from "./Dropdown";
import { toast } from "react-toastify";
import { translateText } from "../services/TranslationService";
import type { BackendError } from "../types";
import Slider from "./Slider";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
  SOURCE_LANGUAGE_OPTIONS,
  TARGET_LANGUAGE_OPTIONS,
  DIALECT_MAP,
} from "../constants/languages";

export default function Translator() {
  const [sourceText, setSourceText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("auto");
  const [targetLanguage, setTargetLanguage] = useState("es");
  const [targetDialect, setTargetDialect] = useState("dominican");
  const [formality, setFormality] = useState(0);
  const [translation, setTranslation] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const targetDialectOptions = DIALECT_MAP[targetLanguage] ?? [
    { label: "Neutral", value: "neutral" },
  ];

  useEffect(() => {
    const dialects = DIALECT_MAP[targetLanguage];

    if (dialects) {
      setTargetDialect(dialects[0].value);
    }
  }, [targetLanguage]);

  const handleTranslate = async () => {
    try {
      setLoading(true);
      setTranslation("");

      const result = await translateText({
        original_text: sourceText,
        source_language: sourceLanguage,
        target_language: targetLanguage,
        dialect: targetDialect,
        formality: formality,
      });

      setTranslation(result.translation);
    } catch (error) {
      const backendError = error as BackendError;

      if (
        error instanceof Error &&
        error.message === "Unauthorized — please log in again"
      ) {
        navigate("/auth");
        return;
      }

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
    <motion.div
      className={`button ${styles.dropdown}`}
      onClick={handleTranslate}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      Translate
    </motion.div>
  );

  return (
    <div className={styles.translatorWrapper}>
      <Slider value={formality} onChange={setFormality} />
      <div className={styles.buttonMobile}>{translateButton}</div>
      <div className={styles.translator}>
        <div className={styles.sourceWrapper}>
          <TextBoxHeader headerType="input">
            <div className={styles.selection}>
              FROM
              <Dropdown
                value={sourceLanguage}
                onChange={setSourceLanguage}
                options={SOURCE_LANGUAGE_OPTIONS}
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
                options={TARGET_LANGUAGE_OPTIONS}
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
            copyable={translation ? true : false}
          />
        </div>
      </div>
    </div>
  );
}
