import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "./i18n.ts";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import 'react-big-calendar/lib/sass/styles';

// import App from './App.tsx'
import Home from "./pages/home/home.tsx";
import Courses from "./pages/courses/courses.tsx";
import MyCalendar from "./pages/myCalendar/myCalendar.tsx";
import Profile from "./pages/profile/profile.tsx";
import Setting from "./pages/setting/setting.tsx";

let resizeTimer: string | number | NodeJS.Timeout | undefined;
window.addEventListener("resize", () => {
  document.body.classList.add("resize-animation-stopper");
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove("resize-animation-stopper");
  }, 400);
});

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
