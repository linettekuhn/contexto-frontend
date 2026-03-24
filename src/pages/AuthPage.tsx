import { Auth } from "../components/Auth";
import styles from "./styles/AuthPage.module.css";

export default function AuthPage() {
  return (
    <main className={styles.main}>
      <Auth />
    </main>
  );
}
