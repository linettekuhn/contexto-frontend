import styles from "./styles/TextBox.module.css";

type Props = {
  placeholder: string;
  value: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
};

export default function TextBox({
  placeholder,
  value,
  onChange,
  disabled = false,
}: Props) {
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
    </div>
  );
}
