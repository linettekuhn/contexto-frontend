import styles from "./App.module.css";
import HistoryButton from "./components/History";
import Translator from "./components/Translator";

function App() {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className="displayLarge">AI Dialect Translator</h1>
        <h4>
          Instant translations adapted to real dialects and everyday speech.
        </h4>
      </div>
      <Translator />
      <p className="caption" style={{ opacity: 0.5 }}>
        AI can make mistakes. Double-check answers.
      </p>
      <HistoryButton />
    </main>
  );
}

export default App;
