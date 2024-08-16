import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";

export default function LoginGoogle() {
  const navigate = useNavigate();

  const handleSubmitGoogle = async (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = "http://localhost:8000/api/v1/auth/google";
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      sessionStorage.setItem("token", token);

      navigate("/", { replace: true });
      window.location.reload()

      toast.success("Login successful!", {
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
    } else {
      toast.error("Login failed. No token received.", {
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
    }
  }, [navigate]);

  return {
    handleSubmitGoogle,
  };
}
