import "./App.css";
import { Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import NavBar from "@/components/navbar/navbar.tsx";
import KeepAlive from "react-activation";

function App() {
  const { t } = useTranslation();
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);
  const isInFrame = window.location !== window.parent.location;
  useEffect(() => {
    console.log(
      "isInFrame",
      isInFrame,
      window.location,
      window.parent.location,
    );
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

  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <div
      className={`w-screen h-screen flex-col md:${isInFrame ? "" : "flex-row"} flex min-w-fit relative ${isDark ? "dark" : ""} xl:justify-center`}
    >
      <NavBar />
      <KeepAlive
        id={location.pathname + location.search}
        name={location.pathname}
      >
        <div
          className={`h-[calc(100dvh-3.5em)] md:${isInFrame ? "" : "h-screen"} relative flex`}
        >
          <Outlet />
        </div>
      </KeepAlive>
    </div>
  );
}

export default App;
