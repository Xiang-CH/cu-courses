import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { useTranslation } from "react-i18next";
import React, { useEffect, useRef, useState } from "react";
import { request } from "@/lib/api.ts";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

interface Course {
  course_code: string;
  course_title: string;
  course_type: string;
  course_department: string;
  course_career: string;
  course_unit: string;
  course_grading_basis: string;
  course_add_consent: string | null;
  course_drop_consent: string | null;
  course_requirement: string;
  course_description: string;
  course_comment_count?: number;
}

function CommentIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
    >
      <g fill="none">
        <path
          fill="black"
          d="m4.827 7.138l.445.227zm.441 11.594l.354.353zm12.594-2.559l-.227-.445zm1.311-1.311l-.445-.227zm0-7.724l-.445.227zm-1.311-1.311l.227-.446zm-11.724 0l.227.445zm1.07 10.966l.353.353zM5 10.3c0-.848 0-1.455.04-1.93c.038-.469.11-.766.232-1.005l-.89-.454c-.206.403-.296.847-.34 1.378C4 8.814 4 9.469 4 10.3zm0 1.2v-1.2H4v1.2zm-1 0v5h1v-5zm0 5v1.914h1V16.5zm0 1.914c0 .846 1.023 1.27 1.622.671l-.707-.707a.059.059 0 0 1 .028-.013a.046.046 0 0 1 .026.002a.059.059 0 0 1 .03.046zm1.622.671l1.939-1.939l-.707-.707l-1.94 1.94zM14.7 16H7.914v1H14.7zm2.935-.273c-.239.122-.536.195-1.005.234c-.476.039-1.082.039-1.93.039v1c.832 0 1.486 0 2.011-.043c.531-.043.975-.133 1.378-.338zm1.092-1.092a2.5 2.5 0 0 1-1.092 1.092l.454.892a3.5 3.5 0 0 0 1.53-1.53zM19 11.7c0 .848 0 1.455-.04 1.93c-.038.469-.11.766-.233 1.005l.892.454c.205-.403.295-.847.338-1.378c.043-.525.043-1.18.043-2.011zm0-1.4v1.4h1v-1.4zm-.273-2.935c.122.239.195.536.234 1.005C19 8.845 19 9.452 19 10.3h1c0-.832 0-1.486-.043-2.011c-.043-.531-.133-.975-.338-1.378zm-1.092-1.093a2.5 2.5 0 0 1 1.092 1.093l.892-.454a3.5 3.5 0 0 0-1.53-1.53zM14.7 6c.848 0 1.454 0 1.93.04c.469.038.766.11 1.005.232l.454-.89c-.403-.206-.847-.296-1.378-.34C16.186 5 15.531 5 14.7 5zM9.3 6h5.4V5H9.3zm-2.935.272c.239-.121.536-.194 1.005-.233C7.845 6 8.452 6 9.3 6V5c-.832 0-1.486 0-2.011.043c-.531.043-.975.133-1.378.338zM5.272 7.365a2.5 2.5 0 0 1 1.093-1.093l-.454-.89a3.5 3.5 0 0 0-1.53 1.529zm2.289 9.781A.5.5 0 0 1 7.914 17v-1a1.5 1.5 0 0 0-1.06.44z"
        ></path>
        <path
          stroke="black"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.5 9.5h7m-7 3h5"
        ></path>
      </g>
    </svg>
  );
}
// const courseList = [
//   {
//     courseCode: "COMP1001",
//     title: "Introduction to Computer Science",
//     school: "Sch of Computer Science",
//     commentCount: "20",
//   },
//   {
//     courseCode: "COMP1002",
//     title: "Data Structures",
//     school: "Sch of Computer Science",
//     commentCount: "10",
//   },
//   {
//     courseCode: "COMP1003",
//     title: "Algorithm Design and Analysis",
//     school: "Sch of Computer Science",
//     commentCount: "5",
//   },
//   {
//     courseCode: "COMP1004",
//     title: "Operating Systems",
//     school: "Sch of Computer Science",
//     commentCount: "15",
//   },
//   {
//     courseCode: "COMP1005",
//     title: "Software Engineering",
//     school: "Sch of Computer Science",
//     commentCount: "25",
//   },
//   {
//     courseCode: "COMP1002",
//     title: "Data Structures",
//     school: "Sch of Computer Science",
//     commentCount: "10",
//   },
//   {
//     courseCode: "COMP1003",
//     title: "Algorithm Design and Analysis",
//     school: "Sch of Computer Science",
//     commentCount: "5",
//   },
//   {
//     courseCode: "COMP1004",
//     title: "Operating Systems",
//     school: "Sch of Computer Science",
//     commentCount: "15",
//   },
//   {
//     courseCode: "COMP1005",
//     title: "Software Engineering",
//     school: "Sch of Computer Science",
//     commentCount: "25",
//   },
//   {
//     courseCode: "COMP1003",
//     title: "Algorithm Design and Analysis",
//     school: "Sch of Computer Science",
//     commentCount: "5",
//   },
//   {
//     courseCode: "COMP1004",
//     title: "Operating Systems",
//     school: "Sch of Computer Science",
//     commentCount: "15",
//   },
//   {
//     courseCode: "COMP1005",
//     title: "Software Engineering",
//     school: "Sch of Computer Science",
//     commentCount: "25",
//   },
// ];

function CourseSearch({ compact }: { compact?: boolean }) {
  const { t } = useTranslation();
  const [searchParam, setSearchParam] = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const [page, setPage] = useState(1);
  const [courseList, setCourseList] = useState<Course[]>([]);

  useEffect(() => {
    getCourses(page, searchParam.get("q") || "".toString()).then((res) => {
      setCourseList(res);
    });
  }, []);

  async function getCourses(page: number, query?: string) {
    if (!query) {
      const cache = sessionStorage.getItem(
        "courseList_page_" + page.toString(),
      );
      if (cache) {
        return JSON.parse(cache);
      }
    }
    try {
      const res = await request("/course/list.php", {
        page_size: "20",
        page: page.toString(),
        keyword: query ? query : "",
      });
      if (res.code == 200) {
        if (!query) {
          sessionStorage.setItem(
            "courseList_page_" + page.toString(),
            JSON.stringify(res.course_list),
          );
        }
        return res.course_list;
      }
      toast(t("errors.error"), {
        description: res.msg,
      });
      return [];
    } catch {
      toast(t("errors.error"), {
        description: t("errors.network-error"),
      });
      return [];
    }
  }

  function handleSearch(event: React.FormEvent) {
    event.preventDefault();
    setPage(1);
    const newParams = new URLSearchParams(searchParam);
    newParams.set("q", inputRef.current?.value || "");
    setSearchParam(newParams);
    getCourses(1, inputRef.current?.value || "").then((res) => {
      setCourseList(res);
    });
  }

  return (
    <div className="flex w-full overflow-hidden">
      <div className="flex-col w-full min-w-[550px] px-3 pt-2">
        <form onSubmit={handleSearch}>
          <Input
            ref={inputRef}
            defaultValue={searchParam.get("q") || undefined}
            placeholder={t("courses.search.placeholder")}
            className={`w-full bg-muted border-none ${compact ? "py-2 px-3 focus:ring-0" : "py-6 px-6"}`}
          />
        </form>
        <div
          className={`w-full bg-primary rounded-lg pb-0  ${compact ? "mt-1 p-0" : "mt-3 p-1"}`}
        >
          {courseList.length > 0 ? (
            courseList.map((course, index) => {
              if (compact && index >= 2) {
                return;
              } else {
                return (
                  <div key={course.course_code}>
                    <Link
                      // target="_blank"
                      to={{
                        pathname: `/courses/${course.course_code}`,
                      }}
                      className={`flex justify-between items-center py-1 relative hover:bg-muted hover:cursor-pointer rounded-sm ${compact ? "pl-3" : "px-4"}`}
                    >
                      <div className="flex flex-col my-1 w-full hover:cursor-pointer">
                        <Label className="font-bold leading-7 hover:cursor-pointer">
                          {course.course_code} - {course.course_title}
                        </Label>
                        <Label className="text-sm text-muted-foreground hover:cursor-pointer">
                          {course.course_department}
                        </Label>
                      </div>
                      <div className="flex items-center justify-start w-12">
                        <CommentIcon />
                        <Label className="text-xs ml-1 hover:cursor-pointer">
                          {course.course_comment_count || 0}
                        </Label>
                      </div>
                    </Link>
                    {!compact && <Separator className="w-[99%] mx-[0.5%]" />}
                  </div>
                );
              }
            })
          ) : (
            <div className="flex justify-center items-center h-10 text-md text-muted-foreground">
              {t("courses.search.no-result")}
            </div>
          )}
        </div>
      </div>
      {/*<div className="w-16"></div>*/}
    </div>
  );
}

export default CourseSearch;
