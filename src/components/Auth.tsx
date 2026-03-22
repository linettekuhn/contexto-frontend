import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import type { BackendError } from "../types";
import styles from "./styles/Auth.module.css";
import CapsuleInput from "./CapsuleInput";
import { MdAlternateEmail, MdPassword } from "react-icons/md";
import { RiEyeFill, RiEyeCloseLine } from "react-icons/ri";
import { AnimatePresence, motion } from "motion/react";

const textVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const textTransition = { duration: 0.2 };

export function Auth() {
  const { user, isLoading, login, register, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isPending, setIsPending] = useState(false);

  async function handleLogin() {
    try {
      setIsPending(true);
      await login(email, password);
      toast.success("Logged in!");
    } catch (error) {
      const backendError = error as BackendError;
      toast.error(backendError.message);
      if (backendError.details) {
        const { formErrors, fieldErrors } = backendError.details;

        // grab error messages and remove falsy values
        const fieldMessages = Object.values(fieldErrors).flat().filter(Boolean);

        const errorMessages = [...formErrors, ...fieldMessages];

        errorMessages.map((msg, index) =>
          toast.error(<div key={index}>{msg}</div>),
        );
      }
    } finally {
      setIsPending(false);
    }
  }

  async function handleRegister() {
    try {
      setIsPending(true);
      await register(email, password);
      toast.success("User registered!");
    } catch (error) {
      const backendError = error as BackendError;
      toast.error(backendError.message);
      if (backendError.details) {
        const { formErrors, fieldErrors } = backendError.details;

        // grab error messages and remove falsy values
        const fieldMessages = Object.values(fieldErrors).flat().filter(Boolean);

        const errorMessages = [...formErrors, ...fieldMessages];

        errorMessages.map((msg, index) =>
          toast.error(<div key={index}>{msg}</div>),
        );
      }
    } finally {
      setIsPending(false);
    }
  }

  async function handleLogout() {
    await logout();
    toast.success("Logged out!");
  }

  if (isLoading) return <div>Loading...</div>;

  // TODO: logout
  return (
    <div className={styles.authWrapper}>
      {user ? (
        <p>{user.email}</p>
      ) : (
        <>
          <div className={styles.header}>
            <AnimatePresence mode="wait">
              <motion.h2
                key={isLogin ? "login-title" : "register-title"}
                className="displayMedium"
                variants={textVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={textTransition}
              >
                {isLogin ? "Log in" : "Sign Up"}
              </motion.h2>
            </AnimatePresence>
            <div className={styles.redirect}>
              <AnimatePresence mode="wait">
                <motion.h5
                  key={isLogin ? "login-prompt" : "register-prompt"}
                  variants={textVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={textTransition}
                >
                  {isLogin ? "Don't" : "Already"} have an account?
                </motion.h5>
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.h5
                  key={isLogin ? "login-switch" : "register-switch"}
                  className={`${styles.redirectBtn} caption`}
                  onClick={() => setIsLogin((prev) => !prev)}
                  variants={textVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={textTransition}
                >
                  {isLogin ? "Sign up" : "Log in"}
                </motion.h5>
              </AnimatePresence>
            </div>
          </div>
          <div className={styles.form}>
            <div className={styles.inputWrapper}>
              <p className="caption">Email</p>
              <CapsuleInput
                value={email}
                onChange={setEmail}
                placeholder="Your email goes here..."
                IconComponent={MdAlternateEmail}
              />
            </div>
            <div className={styles.inputWrapper}>
              <p className="caption">Password</p>
              <CapsuleInput
                value={password}
                onChange={setPassword}
                placeholder="Your password goes here..."
                IconComponent={MdPassword}
                secure={!showPass}
              >
                <div
                  className={styles.showPassBtn}
                  onClick={() => setShowPass((prev) => !prev)}
                >
                  {showPass ? <RiEyeCloseLine /> : <RiEyeFill />}
                </div>
              </CapsuleInput>
            </div>
          </div>
        </>
      )}
      <motion.div
        className={`button ${styles.actionBtn} ${isPending ? "disabled" : ""}`}
        onClick={
          user
            ? handleLogout
            : isPending
              ? undefined
              : isLogin
                ? handleLogin
                : handleRegister
        }
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={user ? "logout-btn" : isLogin ? "login-btn" : "register-btn"}
            variants={textVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={textTransition}
          >
            {user ? "Log out" : isLogin ? "Log in" : "Register"}
          </motion.span>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
