import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ResetIcon } from "@radix-ui/react-icons";
import CourseSearch from "@/components/courseSearch/courseSearch";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { useState } from "react";
// import { useLocation, useSearchParams, useNavigate } from "react-router-dom";

function FilterIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 32 32"
    >
      <path
        fill="none"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M2 5s4-2 14-2s14 2 14 2L19 18v9l-6 3V18z"
      ></path>
    </svg>
  );
}

// const weekdays = [
//   { value: "Mo", display: "Monday" },
//   { value: "Tu", display: "Tuesday" },
//   { value: "We", display: "Wednesday" },
//   { value: "Th", display: "Thursday" },
//   { value: "Fr", display: "Friday" },
//   { value: "Sa", display: "Saturday" },
//   { value: "Su", display: "Sunday" },
// ];
const terms = ["Term 1", "Term 2", "Term 3", "Term 4", "Summer Session"];
// const times = [
//   { value: 510, display: "8:30" },
//   { value: 570, display: "9:30" },
//   { value: 630, display: "10:30" },
//   { value: 690, display: "11:30" },
//   { value: 750, display: "12:30" },
//   { value: 810, display: "13:30" },
//   { value: 870, display: "14:30" },
//   { value: 930, display: "15:30" },
//   { value: 990, display: "16:30" },
//   { value: 1050, display: "17:30" },
//   { value: 1110, display: "18:30" },
//   { value: 1170, display: "19:30" },
//   { value: 1230, display: "20:30" },
//   { value: 1290, display: "21:30" },
//   { value: 1350, display: "22:30" },
// ];

function Courses() {
  const { t } = useTranslation();
  // const navigate = useNavigate();
  // const location = useLocation();
  // const [searchParams, setSearchParams] = useSearchParams();
  const [selectedFaculties, setSelectedFaculties] = useState<string[]>([]);
  const [selectedTerm, setSelectedTerm] = useState<string>("");
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  // const [selectedWeekday, setSelectedWeekday] = useState<string>("");
  // const [selectedStartTime, setSelectedStartTime] = useState<string>("");
  // const [selectedEndTime, setSelectedEndTime] = useState<string>("");

  const faculties = t("faculties", { returnObjects: true }) as {
    [key: string]: string;
  };

  const toggleFacultySelection = (faculty: string) => {
    setSelectedFaculties((prevSelected) =>
      prevSelected.includes(faculty)
        ? prevSelected.filter((item) => item !== faculty)
        : [...prevSelected, faculty],
    );
  };

  return (
    <ScrollArea className="w-full text-left h-full" scrollHideDelay={0.1}>
      <div id="topOfPage"></div>
      {openPopover && (
        <div className="lg:hidden absolute w-full h-full bg-gray-200 z-40 opacity-50" />
      )}
      <div className="w-full h-full mt-4 md:mt-9 px-2 md:pl-10 text-left md:pr-20 ">
        <div className="flex items-center mb-4 pl-2 md:pl-6">
          <Label className="text-2xl md:text-3xl font-black text-secondary">
            {t("courses.search.search")}
          </Label>
          <Separator
            orientation="vertical"
            className="h-6 mx-5 mr-3 bg-secondary w-[2px]"
          />
          <Popover open={openPopover} onOpenChange={setOpenPopover}>
            <PopoverTrigger className="flex hover:bg-muted p-2 rounded-lg transition duration-200 ease-in-out">
              <Label className="text-secondary mr-2">
                {t("courses.filter.filter")}
              </Label>
              <FilterIcon />
            </PopoverTrigger>
            <PopoverContent className="mt-2 min-w-fit w-screen md:w-[27rem] md:pr-5 relative">
              <div className="flex flex-col w-full">
                {/*筛选学院*/}
                <div className="flex items-center gap-1">
                  <Label className="text-md text-secondary">
                    {t("courses.filter.faculty")}
                  </Label>
                  <ResetIcon
                    className="hover:cursor-pointer"
                    onClick={() => {
                      if (selectedFaculties.length > 0) {
                        setSelectedFaculties([]);
                      }
                    }}
                  />
                </div>
                <div className="flex flex-wrap ml-2 w-full my-2 gap-1.5">
                  {Object.keys(faculties).map((faculty, index) => {
                    const isSelected = selectedFaculties.includes(faculty);
                    return (
                      <Badge
                        key={"faculty_" + index}
                        variant="outline"
                        className={`py-2 px-4 rounded-sm w-fit bg-background hover:cursor-pointer ${
                          isSelected
                            ? "bg-secondary text-secondary-foreground"
                            : ""
                        }`}
                        onClick={() => toggleFacultySelection(faculty)}
                      >
                        {faculties[faculty]}
                      </Badge>
                    );
                  })}
                </div>

                {/*筛选学期*/}
                <div className="flex items-center gap-1 mt-2">
                  <Label className="text-md text-secondary">
                    {t("courses.filter.semester")}
                  </Label>
                  <ResetIcon
                    className="hover:cursor-pointer"
                    onClick={() => {
                      if (selectedTerm) {
                        setSelectedTerm("");
                      }
                    }}
                  />
                </div>
                <div className="flex flex-wrap ml-2 w-full my-2 gap-1.5">
                  {terms.map((term, index) => {
                    const isSelected = selectedTerm == term;
                    return (
                      <Badge
                        key={"semester_" + index}
                        variant="outline"
                        className={`py-2 px-4 rounded-sm w-fit bg-background hover:cursor-pointer ${
                          isSelected
                            ? "bg-secondary text-secondary-foreground"
                            : ""
                        }`}
                        onClick={() => {
                          setSelectedTerm(term);
                        }}
                      >
                        {term}
                      </Badge>
                    );
                  })}
                </div>

                {/*筛选上课时间*/}
                {/*<div className="flex items-center gap-1 mt-2">*/}
                {/*  <Label className="text-md text-secondary">*/}
                {/*    {t("courses.filter.class-time")}*/}
                {/*  </Label>*/}
                {/*  <ResetIcon*/}
                {/*    className="hover:cursor-pointer"*/}
                {/*    onClick={() => {*/}
                {/*      if (*/}
                {/*        selectedWeekday ||*/}
                {/*        selectedStartTime ||*/}
                {/*        selectedEndTime*/}
                {/*      ) {*/}
                {/*        setSelectedWeekday("");*/}
                {/*        setSelectedStartTime("");*/}
                {/*        setSelectedEndTime("");*/}
                {/*      }*/}
                {/*    }}*/}
                {/*  />*/}
                {/*</div>*/}

                {/*<div className="flex ml-2 w-full my-2 items-center flex-wrap">*/}
                {/*  /!*选择筛选日期*!/*/}
                {/*  <Select*/}
                {/*    onValueChange={setSelectedWeekday}*/}
                {/*    value={selectedWeekday}*/}
                {/*  >*/}
                {/*    <SelectTrigger className="mr-4 py-2 px-3 rounded-sm w-28 min-w-fit bg-background h-fit text-xs font-medium ">*/}
                {/*      <SelectValue*/}
                {/*        className="h-fit"*/}
                {/*        placeholder={t("courses.filter.class-select-weekday")}*/}
                {/*      />*/}
                {/*    </SelectTrigger>*/}
                {/*    <SelectContent>*/}
                {/*      {weekdays.map((weekday, index) => (*/}
                {/*        <SelectItem*/}
                {/*          key={"weekday_" + index}*/}
                {/*          value={weekday.value}*/}
                {/*        >*/}
                {/*          {weekday.display}*/}
                {/*        </SelectItem>*/}
                {/*      ))}*/}
                {/*    </SelectContent>*/}
                {/*  </Select>*/}

                {/*  /!*选择筛选开始时间*!/*/}
                {/*  <div className="flex items-center">*/}
                {/*    <Select*/}
                {/*      onValueChange={setSelectedStartTime}*/}
                {/*      value={selectedStartTime}*/}
                {/*    >*/}
                {/*      <SelectTrigger className="mr-2 my-1 py-2 px-3 rounded-sm w-24 min-w-fit bg-background text-xs font-medium h-fit">*/}
                {/*        <SelectValue*/}
                {/*          className="h-fit"*/}
                {/*          placeholder={t(*/}
                {/*            "courses.filter.class-select-start-time",*/}
                {/*          )}*/}
                {/*        />*/}
                {/*      </SelectTrigger>*/}
                {/*      <SelectContent>*/}
                {/*        {times.map((time, index) => (*/}
                {/*          <SelectItem*/}
                {/*            key={"start_time" + index}*/}
                {/*            value={time.value.toString()}*/}
                {/*          >*/}
                {/*            {time.display}*/}
                {/*          </SelectItem>*/}
                {/*        ))}*/}
                {/*      </SelectContent>*/}
                {/*    </Select>*/}

                {/*    <p>-</p>*/}

                {/*    /!*选择筛选结束时间*!/*/}
                {/*    <Select*/}
                {/*      onValueChange={setSelectedEndTime}*/}
                {/*      disabled={!selectedStartTime}*/}
                {/*      value={selectedEndTime}*/}
                {/*    >*/}
                {/*      <SelectTrigger className="ml-2 my-1 py-2 px-3 rounded-sm w-24 min-w-fit bg-background text-xs font-medium h-fit">*/}
                {/*        <SelectValue*/}
                {/*          className="h-fit"*/}
                {/*          placeholder={t(*/}
                {/*            "courses.filter.class-select-end-time",*/}
                {/*          )}*/}
                {/*        />*/}
                {/*      </SelectTrigger>*/}
                {/*      <SelectContent>*/}
                {/*        {times.map((time, index) => {*/}
                {/*          if (time.value < parseInt(selectedStartTime) + 60)*/}
                {/*            return;*/}
                {/*          return (*/}
                {/*            <SelectItem*/}
                {/*              key={"start_time" + index}*/}
                {/*              value={time.value.toString()}*/}
                {/*            >*/}
                {/*              {time.display}*/}
                {/*            </SelectItem>*/}
                {/*          );*/}
                {/*        })}*/}
                {/*      </SelectContent>*/}
                {/*    </Select>*/}
                {/*  </div>*/}
                {/*</div>*/}

                {/*<Label className="text-md text-secondary mt-2">*/}
                {/*  {t("courses.filter.workload")}*/}
                {/*</Label>*/}
                {/*<div className="flex ml-2 w-96 my-2 items-center">*/}
                {/*  <Badge*/}
                {/*    variant="outline"*/}
                {/*    className="mr-6 my-1 py-2 px-2 rounded-sm w-fit bg-background"*/}
                {/*  >*/}
                {/*    {t("courses.filter.workload-select")}*/}
                {/*    <ArrowDownIcon />*/}
                {/*  </Badge>*/}
                {/*</div>*/}

                {/*<Label className="text-md text-secondary mt-2">*/}
                {/*  {t("courses.filter.recommendation")}*/}
                {/*</Label>*/}
                {/*<div className="flex ml-2 w-96 my-2 items-center">*/}
                {/*  <Badge*/}
                {/*    variant="outline"*/}
                {/*    className="mr-6 my-1 py-2 px-2 rounded-sm w-fit bg-background"*/}
                {/*  >*/}
                {/*    {t("courses.filter.recommendation-select")}*/}
                {/*    <ArrowDownIcon />*/}
                {/*  </Badge>*/}
                {/*</div>*/}
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <CourseSearch
          // selectedWeekday={selectedWeekday}
          selectedTerm={selectedTerm}
          selectedFaculties={selectedFaculties}
          // selectedStartTime={selectedStartTime}
          // selectedEndTime={selectedEndTime}
        />
      </div>
    </ScrollArea>
  );
}

export default Courses;
