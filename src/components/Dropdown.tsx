import { useRef, useState } from "react";
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
  const [alignRight, setAlignRight] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  const selectedLabel =
    options.find((option) => option.value === value)?.label ?? "";

  const handleOpen = () => {
    if (!open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      // if the trigger is in the right half of the screen, align menu to the right
      setAlignRight(rect.left > window.innerWidth / 2);
    }
    setOpen((prev) => !prev);
  };

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
        ref={triggerRef}
        className={`button ${styles.dropdown}`}
        onClick={handleOpen}
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
            className={styles.options}
            style={
              alignRight
                ? { left: "auto", right: 0 }
                : { left: 0, right: "auto" }
            }
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
