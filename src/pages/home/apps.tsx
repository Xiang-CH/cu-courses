import { Label } from "@/components/ui/label.tsx";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Link2Icon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { App } from "@/lib/types";
import { request } from "@/lib/api.ts";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import apps_fill_logo from "@/assets/apps_fill_logo.jpg";

function AppCard({ app, lang }: { app: App; lang: "en" | "zh_cn" | "zh_hk" }) {
  const { t } = useTranslation();
  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex w-full p-4 items-center justify-between pb-5 pt-4 pl-1 pr-4 relative">
        <a
          href={app.app_link}
          target="_blank"
          rel="noreferrer"
          className="w-[90%]"
        >
          <div className="flex items-center w-full transition-all">
            <img
              src={app.app_logo || apps_fill_logo}
              alt={app.app_name_en}
              className="hidden md:block bg-center mx-2 lg:mx-4 transition-all w-[40%] max-w-[200px] lg:max-w-[300px]"
              style={{ objectFit: "cover" }}
            />
            <div className="flex flex-col items-start justify-center mx-1">
              <span className="text-lg font-bold text-secondary">
                {app[`app_name_${lang}`]}
              </span>
              <span className="text-xs text-muted-foreground">
                {app[`app_description_${lang}`]}
              </span>
            </div>
          </div>
        </a>
        <a href={app.app_link} target="_blank" rel="noreferrer">
          <Button className="md:ml-2 bg-accent hover:shadow">
            <Link2Icon className="w-3 h-3 lg:w-5 lg:h-5 lg:mr-3" />
            <span className="hidden lg:block">{t("apps.open-link")}</span>
          </Button>
        </a>
      </div>
      <div className="h-[1px] w-[98%] bg-[#D9D9D9]"></div>
    </div>
  );
}

function Apps() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language.toLowerCase().replace("-", "_") as
    | "en"
    | "zh_cn"
    | "zh_hk";
  const navigate = useNavigate();
  const [apps, setApps] = useState<App[]>([]);

  useEffect(() => {
    request("/info/app.php", {
      token: localStorage.getItem("token") || "",
    }).then((res) => {
      if (res.code === 200) {
        setApps(res.app_list);
      } else {
        toast(t("errors.error"), {
          description: "获取应用列表失败",
        });
        console.log(res.msg);
      }
    });
  }, []);

  return (
    <div className="w-full h-[100vh-3.5em] md:h-screen md:p-4 text-left flex flex-col">
      <div className="flex my-2 md:my-4">
        <Button onClick={() => navigate("/home")}>
          <ChevronLeftIcon className="w-5 h-5 md:w-7 md:h-7 mb-1.5 md:mb-0" />
        </Button>
        <Label className="text-2xl md:text-3xl font-black text-secondary">
          {t("apps.apps")}
        </Label>
      </div>

      <div className="mx-1.5 lg:mx-10 mt-1 md:mt-3">
        <Tabs defaultValue="all" className="w-full self-center">
          <TabsList className="w-full">
            <TabsTrigger value="all" className="min-w-30 w-1/4">
              {t("apps.all")}
            </TabsTrigger>
            <TabsTrigger value="campus" className="min-w-30 w-1/4">
              {t("apps.campus")}
            </TabsTrigger>
            <TabsTrigger value="study" className="min-w-30 w-1/4">
              {t("apps.study")}
            </TabsTrigger>
            <TabsTrigger value="job" className="min-w-30 w-1/4">
              {t("apps.job")}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <ScrollArea className="w-full h-[80vh]">
              <div className="flex flex-col">
                {apps.map((app) => (
                  <AppCard app={app} lang={lang} />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="campus">
            <ScrollArea className="w-full h-[80vh]">
              <div className="flex flex-col">
                {apps
                  .filter((app) => app.app_category === "campus")
                  .map((app) => (
                    <AppCard app={app} lang={lang} />
                  ))}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="study">
            <ScrollArea className="w-full h-[80vh]">
              <div className="flex flex-col">
                {apps
                  .filter((app) => app.app_category === "study")
                  .map((app) => (
                    <AppCard app={app} lang={lang} />
                  ))}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="job">
            <ScrollArea className="w-full h-[80vh]">
              <div className="flex flex-wrap">
                {apps
                  .filter((app) => app.app_category === "job")
                  .map((app) => (
                    <AppCard app={app} lang={lang} />
                  ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Apps;
