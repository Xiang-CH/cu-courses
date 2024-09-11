import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import CourseSearch from "@/components/courseSearch/courseSearch";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function ArrowDownIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
    >
      <path fill="black" d="m15 8l-4.03 6L7 8z"></path>
    </svg>
  );
}

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

const faculties = [
  "engineering",
  "science",
  "art",
  "medical",
  "law",
  "business",
];
const semesters = ["Sem1", "Sem2", "Sem3", "Summer"];

function Courses() {
  const { t } = useTranslation();

  return (
    <ScrollArea className="w-full text-left h-full" scrollHideDelay={0.1}>
      <div id="topOfPage"></div>
      <div className="w-full h-full mt-4 md:mt-9 px-2 md:pl-10 text-left md:pr-20">
        <div className="flex items-center mb-4 pl-2 md:pl-6">
          <Label className="text-2xl md:text-3xl font-black text-secondary">
            {t("courses.search.search")}
          </Label>
          <Separator
            orientation="vertical"
            className="h-6 mx-5 mr-3 bg-secondary w-[2px]"
          />
          <Popover>
            <PopoverTrigger className="flex hover:bg-muted p-2 rounded-lg transition duration-200 ease-in-out">
              <Label className="text-secondary mr-2">
                {t("courses.filter.filter")}
              </Label>
              <FilterIcon />
            </PopoverTrigger>
            <PopoverContent className="mt-2 w-fit">
              <div className="flex flex-col">
                <Label className="text-md text-secondary">
                  {t("courses.filter.faculty")}
                </Label>
                <div className="flex flex-wrap ml-2 w-96 my-2">
                  {faculties.map((faculty, index) => {
                    return (
                      <Badge
                        key={"faculty_" + index}
                        variant="outline"
                        className="mr-2 my-1 py-2 px-4 rounded-sm w-fit bg-background"
                      >
                        {faculty}
                      </Badge>
                    );
                  })}
                </div>

                <Label className="text-md text-secondary mt-2 w-full">
                  {t("courses.filter.semester")}
                </Label>
                <div className="flex flex-wrap ml-2 w-80 my-2">
                  {semesters.map((sem, index) => {
                    return (
                      <Badge
                        key={"semester_" + index}
                        variant="outline"
                        className="mr-2 my-1 py-2 px-4 rounded-sm w-fit bg-background"
                      >
                        {sem}
                      </Badge>
                    );
                  })}
                </div>

                <Label className="text-md text-secondary mt-2">
                  {t("courses.filter.class-time")}
                </Label>
                <div className="flex ml-2 w-96 my-2 items-center">
                  <Badge
                    variant="outline"
                    className="mr-6 my-1 py-2 px-2 rounded-sm w-fit bg-background"
                  >
                    {t("courses.filter.class-select-weekday")}
                    <ArrowDownIcon />
                  </Badge>
                  <Badge
                    variant="outline"
                    className="mr-2 my-1 py-2 px-2 rounded-sm w-fit bg-background"
                  >
                    {t("courses.filter.class-select-start-time")}
                    <ArrowDownIcon />
                  </Badge>
                  <p>-</p>
                  <Badge
                    variant="outline"
                    className="mx-2 my-1 py-2 px-2 rounded-sm w-fit bg-background"
                  >
                    {t("courses.filter.class-select-end-time")}
                    <ArrowDownIcon />
                  </Badge>
                </div>

                <Label className="text-md text-secondary mt-2">
                  {t("courses.filter.workload")}
                </Label>
                <div className="flex ml-2 w-96 my-2 items-center">
                  <Badge
                    variant="outline"
                    className="mr-6 my-1 py-2 px-2 rounded-sm w-fit bg-background"
                  >
                    {t("courses.filter.workload-select")}
                    <ArrowDownIcon />
                  </Badge>
                </div>

                <Label className="text-md text-secondary mt-2">
                  {t("courses.filter.recommendation")}
                </Label>
                <div className="flex ml-2 w-96 my-2 items-center">
                  <Badge
                    variant="outline"
                    className="mr-6 my-1 py-2 px-2 rounded-sm w-fit bg-background"
                  >
                    {t("courses.filter.recommendation-select")}
                    <ArrowDownIcon />
                  </Badge>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <CourseSearch />
      </div>
    </ScrollArea>
  );
}

export default Courses;
