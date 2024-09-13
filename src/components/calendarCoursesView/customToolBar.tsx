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
import { AvailableCalendar } from "@/lib/types.ts";
import { Button } from "../ui/button";

const CustomToolbar = ({
  currentDay,
  setCurrentDay,
  props,
  currentYear,
  setCurrentYear,
  currentTerm,
  setCurrentTerm,
  availability,
}: {
  currentDay?: Date;
  setCurrentDay?: React.Dispatch<SetStateAction<Date>>;
  props: ToolbarProps;
  currentYear?: string;
  setCurrentYear?: React.Dispatch<SetStateAction<string>>;
  currentTerm?: string;
  setCurrentTerm?: React.Dispatch<SetStateAction<string>>;
  availability?: AvailableCalendar;
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

  const YearTermSelector = () => {
    return (
      <Popover>
        <PopoverTrigger>
        <Button
            variant="outline"
            className="hover:bg-muted"
          >
            <span className="hidden md:block">{currentYear + " | " + currentTerm}</span>
            <span className="text-xl mb-[0.2em] md:ml-1">&#9662;</span>
          </Button>
          
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
                {availability &&
                  Object.keys(availability).length > 0 &&
                  Object.keys(availability).map((year) => {
                    return (
                      <SelectItem
                        key={"year_" + year}
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
              {availability &&
                currentYear &&
                availability[currentYear] &&
                Object.keys(availability[currentYear]).length > 0 &&
                Object.keys(availability[currentYear]).map((term) => {
                  return (
                    <button
                      key={"term_" + term}
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
    );
  };

  return (
    <>
      <div className="w-full bottom-0 md:relative flex justify-between md:mb-4 px-2 bg-primary h-fit z-20 py-3 md:py-0">
        <Button
          onClick={goToToday}
          variant="outline"
          className="hover:bg-muted"
        >
          {t("myCalendar.today")}
        </Button>

        <div className="flex items-center">
          <Button
            onClick={goToBack}
            className="hover:bg-muted text-lg"
          >
            &lt;
          </Button>
          <Label className="font-bold text-sm md:text-base mx-2 w-[120px] md:w-[150px] text-center">{props.label}</Label>
          <Button
            onClick={goToNext}
            className="hover:bg-muted text-lg"
          >
            &gt;
          </Button>
        </div>

        <div className="">
          <YearTermSelector />
        </div>
      </div>
    </>
  );
};

export default CustomToolbar;
