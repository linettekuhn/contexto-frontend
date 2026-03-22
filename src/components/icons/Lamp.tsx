import styles from "../styles/Lamp.module.css";

type Props = {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
};

export default function ThemeToggle({ darkMode, setDarkMode }: Props) {
  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    const theme = next ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  return (
    <div className={styles.lampWrapper}>
      <svg
        width="23"
        height="38"
        viewBox="0 0 23 38"
        overflow="visible"
        xmlns="http://www.w3.org/2000/svg"
        className={`${styles.lamp} ${darkMode ? styles.lit : styles.unlit}`}
        onClick={toggleTheme}
      >
        <g>
          <path
            className={styles.string}
            d="M16.21 28.9656C16.2099 29.0136 16.2009 29.0597 16.1895 29.1042C16.5352 29.2947 16.7695 29.6621 16.7695 30.0847C16.7695 30.7029 16.2686 31.2039 15.6504 31.2039C15.0323 31.2038 14.5312 30.7029 14.5312 30.0847C14.5313 29.6624 14.7651 29.2948 15.1104 29.1042C15.099 29.0598 15.0909 29.0135 15.0908 28.9656V25.114H16.21V28.9656Z"
          />
          <rect
            className={styles.shade}
            x="3.98584"
            y="10.7219"
            width="14.9429"
            height="14.9429"
            rx="1.86786"
            strokeWidth="1.5"
          />
          <path
            className={styles.base}
            d="M11.4636 25.6282C11.8756 25.6283 12.2097 25.9622 12.2097 26.3743V36.2776H15.7117C16.1235 36.2778 16.4576 36.6118 16.4578 37.0237C16.4577 37.4356 16.1236 37.7696 15.7117 37.7698H7.20386C6.79183 37.7697 6.45782 37.4357 6.45776 37.0237C6.45792 36.6117 6.79189 36.2776 7.20386 36.2776H10.7175V26.3743C10.7175 25.9622 11.0515 25.6282 11.4636 25.6282Z"
          />
          <g className={styles.glow}>
            <path
              className={styles.middleGlow}
              d="M11.4587 4.64941V1.14868"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              className={styles.rightGlow}
              d="M21.9084 4.64941L19.2137 6.39978"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              className={styles.leftGlow}
              d="M1.00903 4.64941L3.70381 6.39978"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
