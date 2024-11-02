import "./App.css";
import { Outlet, useLocation, useNavigation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

import DotLoader from "react-spinners/BounceLoader";
import NavBar from "@/components/navbar/navbar.tsx";
import KeepAlive from "react-activation";

function App() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigation = useNavigation();
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

    if (isInFrame) {
      const obj = document.getElementsByClassName(
        "ka-wrapper",
      )[0] as HTMLElement;
      obj.style.height = "calc(100% - 3.5rem)";
    }
  }, [location]);

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
      className={`w-screen h-[100svh] flex-col md:${isInFrame ? "" : "flex-row"} flex min-w-fit relative ${isDark ? "dark" : ""} xl:justify-center`}
    >
      <NavBar />
      <KeepAlive
        id={location.pathname + location.search}
        name={location.pathname}
        className={`flex-shrink`}
      >
        <div className={`h-full relative flex`}>
          {navigation.state == "loading" && (
            <div className="w-full h-full absolute flex justify-center items-center z-40">
              <div className="w-full h-full bg-muted opacity-60 absolute"></div>
              <DotLoader color="var(--secondary)" />
            </div>
          )}
          <Outlet />
        </div>
      </KeepAlive>
    </div>
  );
}

export default App;
