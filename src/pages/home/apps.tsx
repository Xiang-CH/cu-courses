import NavBar from "@/components/navbar/navbar";
import { Label } from "@/components/ui/label.tsx";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Link2Icon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface App {
  name: string;
  description: string;
  icon?: string;
  url: string;
  category?: "campus" | "study" | "job";
}

const apps: App[] = [
  {
    name: "CUHK CUSIS",
    description:
      "The Chinese University of Hong Kong Student Information System",
    icon: "https://sts.cuhk.edu.hk/adfs/portal/images/cuhkitsc_logo.jpg",
    url: "https://cusis.cuhk.edu.hk/",
    category: "campus",
  },
  {
    name: "CUHK Library",
    description: "The Chinese University of Hong Kong Library",
    icon: "https://www.lib.cuhk.edu.hk/wp-content/themes/twentytwenty/assets/images/cu_logo_desktop_2.png",
    url: "https://www.lib.cuhk.edu.hk/",
    category: "study",
  },
  {
    name: "CUHK Job Board",
    description: "The Chinese University of Hong Kong Job Board",
    icon: "https://www.career.cuhk.edu.hk/wp-content/uploads/2020/07/cropped-LOGO-1-32x32.png",
    url: "https://www.career.cuhk.edu.hk/",
    category: "job",
  },
];

function AppCard({ app }: { app: App }) {
  const { t } = useTranslation();
  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex w-full p-4 items-center justify-between pb-6 pt-5">
        <a href={app.url} target="_blank" rel="noreferrer">
          <div className="flex items-center w-full transition-all">
            <img
              src={app.icon}
              alt={app.name}
              className="h-16 bg-center w-0 mx-0 lg:mx-4 lg:w-72 transition-all"
            />
            <div className="flex flex-col items-start justify-center">
              <span className="text-lg font-bold text-secondary">
                {app.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {app.description}
              </span>
            </div>
          </div>
        </a>
        <a href={app.url} target="_blank" rel="noreferrer">
          <Button className="ml-4 bg-accent hover:shadow">
            <Link2Icon className="w-5 h-5 mr-3" />
            <span>{t("apps.open-link")}</span>
          </Button>
        </a>
      </div>
      <div className="h-[1px] w-[98%] bg-[#D9D9D9]"></div>
    </div>
  );
}

function Apps() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex max-w-full w-full">
      <NavBar currentPath="/home" />
      <div className="w-full h-screen p-4 text-left flex flex-col">
        <div className="flex my-4">
          <Button onClick={() => navigate("/home")}>
            <ChevronLeftIcon className="w-7 h-7" />
          </Button>
          <Label className="text-3xl font-black text-secondary">
            {t("apps.apps")}
          </Label>
        </div>

        <div className="mx-10 mt-3">
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
              <ScrollArea className="w-full h-full">
                <div className="flex flex-col">
                  {apps.map((app) => (
                    <AppCard app={app} />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="campus">
              <ScrollArea className="w-full h-full">
                <div className="flex flex-col">
                  {apps
                    .filter((app) => app.category === "campus")
                    .map((app) => (
                      <AppCard app={app} />
                    ))}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="study">
              <ScrollArea className="w-full h-full">
                <div className="flex flex-col">
                  {apps
                    .filter((app) => app.category === "study")
                    .map((app) => (
                      <AppCard app={app} />
                    ))}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="job">
              <ScrollArea className="w-full h-full">
                <div className="flex flex-wrap">
                  {apps
                    .filter((app) => app.category === "job")
                    .map((app) => (
                      <AppCard app={app} />
                    ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Apps;
