import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import styles from "./styles/Dropdown.module.css";

type Option = { label: string; value: string };

type Props = {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
};

export default function Dropdown({ value, options, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const selectedLabel =
    options.find((option) => option.value === value)?.label ?? "";

  return (
    <div className={styles.dropdownWrapper}>
      {open && (
        <div className={styles.backdrop} onClick={() => setOpen(false)} />
      )}
      <div
        className={`button ${styles.dropdown}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <p>{selectedLabel}</p>
        {open ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
      </div>
      {open && (
        <div className={styles.options}>
          {options.map((item) => (
            <div
              key={item.value}
              onClick={() => {
                onChange(item.value);
                setOpen(false);
              }}
              className="button"
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
