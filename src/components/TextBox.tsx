import { useState } from "react";
import styles from "./styles/TextBox.module.css";
import { FaCheck, FaRegCopy } from "react-icons/fa6";
import { AnimatePresence, motion } from "motion/react";

type Props = {
  placeholder: string;
  value: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  copyable?: boolean;
  showCount?: boolean;
};

export default function TextBox({
  placeholder,
  value,
  onChange,
  disabled = false,
  copyable = false,
  showCount = false,
}: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className={styles.textBoxWrapper}>
      <div
        className={`${styles.textBoxInner} ${disabled ? styles.disabled : ""}`}
      >
        <textarea
          className={styles.textBox}
          placeholder={placeholder}
          readOnly={disabled}
          value={value}
          onChange={
            !disabled && onChange ? (e) => onChange(e.target.value) : undefined
          }
        />
        {(showCount || copyable) && <div className={styles.textBoxFooter} />}
      </div>
      {showCount && (
        <p
          style={{
            color:
              value.length > 1500 ? "red" : "rgb(var(--color-primary-700))",
          }}
          className={styles.charCount}
        >
          {value.length} / 1500
        </p>
      )}
      {copyable && (
        <button
          className={`${styles.copyButton} ${copied ? styles.copied : ""}`}
          onClick={handleCopy}
          title="Copy to clipboard"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span
                key="check"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FaCheck />
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FaRegCopy />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      )}
    </div>
  );
}
