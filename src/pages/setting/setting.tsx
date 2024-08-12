// import React from "react";
import NavBar from "@/components/navbar/navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

import { useTranslation } from "react-i18next";

function Setting() {
  const { t, i18n } = useTranslation();
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language).then(() => {
      // localStorage.setItem("language", language);
      console.log("切换语言", i18n.language);
    });
  };

  return (
    <div className="flex">
      <NavBar currentPath="/settings" />
      <ScrollArea className="w-full h-screen">
        <div className="px-12 py-9 text-left">
          <Label className="text-3xl font-black text-secondary">
            {t("setting.setting")}
          </Label>

          <div className="bg-primary flex flex-col mt-6 px-4 lg:max-w-[800px]">
            {/*<Label className="text-xl font-bold text-secondary">*/}
            {/*  {t("setting.general")}*/}
            {/*</Label>*/}

            <div className="flex my-3 mx-2 justify-between rounded-lg items-center">
              <Label className="text-xl font-normal text-secondary">
                {t("setting.language")}
              </Label>
              <Select
                onValueChange={changeLanguage}
                defaultValue={i18n.language}
              >
                <SelectTrigger className="w-[180px] focus:ring-0">
                  <SelectValue placeholder={t("setting.current-language")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="zh-CH">简体中文</SelectItem>
                  <SelectItem value="zh-HK">繁體中文</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

export default Setting;
