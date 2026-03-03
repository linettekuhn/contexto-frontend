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
};

export default function TextBox({
  placeholder,
  value,
  onChange,
  disabled = false,
  copyable = false,
}: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className={styles.textBoxWrapper}>
      <textarea
        className={`${styles.textBox} ${disabled ? styles.disabled : ""}`}
        placeholder={placeholder}
        readOnly={disabled}
        value={value}
        onChange={
          !disabled && onChange ? (e) => onChange(e.target.value) : undefined
        }
      />
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
