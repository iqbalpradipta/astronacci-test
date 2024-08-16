import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../../libs/api";
import { toast, Bounce } from "react-toastify";

export default function RegisterHooks() {
  const [fullName, setfullName] = useState("");
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await API.post("/users/register", {
      fullName,
      userName,
      email,
      password,
    }).then((res) => {
      return res.data;
    });

    try {
      navigate("/login", { replace: true });
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
    } catch (error) {
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
  };

  return {
    handleSubmit,
    setfullName,
    fullName,
    setuserName,
    userName,
    setEmail,
    email,
    setPassword,
    password,
  };
}
