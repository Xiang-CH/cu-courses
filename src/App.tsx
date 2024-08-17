import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Toaster } from "@/components/ui/sonner.tsx";
import { useEffect } from "react";

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
    loader: async (param) => {
      return await request("/course/detail", {
        course_id: param.toString(),
      });
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
  useEffect(() => {
    document.title = t("app-name");
  }, []);

  return (
    <div className="w-screen">
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
