import { toast, Bounce } from "react-toastify";

export const Logout = () => {
  const token = sessionStorage.getItem("token");

  const handleLogout = () => {
    token;
    sessionStorage.removeItem("token");
    window.location.reload();
    toast.success('Success logout !', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  return {
    handleLogout,
  };
};