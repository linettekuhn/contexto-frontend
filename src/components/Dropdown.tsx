import { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import styles from "./styles/Dropdown.module.css";
import { AnimatePresence, motion } from "motion/react";

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
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.backdrop}
            onClick={() => setOpen(false)}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
      <motion.div
        className={`button ${styles.dropdown}`}
        onClick={() => setOpen((prev) => !prev)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <p>{selectedLabel}</p>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {open ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
        </motion.span>
      </motion.div>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={optionsRef}
            className={styles.options}
            initial={{ opacity: 0, y: -6, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.5 }}
            transition={{ duration: 0.18 }}
          >
            {options.map((item) => (
              <motion.div
                key={item.value}
                onClick={() => {
                  onChange(item.value);
                  setOpen(false);
                }}
                className="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 350, damping: 18 }}
              >
                {item.label}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
