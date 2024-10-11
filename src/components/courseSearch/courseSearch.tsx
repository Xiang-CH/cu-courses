import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { useTranslation } from "react-i18next";
import React, { useEffect, useRef, useState } from "react";
import { request } from "@/lib/api.ts";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { GridLoader } from "react-spinners";

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
  course_review_count?: number;
  course_title_translation: {
    zh_CN: string;
    zh_HK: string;
    en: string;
  };
  course_description_translation: {
    zh_CN: string;
    zh_HK: string;
    en: string;
  };
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

function CourseSearch({
  compact,
  selectedFaculties,
  selectedTerm,
  selectedWeekday,
  selectedStartTime,
  selectedEndTime,
}: {
  compact?: boolean;
  selectedFaculties?: string[];
  selectedTerm?: string;
  selectedWeekday?: string;
  selectedStartTime?: string;
  selectedEndTime?: string;
}) {
  const { t, i18n } = useTranslation();
  const [searchParam, setSearchParam] = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState(searchParam.get("q") || "");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [courseList, setCourseList] = useState<Course[]>([]);
  // const [compactLimit, setCompactLimit] = useState(20);
  const [loading, setLoading] = useState(true);
  const [queryInput, setQueryInput] = useState(query.toString());

  const navigate = useNavigate();

  const lang = i18n.language.replace("-", "_") as "en" | "zh_CN" | "zh_HK";

  useEffect(() => {
    getCourses(page, query || "").then((res) => {
      setCourseList(res);
      setLoading(false);
      document
        .getElementById("topOfPage")
        ?.scrollIntoView({ behavior: "smooth" });

      // const card_height =
      //   document.getElementById("course-search-list")?.offsetHeight;
      // // document.getElementById("CourseSearchCard")?.offsetHeight;
      // if (compact && card_height) {
      //   if (window.innerWidth < 648)
      //     setCompactLimit(Math.floor((card_height - 100) / 72));
      //   else setCompactLimit(Math.floor((card_height - 200) / 50));
      // }
    });
  }, [page, query]);

  useEffect(() => {
    setLoading(true);
    getCourses(1, query || "").then((res) => {
      setCourseList(res);
      setLoading(false);
    });
  }, [
    selectedFaculties,
    selectedTerm,
    selectedWeekday,
    selectedStartTime,
    selectedEndTime,
  ]);

  async function getCourses(page: number, query?: string) {
    if (query) {
      const newQueryParams = new URLSearchParams(searchParam);
      newQueryParams.set("q", query);
      setSearchParam(newQueryParams);
    }

    const res = await request("/course/list.php", {
      token: localStorage.getItem("token") || "",
      page_size: "30",
      page: page.toString(),
      keyword: query ? query : "",
      course_faculty: JSON.stringify(selectedFaculties),
      subclass_term: selectedTerm || "",
      timeslot_weekday: selectedWeekday || "",
      timeslot_start_time: selectedStartTime || "",
      timeslot_end_time: selectedEndTime || "",
    });
    if (res.code == 200) {
      setTotalPage(res.page_count);
      return res.course_list;
    }
    toast(t("errors.error"), {
      icon: "error",
      description: res.msg,
    });
    return [];
  }

  function handleSearch(event?: React.FormEvent) {
    event?.preventDefault();
    if (compact) {
      navigate("/courses?q=" + inputRef.current?.value);
      return;
    }
    setPage(1);
    setQuery(inputRef.current?.value || "");
  }

  return (
    <div className="flex w-full relative">
      <div className="flex-col w-full md:mx-3 relative">
        <form onSubmit={handleSearch} className="relative">
          <Input
            type="search"
            ref={inputRef}
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
            defaultValue={searchParam.get("q") || undefined}
            placeholder={t("courses.search.placeholder")}
            className={`bg-muted border-none transition duration-200 ease-in-out ${compact ? "w-[98%] mx-[1%] py-3" : "w-[96%] mx-[2%] py-2.5 md:py-5 md:px-6"}`}
          />
          {queryInput && (
            <button
              type="button"
              onClick={() => {
                setQueryInput("");
                setQuery("");
                setPage(1);
                setLoading(true);
              }}
              className="bg-muted absolute right-[2rem] top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-full p-0"
            >
              <CrossCircledIcon width="16px" height="16px" />
            </button>
          )}
        </form>
        <div
          className={`w-full bg-primary rounded-lg pb-0  ${compact ? "mt-1 p-0" : "mt-3 p-1"} min-h-[80%]`}
        >
          {loading && (
            <div
              className={`w-full h-full ${compact ? "min-h-[35svh]" : "min-h-[60svh]"} flex justify-center items-center`}
            >
              <GridLoader color="var(--secondary)" />
            </div>
          )}
          {courseList.length > 0 && !loading
            ? courseList.map((course) => {
                // if (compact && index >= compactLimit) {

                // if (
                //   compact
                // ) {
                //   return;
                // } else {
                return (
                  <div key={course.course_code} className="search-course-item">
                    <Link
                      to={{
                        pathname: `/courses/${course.course_code}`,
                      }}
                      className={`flex justify-between items-center py-1 relative hover:bg-muted hover:cursor-pointer transition duration-200 ease-in-out rounded-sm ${compact ? "px-1" : "md:px-4"}`}
                    >
                      <div className="flex flex-col my-1 hover:cursor-pointer px-2 md:px-0">
                        <Label className="hidden font-bold md:block leading-7 hover:cursor-pointer text-sm md:text-md">
                          {course.course_code} - {course.course_title}
                        </Label>
                        <Label className="md:hidden font-bold hover:cursor-pointer text-[0.85em] md:text-md">
                          {course.course_code}
                        </Label>
                        <Label className="md:hidden font-bold hover:cursor-pointer text-xs md:text-md">
                          {course.course_title}
                        </Label>
                        <Label className="text-xs md:text-sm text-muted-foreground hover:cursor-pointer">
                          {lang !== "en" &&
                          course.course_title_translation[lang]
                            ? course.course_title_translation[lang]
                            : course.course_department}
                        </Label>
                      </div>
                      <div className="flex items-center justify-start w-fit mr-3 md:mr-1">
                        <CommentIcon />
                        <Label className="text-xs ml-1 hover:cursor-pointer">
                          {course.course_review_count || 0}
                        </Label>
                      </div>
                    </Link>
                    {!compact && <Separator className="w-[99%] mx-[0.5%]" />}
                  </div>
                );
                // }
              })
            : !loading && (
                <div className="flex justify-center items-center h-10 text-md text-muted-foreground">
                  {t("courses.search.no-result")}
                </div>
              )}
        </div>

        {!compact && courseList.length > 0 && !loading && (
          <Pagination className="hidden md:block my-6 ml-6">
            <PaginationContent>
              {!(page === 1) && (
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setPage(page - 1)}
                    to="#"
                    label={t("courses.pagination.previous")}
                  />
                </PaginationItem>
              )}

              {page >= totalPage - 3 && totalPage > 5 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {page < 3
                ? Array.from(
                    { length: Math.min(5, totalPage) },
                    (_, i) => i + 1,
                  ).map((i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        onClick={() => setPage(i)}
                        to="#"
                        isActive={page === i}
                      >
                        {i}
                      </PaginationLink>
                    </PaginationItem>
                  ))
                : page < totalPage - 3
                  ? Array.from(
                      { length: Math.min(5, totalPage) },
                      (_, i) => i + page - 2,
                    ).map((i) => (
                      <PaginationItem key={i}>
                        <PaginationLink
                          onClick={() => setPage(i)}
                          to="#"
                          isActive={page === i}
                        >
                          {i}
                        </PaginationLink>
                      </PaginationItem>
                    ))
                  : Array.from(
                      { length: Math.min(5, totalPage) },
                      (_, i) => i + totalPage - 4,
                    ).map((i) => (
                      <PaginationItem key={i}>
                        <PaginationLink
                          onClick={() => setPage(i)}
                          to="#"
                          isActive={page === i}
                        >
                          {i}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

              {page < totalPage - 3 && totalPage > 5 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {page < totalPage - 3 && totalPage > 5 && (
                <PaginationItem>
                  <PaginationLink
                    onClick={() => setPage(totalPage)}
                    to="#"
                    isActive={page === totalPage}
                  >
                    {totalPage}
                  </PaginationLink>
                </PaginationItem>
              )}

              {!(page === totalPage) && (
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setPage(page + 1)}
                    to="#"
                    label={t("courses.pagination.next")}
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}

export default CourseSearch;
