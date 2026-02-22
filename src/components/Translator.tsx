import { useState } from "react";
import styles from "./styles/Translator.module.css";
import TextBox from "./TextBox";
import TextBoxHeader from "./TextBoxHeader";
import Dropdown from "./Dropdown";

export default function Translator() {
  const [sourceText, setSourceText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("auto");
  const [targetLanguage, setTargetLanguage] = useState("es");
  const [targetDialect, setTargetDialect] = useState("dominican");
  const resultText = "";

  const sourceLanguageOptions = [
    { label: "Detect Language", value: "auto" },
    { label: "English", value: "en" },
    { label: "Spanish", value: "es" },
  ];

  const targetLanguageOptions = [{ label: "Spanish", value: "es" }];

  const targetDialectOptions = [
    { label: "Dominican", value: "dominican" },
    { label: "Colombian", value: "colombian" },
    { label: "Traditional", value: "traditional" },
  ];

  const translateButton = <button className="button">Translate</button>;

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
            value={resultText}
            placeholder="Your translated text goes here......"
          />
        </div>
      </div>
    </div>
  );
}
