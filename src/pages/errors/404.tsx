/**
 * v0 by Vercel.
 * @see https://v0.dev/t/kIt7BttfxRT
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logo from "@/assets/logo-dark.png";

export default function Component() {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <div className="mb-8">
        <img
          src={logo}
          alt="logo"
          className="text-gray-300 text-9xl"
          width={50}
        />
      </div>
      <h1 className="mb-2 text-6xl font-bold text-gray-800">404</h1>
      <p className="mb-4 text-2xl font-light text-gray-600">Page Not Found</p>
      <p className="mb-8 text-lg text-gray-500">
        {t("errors.404-description")}
      </p>
      <Link to="/" className="mb-16 inline-block text-sm">
        <Button
          variant="default"
          className="bg-secondary text-secondary-foreground hover:shadow-lg"
        >
          {t("errors.back-to-home")}
        </Button>
      </Link>
    </div>
  );
}
