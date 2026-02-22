import { useState } from "react";
import styles from "./styles/Translator.module.css";
import TextBox from "./TextBox";
import TextBoxHeader from "./TextBoxHeader";

export default function Translator() {
  const [sourceText, setSourceText] = useState("");
  const resultText = "";

  return (
    <div className={styles.translator}>
      <div className={styles.sourceWrapper}>
        <TextBoxHeader headerType="input">
          <div>
            <p className="caption">FROM</p>
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
          <div>
            <p className="caption">TO</p>
          </div>
        </TextBoxHeader>
        <TextBox
          value={resultText}
          placeholder="Your translated text goes here......"
        />
      </div>
      <div className={styles.targetWrapper}></div>
    </div>
  );
}
