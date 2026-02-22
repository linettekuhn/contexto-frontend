import styles from "./styles/TextBox.module.css";

type Props = {
  placeholder: string;
  value: string;
  onChange?: (value: string) => void;
};

export default function TextBox({ placeholder, value, onChange }: Props) {
  return (
    <div className={styles.textBoxWrapper}>
      <textarea
        className={styles.textBox}
        placeholder={placeholder}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
      />
    </div>
  );
}
