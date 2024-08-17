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

interface Course {
  course_code: string;
  title: string;
  details: {
    [key: string]: string | number;
    level: string;
    credit: number;
    grading: string;
    structure: string;
    faculty: string;
    department: string;
  };
  info: {
    [key: string]: string | number | undefined;
    enroll_req?: string;
    drop_req?: string;
    register_req?: string;
  };
  description: string;
  workload: number[];
  recommend: number[];
  must_reads?: string;
  recommended_books?: string;
  classes: {
    sub_class: string;
    time: string;
    location: string;
    instructor: string;
    dates: string[];
  }[];
  comments: {
    term: string;
    instructor: string;
    course_review: string;
    instructor_review: string;
    workload: 0 | 1 | 2 | 3 | 4;
    recommend: 0 | 1 | 2 | 3;
    date: string;
  }[];
}

const course: Course = {
  course_code: "CSCI2100",
  title: "Data Structures",
  details: {
    level: "Undergraduate",
    credit: 3,
    grading: "Letter",
    structure: "Lecture",
    faculty: "Engineering",
    department: "Computer Science and Engineering",
  },
  info: {
    enroll_req: "需要部门同意",
    drop_req: "需要部门同意",
    register_req: "不适用于上过ACCT2110",
  },
  description: "This course covers the basic data structures and algorithms.",
  workload: [3, 5, 6, 7],
  recommend: [4, 5],
  must_reads: "Introduction to Algorithms",
  recommended_books: "Data Structures and Algorithm Analysis in C",
  classes: [
    {
      sub_class: "A-LEC",
      time: "Mon 10:30-12:15",
      location: "LT1",
      instructor: "Prof. Chan",
      dates: ["09/02", "12/02"],
    },
    {
      sub_class: "B-TUT",
      time: "Wed 14:30-15:15",
      location: "LT2",
      instructor: "Dr. Wong",
      dates: ["09/04", "12/04"],
    },
    {
      sub_class: "A-LEC",
      time: "Mon 10:30-12:15",
      location: "LT1",
      instructor: "Prof. Chan",
      dates: ["09/02", "12/02"],
    },
    {
      sub_class: "B-TUT",
      time: "Wed 14:30-15:15",
      location: "LT2",
      instructor: "Dr. Wong",
      dates: ["09/04", "12/04"],
    },
    {
      sub_class: "A-LEC",
      time: "Mon 10:30-12:15",
      location: "LT1",
      instructor: "Prof. Chan",
      dates: ["09/02", "12/02"],
    },
    {
      sub_class: "B-TUT",
      time: "Wed 14:30-15:15",
      location: "LT2",
      instructor: "Dr. Wong",
      dates: ["09/04", "12/04"],
    },
  ],
  comments: [
    {
      term: "2024 Fall",
      instructor: "Prof. Chan",
      course_review: "This course is very interesting.",
      instructor_review: "I am happy to teach this course.",
      workload: 3,
      recommend: 3,
      date: "2024-12-02",
    },
    {
      term: "2024 Fall",
      instructor: "Dr. Wong",
      course_review: "This course is very useful.",
      instructor_review: "I am happy to teach this course.",
      workload: 4,
      recommend: 2,
      date: "2024-12-04",
    },
  ],
};

function CourseDetail() {
  const { t } = useTranslation();
  const { courseId } = useParams();
  const navigate = useNavigate();
  // const course = useLoaderData();
  // console.log(course);

  return (
    <div className="flex w-screen relative">
      <NavBar currentPath="/courses" />
      <ScrollArea className="w-full h-screen text-left gap-1">
        <div className="px-8 py-4 w-full">
          {/*Header*/}
          <div className="flex my-4">
            <Button
              onClick={() => {
                window.history.length > 1 ? navigate(-1) : navigate("/courses");
              }}
            >
              <ChevronLeftIcon className="w-7 h-7" />
            </Button>
            <Label className="text-3xl font-black text-secondary">
              {courseId} - {course.title}
            </Label>
          </div>

          {/*Body*/}
          <div className="flex flex-col gap-3 w-max-full w-full relative">
            {/*Course Details*/}
            <div className="flex gap-3 h-fit lg:flex-row flex-col">
              <Card className="w-full lg:w-1/3 flex lg:flex-col py-3 px-4 bg-primary h-min-full gap-2 lg:gap-0">
                <div className="w-1/3 lg:w-full">
                  <Label className="text-md">
                    {t("courseDetail.course-detail")}
                  </Label>
                  <div className="py-1">
                    {Object.keys(course.details).map((key, index) => {
                      return (
                        <div className="text-xs mb-0.5" key={index}>
                          {t(`courseDetail.course-${key}`)}:{" "}
                          {course.details[key]}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <Separator className="mt-1 mb-2 bg-muted hidden lg:block"></Separator>

                <div className="w-1/3 lg:w-full">
                  <Label className="text-md">
                    {t("courseDetail.course-info")}
                  </Label>
                  <div className="py-1">
                    {Object.keys(course.info).map((key) => {
                      return (
                        <div className="text-xs mb-0.5">
                          {t(`courseDetail.course-${key}`)}: {course.info[key]}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <Separator className="mt-1 mb-2 bg-muted hidden lg:block"></Separator>
                <div className="w-1/3 lg:w-full">
                  <Label className="text-md">
                    {t("courseDetail.course-description")}
                  </Label>
                  <div className="text-xs py-1">{course.description}</div>
                </div>
              </Card>

              {/*Right Side*/}
              <div className="flex flex-col w-full lg:w-2/3 gap-3 h-min-full">
                {/*Course Chart*/}
                <Card className="w-full flex py-3 px-4 bg-primary h-fit justify-between">
                  <div className="flex flex-col items-center w-1/2">
                    <Label className="text-md">
                      {t("courseDetail.course-workload")}
                    </Label>
                    <CoursePieChart data={course.workload} chat_type="wl" />
                  </div>
                  <div className="flex flex-col items-center w-1/2">
                    <Label className="text-md">
                      {t("courseDetail.course-recommendation")}
                    </Label>
                    <CoursePieChart data={course.recommend} chat_type="rc" />
                  </div>
                </Card>
                {/*Course Readings*/}
                <Card className="w-full flex py-3 px-4 bg-primary justify-between h-full gap-2 overflow-hidden">
                  <div className="flex flex-col items-center h-full w-1/2">
                    <Label className="text-md mb-2">
                      {t("courseDetail.course-must_reads")}
                    </Label>
                    <Card className="w-full h-full py-2 px-4 shadow-none">
                      <div className="text-xs">{course.must_reads}</div>
                    </Card>
                  </div>
                  <div className="w-[1px] bg-gray-400 mt-7 mx-2"></div>
                  <div className="flex flex-col items-center h-full w-1/2">
                    <Label className="text-md mb-2">
                      {t("courseDetail.course-recommended_books")}
                    </Label>
                    <Card className="w-full h-full py-2 px-4 shadow-none">
                      <div className="text-xs">{course.recommended_books}</div>
                    </Card>
                  </div>
                </Card>
              </div>
            </div>

            {/*Classes*/}
            <Card className="pt-3 pb-0 px-4 bg-primary w-max-full">
              <Label className="text-md font-black text-secondary">
                {t("courseDetail.course-classes")}
              </Label>
              <div className="flex">
                <ScrollArea className="my-2 w-1 flex-1 overflow-x-auto pb-3">
                  <div className="flex gap-5">
                    {course.classes.map((item) => {
                      return (
                        <Card className="border-2 w-56 bg-primary border-secondary py-2 px-3">
                          <div className="flex justify-between items-center mb-2">
                            <Label className="text-sm font-bold">
                              {item.sub_class}
                            </Label>
                            <Button className="bg-accent py-1 px-2 h-fit text-xs font-normal hover:shadow">
                              <span>
                                {t("courseDetail.add-course-to-calendar")}
                              </span>
                            </Button>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            {Object.entries(item).map(([key, value]) => {
                              if (key === "sub_class") return;
                              return (
                                <Card className="flex px-2 py-1 shadow-none w-full">
                                  <Label className="text-xs">
                                    {t(`courseDetail.class-${key}`)}
                                    {key === "dates" ? (
                                      <div className="font-normal">
                                        {item.dates.join(", ")}
                                      </div>
                                    ) : (
                                      <span className="font-normal ml-3">
                                        {value}
                                      </span>
                                    )}
                                  </Label>
                                </Card>
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
                <Button className="bg-accent py-1.5 px-4 h-fit text-xs font-normal hover:shadow">
                  <span>{t("courseDetail.add-course-review")}</span>
                </Button>
              </div>
              <div className="flex flex-col gap-4 mt-3">
                {course.comments.map((review) => {
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
