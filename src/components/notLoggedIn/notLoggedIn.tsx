import logo from "@/assets/logo-dark.png";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import i18n from "i18next";
import { useTranslation } from "react-i18next";

function NotLoggedIn() {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <div className="w-full absolute top-0 left-0 z-[50]">
      <div className="w-full h-full absolute top-0 left-0 opacity-80 bg-gray-200 z-[0]"></div>
      <div className="flex min-h-[calc(100svh-3.5rem)] md:min-h-[100svh] flex-col items-center justify-center p-4 text-center z-[100]">
        <div className="mb-8 z-[100]">
          <img
            src={logo}
            alt="logo"
            className="text-gray-300 text-9xl"
            width={50}
          />
        </div>
        <h2 className="mb-2 text-6xl font-bold text-gray-800 z-[100]">
          {t("errors.not-logged-in")}
        </h2>

        <p className="mt-1 mb-8 text-lg text-gray-500 z-[100]">
          {t("errors.not-logged-in-description")}
        </p>
        <div className="flex flex-col md:flex-row w-fit gap-4 mb-16">
          <Link to="/home" className="inline-block text-sm z-[100]">
            <Button
              variant="default"
              className="bg-gray-300 text-secondary hover:shadow-lg px-8"
            >
              {t("errors.back-to-home")}
            </Button>
          </Link>
          <Link
            className="inline-block text-sm z-[100]"
            to={`https://login.tripleuni.com/CUCampus?callback${encodeURIComponent(location.pathname)}&language=${i18n.language}`}
          >
            <Button
              variant="default"
              className="bg-secondary text-secondary-foreground hover:shadow-lg px-8"
            >
              {t("login.login-now")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotLoggedIn;
