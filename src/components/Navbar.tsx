import ThemeToggle from "./icons/Lamp";
import styles from "./styles/Navbar.module.css";
import Logo from "./icons/Logo";
import User from "./icons/User";
import { useState } from "react";
import { motion } from "motion/react";
import type { Transition } from "motion/react";

function getInitialTheme(): "dark" | "light" {
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

type Props = {
  hideUser?: boolean;
};

const transition: Transition = { type: "spring", stiffness: 300, damping: 30 };

export default function Navbar({ hideUser }: Props) {
  const [darkMode, setDarkMode] = useState(() => getInitialTheme() === "dark");

  return (
    <nav>
      <div className={`${styles.navBar} ${hideUser ? styles.centered : ""}`}>
        <motion.div
          className={styles.logo}
          initial={{ x: hideUser ? 0 : "calc(50vw - 250px)" }}
          animate={{ x: hideUser ? "calc(50vw - 250px)" : 0 }}
          transition={transition}
        >
          <Logo />
        </motion.div>
        <motion.div
          className={styles.buttons}
          initial={{ x: hideUser ? 0 : "calc(-50vw + 250px)" }}
          animate={{ x: hideUser ? "calc(-50vw + 250px)" : 0 }}
          transition={transition}
        >
          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          {!hideUser && <User darkMode={darkMode} />}
        </motion.div>
      </div>
    </nav>
  );
}
