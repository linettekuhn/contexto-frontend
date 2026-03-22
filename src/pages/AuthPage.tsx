import { Bounce, ToastContainer } from "react-toastify";
import { Auth } from "../components/Auth";
import Navbar from "../components/Navbar";
import styles from "./styles/AuthPage.module.css";

export default function AuthPage() {
  return (
    <>
      <div className="navGradient" />
      <Navbar hideUser />
      <main className={styles.main}>
        <Auth />
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
