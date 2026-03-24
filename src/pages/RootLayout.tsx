import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Bounce, ToastContainer } from "react-toastify";

export default function RootLayout() {
  const location = useLocation();
  const hideUser = location.pathname === "/auth";

  return (
    <>
      <div className="navGradient" />
      <Navbar hideUser={hideUser} />
      <Outlet />
      <ToastContainer
        position="bottom-center"
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
