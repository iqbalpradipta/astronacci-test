import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../../libs/api";
import { toast, Bounce } from "react-toastify";

export default function LoginHooks() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await API.post("/users/login", {
      email,
      password,
    }).then((res) => {
      return res.data;
    });


    try {
      const token = response.token;

      if (token) {
        sessionStorage.setItem("token", token);
      }

      if (sessionStorage.getItem("token")) {
        navigate("/", { replace: true });
        window.location.reload();
        toast.success(`${response.messages}`, {
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
        toast.error(`${response.messages}`, {
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
    } catch (error) {
      throw error;
    }
  };

  return {
    handleSubmit,
    setEmail,
    email,
    setPassword,
    password,
  };
}
