import ThemeToggle from "./icons/Lamp";
import styles from "./styles/Navbar.module.css";
import Logo from "./icons/Logo";
import User from "./icons/User";
import { useState } from "react";
import { LayoutGroup, motion } from "motion/react";
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
      <LayoutGroup>
        <motion.div
          layout
          transition={transition}
          className={`${styles.navBar} ${hideUser ? styles.centered : ""}`}
        >
          <motion.div
            layout="position"
            transition={transition}
            className={styles.logo}
          >
            <Logo />
          </motion.div>
          <motion.div
            layout="position"
            transition={transition}
            className={styles.buttons}
          >
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            {!hideUser && <User darkMode={darkMode} />}
          </motion.div>
        </motion.div>
      </LayoutGroup>
    </nav>
  );
}
