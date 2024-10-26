import { useTranslation } from "react-i18next";
import { useParams, useNavigate, useLoaderData } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label.tsx";
import { Card } from "@/components/ui/card.tsx";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area.tsx";
import CourseReviewCard from "@/components/courseReviewCard/courseReviewCard.tsx";
import CoursePieChart from "@/components/courseCharts/coursePieChart";
import CourseBarChart from "@/components/courseCharts/courseBarChart";
import { Separator } from "@/components/ui/separator.tsx";
import React, { useEffect, useState } from "react";
import { CourseDetailApiResponse, CourseDetails, Review } from "@/lib/types.ts";
import PageNotFound from "@/pages/errors/404.tsx";
import AddReview from "@/pages/courses/addReview.tsx";
import { toast } from "sonner";
import { request } from "@/lib/api.ts";
import { useAliveController } from "react-activation";

import "./courseDetail.css";

const initial_course_grades = {
  a: 0,
  "a-": 0,
  "b+": 0,
  b: 0,
  "b-": 0,
  "c+": 0,
  c: 0,
  "c-": 0,
  "d+": 0,
  d: 0,
  pass: 0,
  fail: 0,
};

function CourseDetail() {
  const { t, i18n } = useTranslation();
  const { courseId } = useParams();
  const navigate = useNavigate();
  const courseData = useLoaderData() as CourseDetailApiResponse;
  const [course, setCourse] = useState<CourseDetails>(courseData.course_detail);
  const [courseGrades, setCourseGrades] = useState(initial_course_grades);
  const token = localStorage.getItem("token");
  const aliveController = useAliveController();

  const lang = i18n.language.replace("-", "_") as "en" | "zh_CN" | "zh_HK";

  const courseInfoKeys = [
    "course_add_consent",
    "course_drop_consent",
    "course_requirement",
  ];
  const courseDetailKeys = [
    "course_career",
    "course_unit",
    "course_grading_basis",
    "course_type",
    "course_faculty",
    "course_department",
  ];

  useEffect(() => {
    const new_course_grades = { ...initial_course_grades };
    for (const review in course.review_list) {
      const reviewItem = course.review_list[review] as Review;
      if (!reviewItem.review_grade) continue;
      const gradeKey =
        reviewItem.review_grade.toLowerCase() as keyof typeof initial_course_grades;
      new_course_grades[gradeKey] += 1;
    }
    console.log(new_course_grades);
    setCourseGrades(new_course_grades);
  }, [course]);

  const pattern = /^[A-Za-z]{4}\d{4}$/;
  if (!courseId || !pattern.test(courseId) || courseData.code == 400) {
    return <PageNotFound />;
  }

  if (!courseData) {
    return <div> loading... </div>;
  }

  function addClassToCalendar(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.preventDefault();
    const subclass_id = e.currentTarget.id;
    request("/course/enroll.php", {
      token: token || "",
      subclass_id: subclass_id,
    }).then((res) => {
      if (res.code === 200) {
        toast.success(t("courseDetail.add-class-success"));
        const newCourse = { ...course };
        Object.keys(sessionStorage)
          .filter((key) => key.startsWith("calendarList_"))
          .forEach((key) => sessionStorage.removeItem(key));

        request("/course/detail.php", {
          course_code: courseId || "",
          token: token || "",
        }).then((res) => {
          if (res.code == 200) {
            newCourse.subclass_list = res.course_detail.subclass_list;
            setCourse(newCourse);
            aliveController.refresh(new RegExp("^/calendar")).finally(() => {
              console.log("Calendar page cache refreshed");
              aliveController.refresh(new RegExp("^/home")).finally(() => {
                console.log("Home page cache refreshed");
              });
            });
          }
        });
      }
    });
  }

  return (
    <ScrollArea
      className="w-full h-full md:h-screen text-left gap-1"
      scrollHideDelay={100}
    >
      <div className="px-2 md:px-8 md:py-4 w-full pb-4">
        {/*Header*/}
        <div className="flex my-4 items-start">
          <Button
            className="py-1 px-1 h-fit md:p-1.5"
            onClick={() => {
              window.history.length > 1 ? navigate(-1) : navigate("/courses");
            }}
          >
            <ChevronLeftIcon className="w-5 h-5  md:w-7 md:h-7" />
          </Button>
          <Label className="text-2xl md:text-3xl font-black text-secondary">
            {courseId} - {course.course_title}
            {lang !== "en" && course.course_translation[lang].course_title ? (
              <span className="text-xl md:text-2xl text-muted-foreground">
                <br />
                {course.course_translation[lang].course_title}
              </span>
            ) : null}
          </Label>
        </div>

        {/*Body*/}
        <div className="flex flex-col gap-3 w-max-full w-full relative">
          {/*Course Details*/}
          <div className="flex gap-3 h-fit lg:flex-row flex-col">
            {/*Left Side*/}
            <Card className="w-full lg:w-1/3 flex lg:flex-col py-3 px-4 bg-primary h-min-full gap-2 lg:gap-0">
              <div className="w-1/2 md:w-1/2 lg:w-full">
                <Label className="text-lg">
                  {t("courseDetail.course-detail")}
                </Label>
                <div className="py-1">
                  {courseDetailKeys.map((key: string) => {
                    return (
                      <div className="text-sm mb-0.5" key={key}>
                        {t(`courseDetail.${key}`)}:{" "}
                        {course.course_translation[lang][key] ||
                          t("courseDetail.course-no-data")}
                      </div>
                    );
                  })}
                </div>
              </div>
              <Separator className="mt-1 mb-2 bg-muted hidden lg:block"></Separator>

              <div className="w-1/2 md:w-1/3 lg:w-full">
                <Label className="text-lg">
                  {t("courseDetail.course-info")}
                </Label>
                <div className="py-1">
                  {courseInfoKeys.map((key) => {
                    return (
                      <div className="text-sm mb-0.5" key={key}>
                        {t(`courseDetail.${key}`)}:{" "}
                        {course.course_translation[lang][key] ||
                          t("courseDetail.course-no-data")}
                      </div>
                    );
                  })}
                </div>
              </div>
              <Separator className="mt-1 mb-2 bg-muted hidden lg:block"></Separator>
              <div className="hidden lg:block w-1/3 lg:w-full">
                <Label className="text-lg">
                  {t("courseDetail.course-description")}
                </Label>
                <div className="text-sm py-1">
                  {course.course_translation[lang].course_description}
                </div>
              </div>
            </Card>

            <Card className="lg:hidden py-3 px-4 bg-primary h-min-full">
              <div className="md:block w-full">
                <Label className="text-lg">
                  {t("courseDetail.course-description")}
                </Label>
                <div className="text-sm py-1">
                  {course.course_translation[lang].course_description}
                </div>
              </div>
            </Card>

            {/*Right Side*/}
            <div className="flex flex-col w-full lg:w-2/3 gap-3 h-min-full">
              {/*Course Chart*/}
              <Card className="flex-col md:flex-row w-full flex py-3 px-4 bg-primary h-fit justify-between">
                <div className="flex flex-col items-center w-full md:w-1/2">
                  <Label className="text-lg self-start">
                    {t("courseDetail.course-workload")}
                  </Label>
                  <CoursePieChart
                    data={course.course_workload_level_list}
                    chat_type="wl"
                  />
                </div>
                <div className="hidden md:flex flex-col items-center w-1/2">
                  <Label className="text-lg  self-start">
                    {t("courseDetail.course-recommendation")}
                  </Label>
                  <CoursePieChart
                    data={course.course_recommend_level_list}
                    chat_type="rc"
                  />
                </div>
              </Card>
              {/*Course split to 2 card on small screen*/}
              <Card className="md:hidden md:flex-row w-full flex py-3 px-4 bg-primary h-fit justify-between">
                <div className="flex flex-col items-center w-full">
                  <Label className="text-lg self-start">
                    {t("courseDetail.course-recommendation")}
                  </Label>
                  <CoursePieChart
                    data={course.course_recommend_level_list}
                    chat_type="rc"
                  />
                </div>
              </Card>
              {/*Course grades*/}
              <Card className="flex flex-col w-full py-3 px-4 bg-primary justify-between h-full gap-4 overflow-hidden">
                <Label className="text-lg self-start">
                  {t("courseDetail.course-grades-chart")}
                </Label>
                <CourseBarChart data={courseGrades} />
              </Card>
            </div>
          </div>

          {/*Classes*/}
          {course.subclass_list && course.subclass_list.length > 0 && (
            <Card className="pt-3 pb-0 px-4 bg-primary w-max-full">
              <Label className="text-lg  text-secondary">
                {t("courseDetail.course-classes")}
              </Label>
              <div className="flex">
                <ScrollArea className="my-2 w-1 flex-1 overflow-x-auto pb-3">
                  <div className="flex gap-2.5 lg:gap-5">
                    {course.subclass_list.map((item) => {
                      return (
                        <Card
                          key={item.subclass_id}
                          className="border-none bg-muted shadow-none w-40 lg:w-60 p-2 lg:p-3 min-h-full"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <Label>
                              <span className="text-base lg:text-lg font-bold">
                                {`${item.subclass_section}-${item.subclass_type}`}
                                <br />
                              </span>
                              <span className="text-xs lg:text-sm leading-3">
                                {item.subclass_term}
                              </span>
                            </Label>
                            {item.subclass_enrollment_status ===
                              "available" && (
                              <Button
                                onClick={addClassToCalendar}
                                id={item.subclass_id.toString()}
                                className="mt-1 bg-accent py-1 px-2 h-fit text-xs font-normal hover:shadow transition-all duration-150 addClassButton"
                              >
                                <span className="noHover">
                                  {t("courseDetail.class-available")}
                                </span>
                                <span className="onHover">
                                  {t("courseDetail.add-class-to-calendar")}
                                </span>
                              </Button>
                            )}
                            {item.subclass_enrollment_status === "enrolled" && (
                              <Button
                                onClick={addClassToCalendar}
                                id={item.subclass_id.toString()}
                                className="mt-1 bg-gray-300 py-1 px-2 h-fit text-xs font-normal hover:shadow transition-all duration-150 addClassButton"
                              >
                                <span className="noHover">
                                  {t("courseDetail.enrolled-class")}
                                </span>
                                <span className="onHover">
                                  {t("courseDetail.remove-class-from-calendar")}
                                </span>
                              </Button>
                            )}
                            {item.subclass_enrollment_status === "clashed" && (
                              <Button
                                onClick={addClassToCalendar}
                                id={item.subclass_id.toString()}
                                className="mt-1 bg-red-400 py-1 px-2 h-fit text-xs font-normal hover:shadow transition-all duration-150 addClassButton"
                              >
                                <span className="noHover">
                                  {t("courseDetail.class-clashed")}
                                </span>
                                <span className="onHover">
                                  {t("courseDetail.add-clashed-class")}
                                </span>
                              </Button>
                            )}
                          </div>
                          <div className="flex flex-col lg:gap-1.5 mt-2 lg:mt-4">
                            <div className="text-xs lg:text-sm">
                              <span className="font-bold">
                                {t("courseDetail.class-instructor")}:
                              </span>
                              <br />
                              {(item.subclass_instructor_list[0] &&
                                item.subclass_instructor_list
                                  .map(
                                    (instructor) => instructor.instructor_name,
                                  )
                                  .join(", ")) ||
                                "N/A"}
                              <br />
                              <br />
                              <span className="font-bold">
                                {t("courseDetail.class-time")}:
                              </span>
                              <br />
                              {item.timeslot_list.map((value, index) => {
                                return (
                                  <>
                                    {value.timeslot_weekday} -{" "}
                                    {value.timeslot_display}
                                    <br />
                                    {value.timeslot_venue}
                                    <br />
                                    {index !==
                                      item.timeslot_list.length - 1 && <br />}
                                  </>
                                );
                              })}
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
            </Card>
          )}

          {/*Comments*/}
          <Card className="py-3 px-4 bg-primary w-max-full">
            <div className="flex justify-between items-center">
              <div className="mx-1">
                <Label className="text-lg">
                  {t("courseDetail.course-review")}
                </Label>
              </div>

              {token && courseId ? (
                <AddReview courseId={courseId} />
              ) : (
                <Button
                  onClick={() =>
                    (window.location.href = `https://login.tripleuni.com/CUCampus?callback=${location.pathname}&language=${i18n.language}`)
                  }
                  className="bg-accent py-1.5 px-4 h-fit hover:bg-accentlight"
                >
                  <span>{t("courseDetail.add-course-review")}</span>
                </Button>
              )}
            </div>
            <div className="grid grid-cols-1 gap-4 mt-3 lg:grid-cols-2">
              {course.review_list &&
                course.review_list.map((review, index) => {
                  return (
                    <CourseReviewCard
                      course_data={review}
                      key={index}
                    ></CourseReviewCard>
                  );
                })}
            </div>
          </Card>
        </div>
      </div>
    </ScrollArea>
  );
}

export default CourseDetail;
