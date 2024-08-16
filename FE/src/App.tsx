import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import ArtikelContentPage from "./pages/Artikel/ArtikelContentPage";
import ArtikelTitlePage from "./pages/Artikel/ArtikelTitlePage";
import ArtikelWelcomePage from "./pages/Artikel/ArtikelWelcomePage";
import VideoContentPage from "./pages/Videos/VideoContentPage";
import VideoTitlePage from "./pages/Videos/VideoTitlePage";
import VideoWelcomePage from "./pages/Videos/VideoWelcomePage";
import Login from "./pages/Login/loginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import { useState } from "react";
import HomePage from "./pages/Home/HomePage";

function App() {
  const token = sessionStorage.getItem('token')

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/artikel",
          element: token ? <ArtikelTitlePage /> : <Navigate to="/login" />,
          children: [
            {
              path: "/artikel",
              element: token ? <ArtikelWelcomePage /> : <Navigate to="/login" />,
            },
            {
              path: "/artikel/:id",
              element: token ? <ArtikelContentPage /> : <Navigate to="/login" />,
            },
          ],
        },
        {
          path: "/video",
          element: token ? <VideoTitlePage /> : <Navigate to="/login" />,
          children: [
            {
              path: "/video",
              element: token ? <VideoWelcomePage /> : <Navigate to="/login" />,
            },
            {
              path: "/video/:id",
              element: token ? <VideoContentPage /> : <Navigate to="/login" />,
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      element: token ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;