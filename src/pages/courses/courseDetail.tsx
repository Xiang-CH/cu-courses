import { useTranslation } from "react-i18next";
import { useParams, useNavigate, useLoaderData } from "react-router-dom";
import NavBar from "@/components/navbar/navbar.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label.tsx";
import { Card } from "@/components/ui/card.tsx";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area.tsx";
import CourseReviewCard from "@/components/courseReviewCard/courseReviewCard.tsx";
import CoursePieChart from "@/pages/courses/coursePieChart.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import React, { useState } from "react";
import { CourseDetailApiResponse, CourseDetails } from "@/lib/types.ts";
import PageNotFound from "@/pages/errors/404.tsx";
import AddReview from "@/pages/courses/addReview.tsx";
import { toast } from "sonner";
import { request } from "@/lib/api.ts";

import "./courseDetail.css";

function SubclassInfoBadge({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <Card className="flex px-2 py-1 shadow-none w-full">
      <Label className="text-xs flex items-start">
        {title}: {content}
      </Label>
    </Card>
  );
}

function CourseDetail() {
  const { t } = useTranslation();
  const { courseId } = useParams();
  const navigate = useNavigate();
  const courseData = useLoaderData() as CourseDetailApiResponse;
  const [course, setCourse] = useState<CourseDetails>(courseData.course_detail);
  const token = localStorage.getItem("token");

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

        request("/course/detail.php", {
          course_code: courseId || "",
          token: token || "",
        }).then((res) => {
          toast.success(t("courseDetail.add-class-success"));
          if (res.code == 200) {
            newCourse.subclass_list = res.course_detail.subclass_list;
            sessionStorage.removeItem("calendar_events");
            sessionStorage.removeItem("today_courses");
            setCourse(newCourse);
          } else {
            toast.error(t("courseDetail.add-class-fail") + ": " + res.msg);
          }
        });
      } else {
        toast.error(t("courseDetail.add-class-fail") + ": " + res.msg);
      }
    });
  }

  return (
    <div className="flex-col md:flex-row flex w-screen relative">
      <NavBar currentPath="/courses" />
      <ScrollArea
        className="w-full h-[calc(100vh-60px)] md:h-screen text-left gap-1"
        scrollHideDelay={100}
      >
        <div className="px-2 md:px-8 md:py-4 w-full">
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
            <Label className="text-xl md:text-3xl font-black text-secondary">
              {courseId} - {course.course_title}
            </Label>
          </div>

          {/*Body*/}
          <div className="flex flex-col gap-3 w-max-full w-full relative">
            {/*Course Details*/}
            <div className="flex gap-3 h-fit lg:flex-row flex-col">
              {/*Left Side*/}
              <Card className="w-full lg:w-1/3 flex lg:flex-col py-3 px-4 bg-primary h-min-full gap-2 lg:gap-0">
                <div className="w-1/2 md:w-1/3 lg:w-full">
                  <Label className="text-md">
                    {t("courseDetail.course-detail")}
                  </Label>
                  <div className="py-1">
                    {courseDetailKeys.map((key: string) => {
                      return (
                        <div className="text-xs mb-0.5" key={key}>
                          {t(`courseDetail.${key}`)}: {course[key] || "N/A"}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <Separator className="mt-1 mb-2 bg-muted hidden lg:block"></Separator>

                <div className="w-1/2 md:w-1/3 lg:w-full">
                  <Label className="text-md">
                    {t("courseDetail.course-info")}
                  </Label>
                  <div className="py-1">
                    {courseInfoKeys.map((key) => {
                      return (
                        <div className="text-xs mb-0.5" key={key}>
                          {t(`courseDetail.${key}`)}: {course[key] || "N/A"}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <Separator className="mt-1 mb-2 bg-muted hidden lg:block"></Separator>
                <div className="hidden md:block w-1/3 lg:w-full">
                  <Label className="text-md">
                    {t("courseDetail.course-description")}
                  </Label>
                  <div className="text-xs py-1">
                    {course.course_description}
                  </div>
                </div>
              </Card>

              <Card className="md:hidden py-3 px-4 bg-primary h-min-full">
                <div className="md:block w-full">
                  <Label className="text-md">
                    {t("courseDetail.course-description")}
                  </Label>
                  <div className="text-xs py-1">
                    {course.course_description}
                  </div>
                </div>
              </Card>

              {/*Right Side*/}
              <div className="flex flex-col w-full lg:w-2/3 gap-3 h-min-full">
                {/*Course Chart*/}
                <Card className="flex-col md:flex-row w-full flex py-3 px-4 bg-primary h-fit justify-between">
                  <div className="flex flex-col items-center w-full md:w-1/2">
                    <Label className="text-md self-start">
                      {t("courseDetail.course-workload")}
                    </Label>
                    <CoursePieChart
                      data={course.course_workload_level_list}
                      chat_type="wl"
                    />
                  </div>
                  <div className="hidden md:flex flex-col items-center w-1/2">
                    <Label className="text-md">
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
                    <Label className="text-md self-start">
                      {t("courseDetail.course-recommendation")}
                    </Label>
                    <CoursePieChart
                      data={course.course_recommend_level_list}
                      chat_type="rc"
                    />
                  </div>
                </Card>
                {/*Course Readings*/}
                <Card className="hidden md:flex w-full py-3 px-4 bg-primary justify-between h-full gap-2 overflow-hidden">
                  <div className="flex flex-col items-center h-full w-1/2">
                    <Label className="text-md mb-2">
                      {t("courseDetail.course-must_reads")}
                    </Label>
                    <Card className="w-full h-full py-2 px-4 shadow-none">
                      <div className="text-xs">
                        {course.must_reads || "N/A"}
                      </div>
                    </Card>
                  </div>
                  <div className="w-[1px] bg-gray-400 mt-7 mx-2"></div>
                  <div className="flex flex-col items-center h-full w-1/2">
                    <Label className="text-md mb-2">
                      {t("courseDetail.course-recommended_books")}
                    </Label>
                    <Card className="w-full h-full py-2 px-4 shadow-none">
                      <div className="text-xs">
                        {course.recommended_books || "N/A"}
                      </div>
                    </Card>
                  </div>
                </Card>
              </div>
            </div>

            {/*Classes*/}
            <Card className="pt-3 pb-0 px-4 bg-primary w-max-full">
              <Label className="text-md  text-secondary">
                {t("courseDetail.course-classes")}
              </Label>
              <div className="flex">
                <ScrollArea className="my-2 w-1 flex-1 overflow-x-auto pb-3">
                  <div className="flex gap-5">
                    {course.subclass_list &&
                      course.subclass_list.map((item) => {
                        return (
                          <Card
                            key={item.subclass_id}
                            className="border-2 w-60 bg-primary border-secondary py-2 px-3 min-h-full"
                          >
                            <div className="flex justify-between items-center mb-2">
                              <Label className="text-sm font-bold">
                                {`${item.subclass_section}-${item.subclass_type}(${item.subclass_number})`}
                              </Label>
                              {item.subclass_enrollment_status ===
                                "available" && (
                                <Button
                                  onClick={addClassToCalendar}
                                  id={item.subclass_id.toString()}
                                  className="bg-accent py-1 px-2 h-fit text-xs font-normal hover:shadow transition-all duration-150 addClassButton"
                                >
                                  <span className="noHover">
                                    {t("courseDetail.class-available")}
                                  </span>
                                  <span className="onHover">
                                    {t("courseDetail.add-class-to-calendar")}
                                  </span>
                                </Button>
                              )}
                              {item.subclass_enrollment_status ===
                                "enrolled" && (
                                <Button
                                  onClick={addClassToCalendar}
                                  id={item.subclass_id.toString()}
                                  className="bg-gray-300 py-1 px-2 h-fit text-xs font-normal hover:shadow transition-all duration-150 addClassButton"
                                >
                                  <span className="noHover">
                                    {t("courseDetail.enrolled-class")}
                                  </span>
                                  <span className="onHover">
                                    {t(
                                      "courseDetail.remove-class-from-calendar",
                                    )}
                                  </span>
                                </Button>
                              )}
                              {item.subclass_enrollment_status ===
                                "clashed" && (
                                <Button
                                  onClick={addClassToCalendar}
                                  id={item.subclass_id.toString()}
                                  className="bg-red-400 py-1 px-2 h-fit text-xs font-normal hover:shadow transition-all duration-150 addClassButton"
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
                            <div className="flex flex-col gap-1.5">
                              <SubclassInfoBadge
                                title={t("courseDetail.class-term")}
                                content={item.subclass_term}
                              />
                              <SubclassInfoBadge
                                title={t("courseDetail.class-instructor")}
                                content={
                                  (item.subclass_instructor_list[0] &&
                                    item.subclass_instructor_list
                                      .map(
                                        (instructor) =>
                                          instructor.instructor_name,
                                      )
                                      .join("/")) ||
                                  "N/A"
                                }
                              />
                              {item.timeslot_list.map((value, index) => {
                                return (
                                  <div key={index}>
                                    <div className="text-muted-foreground text-xs">
                                      {value.timeslot_weekday}
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                      <SubclassInfoBadge
                                        title={t("courseDetail.class-location")}
                                        content={value.timeslot_venue}
                                      />
                                      <SubclassInfoBadge
                                        title={t("courseDetail.class-time")}
                                        content={value.timeslot_display}
                                      />
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </Card>
                        );
                      })}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
            </Card>

            {/*Comments*/}
            <Card className="py-3 px-4 bg-primary">
              <div className="flex justify-between items-center">
                <div className="mx-1">
                  <Label className="text-md">
                    {t("courseDetail.course-review")}
                  </Label>
                </div>

                {token && courseId ? (
                  <AddReview courseId={courseId} />
                ) : (
                  <Button
                    onClick={() =>
                      toast.warning(t("courseDetail.login-to-review"))
                    }
                    className="bg-accent py-1.5 px-4 h-fit text-xs font-normal hover:shadow"
                  >
                    <span>{t("courseDetail.add-course-review")}</span>
                  </Button>
                )}
              </div>
              <div className="flex flex-col gap-4 mt-3">
                {course.review_list &&
                  course.review_list.map((review) => {
                    return (
                      <CourseReviewCard course_data={review}></CourseReviewCard>
                    );
                  })}
              </div>
            </Card>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

export default CourseDetail;
