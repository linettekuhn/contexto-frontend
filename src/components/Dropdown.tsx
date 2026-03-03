import { useEffect, useRef, useState } from "react";
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
  const optionsRef = useRef<HTMLDivElement>(null);

  const selectedLabel =
    options.find((option) => option.value === value)?.label ?? "";

  // fix options menu positioning if it sits outside window width
  useEffect(() => {
    if (!open || !optionsRef.current) return;
    const options = optionsRef.current;
    const optionsRect = optionsRef.current.getBoundingClientRect();

    options.style.left = "";
    options.style.right = "";

    // fix right overflow
    if (optionsRect.right > window.innerWidth) {
      options.style.left = "auto";
      options.style.right = "0";
    }

    // fix left overflow
    if (optionsRect.left < 0) {
      options.style.left = "0";
      options.style.right = "auto";
    }
  }, [open]);

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
        <div ref={optionsRef} className={styles.options}>
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
