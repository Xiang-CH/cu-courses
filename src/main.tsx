import ReactDOM from "react-dom/client";
import "./index.css";
import "./i18n.ts";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { AliveScope } from "react-activation";

import App from "./App.tsx";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Home from "@/pages/home/home.tsx";
import Apps from "@/pages/home/apps/apps.tsx";
import Article from "@/pages/home/article/article.tsx";
import CoursesSearch from "@/pages/courses/coursesSearch.tsx";
import CourseDetail from "@/pages/courses/courseDetail.tsx";
import { request } from "@/lib/api.ts";
import MyCalendar from "@/pages/myCalendar/myCalendar.tsx";
import Profile from "@/pages/profile/profile.tsx";
import Setting from "@/pages/setting/setting.tsx";
import Login from "@/pages/login/login.tsx";
import PageNotFound from "@/pages/errors/404.tsx";
import InFrame from "@/pages/inframe/inframe.tsx";
import { Toaster } from "@/components/ui/sonner.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Navigate to="/home" />,
      },
      {
        path: "home",
        element: <Home />,
        children: [],
      },
      {
        path: "home/apps",
        element: <Apps />,
      },
      {
        path: "home/article/:articleId",
        element: <Article />,
      },
      {
        path: "courses",
        element: <CoursesSearch />,
      },
      {
        path: "courses/:courseId",
        element: <CourseDetail />,
        loader: async ({ params }) => {
          console.log(params);
          if (!params.courseId) {
            return null;
          }
          return await request("/course/detail.php", {
            course_code: params.courseId,
            token: localStorage.getItem("token") || "",
          });
        },
      },
      {
        path: "calendar",
        element: <MyCalendar />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "setting",
        element: <Setting />,
      },
      {
        path: "inframe/:path",
        element: <InFrame />,
      },
    ],
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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AliveScope>
    <RouterProvider router={router} />
    <Toaster />
  </AliveScope>,
);
