import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "./i18n.ts";

// import App from './App.tsx'
import Home from "./pages/home/home.tsx";
import Courses from "./pages/courses/courses.tsx";
import MyCalendar from "./pages/myCalendar/myCalendar.tsx";
import Profile from "./pages/profile/profile.tsx";
import Setting from "./pages/setting/setting.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/courses",
    element: <Courses />,
  },
  {
    path: "/calendar",
    element: <MyCalendar />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/setting",
    element: <Setting />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
