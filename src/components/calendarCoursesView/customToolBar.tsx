import React, { SetStateAction, useEffect } from "react";
import { ToolbarProps } from "react-big-calendar";
import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CustomToolbar = ({
  currentDay,
  setCurrentDay,
  props,
  currentYear,
  setCurrentYear,
  currentTerm,
  setCurrentTerm,
  availableYears,
  availableTerms,
}: {
  currentDay?: Date;
  setCurrentDay?: React.Dispatch<SetStateAction<Date>>;
  props: ToolbarProps;
  currentYear?: string;
  setCurrentYear?: React.Dispatch<SetStateAction<string>>;
  currentTerm?: string;
  setCurrentTerm?: React.Dispatch<SetStateAction<string>>;
  availableYears?: string[];
  availableTerms?: { [key: string]: string[] };
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    props.onNavigate("DATE", currentDay);
  }, [currentDay]);

  const goToBack = () => {
    const { date } = props;
    const newDate = new Date(date);
    newDate.setDate(date.getDate() - 7);
    if (setCurrentDay) setCurrentDay(newDate);
  };

  const goToNext = () => {
    const { date } = props;
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + 7);
    if (setCurrentDay) setCurrentDay(newDate);
  };

  const goToToday = () => {
    const { onNavigate } = props;
    if (setCurrentDay) setCurrentDay(new Date());
    onNavigate("TODAY");
  };

  // const handleViewChange = (view: View) => {
  //   props.onView(view);
  // };

  return (
    <div className="flex justify-between mb-4">
      <button
        onClick={goToToday}
        className="rounded-3xl shadow px-4 py-2 text-sm"
      >
        {t("myCalendar.today")}
      </button>

      <div className="flex items-center">
        <button
          className="rounded-full shadow px-4 pt-2 mr-4 pb-2.5"
          onClick={goToBack}
        >
          &lt;
        </button>
        <Label className="font-bold text-sm">{props.label}</Label>
        <button
          className="rounded-full shadow px-4 py-2 ml-4 pb-2.5"
          onClick={goToNext}
        >
          &gt;
        </button>
      </div>

      <Popover>
        <PopoverTrigger className="px-3 shadow border-0 focus:ring-0 rounded-3xl text-sm flex items-center">
          {currentYear + " | " + currentTerm}
          <span className="text-xl mb-[0.2em] ml-1">&#9662;</span>
        </PopoverTrigger>
        <PopoverContent className="mr-4">
          <div className="flex flex-col">
            <Label className="text-sm text-secondary">
              {t("myCalendar.year")}
            </Label>
            <Select defaultValue={currentYear}>
              <SelectTrigger className="w-[180px] focus:ring-0 my-2 ml-1">
                <SelectValue placeholder={t("myCalendar.select-year")} />
              </SelectTrigger>
              <SelectContent className="hover:bg-muted">
                {availableYears &&
                  availableYears.length > 0 &&
                  availableYears.map((year, index) => {
                    return (
                      <SelectItem
                        key={"year_" + index}
                        value={year}
                        onSelect={() => {
                          if (setCurrentYear) setCurrentYear(year);
                        }}
                      >
                        {year}
                      </SelectItem>
                    );
                  })}
              </SelectContent>
            </Select>

            <Label className="text-sm text-secondary mt-2 w-full">
              {t("myCalendar.term")}
            </Label>
            <div className="flex flex-wrap mx-1 w-80 my-2">
              {availableTerms &&
                currentYear &&
                availableTerms[currentYear] &&
                availableTerms[currentYear].length > 0 &&
                availableTerms[currentYear].map((term, index) => {
                  return (
                    <button
                      key={"term_" + index}
                      onClick={() => {
                        if (setCurrentTerm) setCurrentTerm(term);
                      }}
                      className={
                        "border border-input rounded-md px-4 py-1.5 mr-2 my-1 text-sm" +
                        (currentTerm === term
                          ? " bg-secondary text-secondary-foreground"
                          : " bg-background text-secondary hover:bg-muted")
                      }
                    >
                      {term}
                    </button>
                  );
                })}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CustomToolbar;
