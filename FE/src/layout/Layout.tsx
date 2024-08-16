import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import HomePage from "../pages/Home/HomePage";
import { ToastContainer } from "react-toastify";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <ToastContainer />
    </>
  );
}

export default Layout;
