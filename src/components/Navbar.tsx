import ThemeToggle from "./icons/Lamp";
import styles from "./styles/Navbar.module.css";
import Logo from "./icons/Logo";
import User from "./icons/User";
import { useState } from "react";

function getInitialTheme(): "dark" | "light" {
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(() => getInitialTheme() === "dark");

  return (
    <nav>
      <div className={styles.navBar}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.buttons}>
          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          <User darkMode={darkMode} />
        </div>
      </div>
    </nav>
  );
}
