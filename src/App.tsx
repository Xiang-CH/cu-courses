import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Toaster } from "@/components/ui/sonner.tsx";
import { useEffect, useState } from "react";

import Home from "./pages/home/home.tsx";
import Courses from "./pages/courses/courses.tsx";
import MyCalendar from "./pages/myCalendar/myCalendar.tsx";
import Profile from "./pages/profile/profile.tsx";
import Setting from "./pages/setting/setting.tsx";
import Apps from "./pages/home/apps.tsx";
import CourseDetail from "./pages/courses/courseDetail.tsx";
import Login from "./pages/login/login.tsx";
import PageNotFound from "./pages/errors/404.tsx";

import { request } from "./lib/api.ts";

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
    path: "/home/apps",
    element: <Apps />,
  },
  {
    path: "/courses",
    element: <Courses />,
  },
  {
    path: "/courses/:courseId",
    element: <CourseDetail />,
    loader: async ({ params }) => {
      console.log(params);
      if (!params.courseId) {
        return null;
      }
      const res = await request("/course/detail.php", {
        course_code: params.courseId,
        token: localStorage.getItem("token") || "",
      });
      console.log(res);
      return res;
    },
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
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  const { t } = useTranslation();
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    document.title = t("app-name");
    setIsDark(false);
  }, []);

  // if (window.matchMedia) {
  //   let colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
  //   colorSchemeQuery.addEventListener("change", (e) => {
  //     if (e.matches) {
  //       setIsDark(true);
  //     } else {
  //       setIsDark(false);
  //     }
  //   });
  // }

  return (
    <div
      className={`w-screen h-screen ${isDark && "dark"} relative overflow-x-hidden`}
    >
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
