import { Bounce, ToastContainer } from "react-toastify";
import styles from "./App.module.css";
import Navbar from "./components/Navbar";
import Translator from "./components/Translator";

function App() {
  return (
    <>
      <div className="navGradient" />
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
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
        style={{ zIndex: 10000 }}
      />
    </>
  );
}

export default App;
