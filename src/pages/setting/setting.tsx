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

import { useTranslation } from "react-i18next";

function Setting() {
  const { t, i18n } = useTranslation();
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language).then(() => {
      console.log("切换语言", i18n.language);
    });
  };

  return (
    <div className="flex">
      <NavBar currentPath="/settings" />
      <ScrollArea className="w-full h-screen px-14 py-12 text-left">
        <Label className="text-3xl font-black text-secondary">
          {t("setting.setting")}
        </Label>

        <div className="flex flex-col mt-6 px-4 lg:w-2/3">
          {/*<Label className="text-xl font-bold text-secondary">*/}
          {/*  {t("setting.general")}*/}
          {/*</Label>*/}

          <div className="flex mt-4 justify-between rounded-lg items-center ">
            <Label className="text-xl text-secondary">
              {t("setting.language")}
            </Label>
            <Select onValueChange={changeLanguage} defaultValue={i18n.language}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t("setting.current-language")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="zh-CH">简体中文</SelectItem>
                <SelectItem value="zh-HK">繁體中文</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

export default Setting;
