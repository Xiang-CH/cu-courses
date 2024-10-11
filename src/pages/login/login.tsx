import { useEffect } from "react";
import { Card } from "@/components/ui/card.tsx";
import { useTranslation } from "react-i18next";
import logo from "@/assets/logo-dark.png";
import "./login.css";
import { useSearchParams, useNavigate } from "react-router-dom";
import { request } from "@/lib/api.ts";
import { toast } from "sonner";

function LoadingIndicator() {
  return (
    <div className="lds-ellipsis ml-1">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

function Login() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const getToken = (url: string, code: string) => {
    request(url, {
      code: code,
    }).then((res) => {
      console.log(res);
      if (res.code == 200) {
        localStorage.setItem("token", res.token);
        toast(t("login.success"));
        const redirect = searchParams.get("callback");
        setTimeout(() => {
          if (redirect) navigate(decodeURIComponent(redirect));
          navigate("/");
        }, 1000);
      } else {
        setTimeout(() => {
          const redirect = searchParams.get("callback");
          if (redirect) navigate(decodeURIComponent(redirect));
          navigate("/");
        }, 2000);
      }
    });
  };

  useEffect(() => {
    const code = searchParams.get("code");
    const triple_uni_token = searchParams.get("token");
    if (!code && !triple_uni_token) {
      navigate("/");
      return;
    }

    if (code) {
      getToken("/user/login/sso.php", code);
      // request("/user/login/sso.php", {
      //   code: code,
      // }).then((res) => {
      //   console.log(res);
      //   if (res.code == 200) {
      //     localStorage.setItem("token", res.token);
      //     toast(t("login.success"));
      //     const redirect = searchParams.get("callback");
      //     setTimeout(() => {
      //       if (redirect) navigate(decodeURIComponent(redirect));
      //       navigate("/");
      //     }, 1000);
      //   } else {
      //     setTimeout(() => {
      //       const redirect = searchParams.get("callback");
      //       if (redirect) navigate(decodeURIComponent(redirect));
      //       navigate("/");
      //     }, 2000);
      //   }
      // });
    } else if (triple_uni_token) {
      getToken("/user/login/tripleuni.php", triple_uni_token);
      // request("/user/login/tripleuni.php", {
      //   token: triple_uni_token,
      // }).then((res) => {
      //   console.log(res);
      //   if (res.code == 200) {
      //     localStorage.setItem("token", res.token);
      //     toast(t("login.success"));
      //     const redirect = searchParams.get("callback");
      //     setTimeout(() => {
      //       if (redirect) navigate(redirect);
      //       navigate("/");
      //     }, 1000);
      //   } else {
      //     setTimeout(() => {
      //       const redirect = searchParams.get("callback");
      //       if (redirect) navigate(redirect);
      //       navigate("/");
      //     }, 2000);
      //   }
      // });
    } else {
      navigate("/");
      return;
    }
  }, []);

  return (
    <div className="w-screen h-screen bg-muted flex justify-center items-center">
      <Card className="flex flex-col w-96 items-center py-16 px-16 bg-primary">
        <div>
          <img src={logo} alt="logo" width={120}></img>
        </div>
        <div className="flex flex-col items-center">
          <LoadingIndicator />
          <div className="text-sm mr-0.5">{t("login.logging-in")}</div>
        </div>
      </Card>
    </div>
  );
}

export default Login;
