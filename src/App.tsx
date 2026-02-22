import styles from "./App.module.css";
import Navbar from "./components/Navbar";
import Translator from "./components/Translator";

function App() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className="displayLarge">AI Dialect Translator</h1>
          <h4>
            Instant translations adapted to real dialects and everyday speech.
          </h4>
        </div>
        <Translator />
      </main>
    </>
  );
}

export default App;
