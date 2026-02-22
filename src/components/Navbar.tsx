import ThemeToggle from "./icons/Lamp";
import styles from "./styles/Navbar.module.css";
import Logo from "./icons/Logo";

export default function Navbar() {
  return (
    <nav>
      <div className={styles.navBar}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
}
