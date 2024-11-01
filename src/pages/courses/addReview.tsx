import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Label } from "@/components/ui/label.tsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { useTranslation } from "react-i18next";
import moment from "moment/moment";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import SliderWithMarks from "@/components/sliderWithMarks/sliderWithMarks.tsx";
import LoadIndicator from "@/components/courseReviewCard/loadIndicator.tsx";
import { toast } from "sonner";
import { request } from "@/lib/api.ts";
import { useNavigate } from "react-router-dom";
import { useAliveController } from "react-activation";

function AddReview({ courseId, size }: { courseId: string, size?: string }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const aliveController = useAliveController();
  const years = [];

  let latestYear = moment().year();
  if (moment().month() > 8) {
    latestYear++;
  }
  for (let year = latestYear; year >= latestYear - 7; year--) {
    years.push(year);
  }
  const terms = ["Term 1", "Term 2", "Term 3", "Term 4", "Summer Session"];
  const grade = [
    "N/A",
    "A",
    "A-",
    "B+",
    "B",
    "B-",
    "C+",
    "C",
    "C-",
    "D",
    "P",
    "F",
  ];
  const [curRecommendLevel, setCurRecommendLevel] = useState(3);
  const [curWorkloadLevel, setCurWorkloadLevel] = useState(3);
  const [gradeValue, setGradeValue] = useState("N/A");

  const [showWarning, setShowWarning] = useState(false);
  const [yearValue, setYearValue] = useState("");
  const [termValue, setTermValue] = useState("");
  const [courseReviewValue, setCourseReviewValue] = useState("");
  const [instructorValue, setInstructorValue] = useState("");
  const [instructorReviewValue, setInstructorReviewValue] = useState("");
  const [specific, setSpecific] = useState({
    [yearValue]: { [termValue]: [] },
  });
  const [specificSubclass, setSpecificSubclass] = useState("");
  const [loadingSpecific, setLoadingSpecific] = useState(true);

  useEffect(() => {
    request("/review/specific.php", {
      token: localStorage.getItem("token") || "",
      course_code: courseId,
    }).then((res) => {
      if (res.code == 200) {
        setSpecific(res.specific_available_list);
      }
      setLoadingSpecific(false);
    });
  }, []);

  function submitReview(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    // submit review
    if (
      !yearValue ||
      !termValue ||
      !courseReviewValue ||
      !(instructorValue || specificSubclass) ||
      !instructorReviewValue
    ) {
      toast.error(t("courseDetail.warning"));
      setShowWarning(true);
      return;
    }

    request("/review/post.php", {
      token: localStorage.getItem("token") || "",
      is_specific: specificSubclass ? "true" : "false",
      subclass_id: specificSubclass,
      review_year: yearValue,
      review_term: termValue,
      review_course_content: courseReviewValue,
      review_instructor: instructorValue,
      review_instructor_content: instructorReviewValue,
      review_recommend_level: curRecommendLevel.toString(),
      review_workload_level: curWorkloadLevel.toString(),
      review_grade: gradeValue !== "N/A" ? gradeValue : "",
      course_code: courseId,
    }).then((res) => {
      if (res.code === 200) {
        toast.success(t("courseDetail.submit-review-success"));
        aliveController.refresh(new RegExp("^/profile")).finally(() => {
          navigate(0);
          console.log("Profile page refreshed");
        });
      } else {
        toast.error(t("courseDetail.submit-review-fail") + ": " + res.msg);
      }
    });
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button className={`bg-accent py-1.5 px-4 h-fit hover:bg-accentlight ${
            size === "big" ? "py-2 px-6" : ""
          }`}>
          <span>{t("courseDetail.add-course-review")}</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-h-[90%] pb-4 overflow-y-auto"
        aria-describedby={undefined}
        onPointerDownOutside={(event) => event.preventDefault()}
      >
        {loadingSpecific && (
          <div className="bg-gray-200 opacity-50 absolute w-full h-full" />
        )}
        <DialogHeader>
          <DialogTitle>
            {t("courseDetail.course-review-card-title")}
          </DialogTitle>
        </DialogHeader>
        <form className="px-1">
          <div className="grid w-full items-center gap-4">
            {/*第一行*/}
            <div className="flex gap-2">
              {/*选择学年*/}
              <div className="flex flex-col space-y-1.5 w-1/2">
                <Label htmlFor="year" className="my-0.5">
                  {t("courseDetail.class-year")}
                </Label>
                <Select onValueChange={setYearValue} defaultValue={yearValue}>
                  <SelectTrigger
                    id="year"
                    className={
                      showWarning && !yearValue ? "border-red-500" : ""
                    }
                  >
                    <SelectValue placeholder={t("courseDetail.select-year")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {years.map((year) => (
                        <SelectItem
                          value={`${(year - 1).toString()}-${year.toString().slice(2)}`}
                          key={year}
                        >
                          {`${(year - 1).toString()}-${year.toString().slice(2)}`}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/*选择学期*/}
              <div className="flex flex-col space-y-1.5 w-1/2">
                <Label htmlFor="term" className="my-0.5">
                  {t("courseDetail.class-term")}
                </Label>
                <Select onValueChange={setTermValue} defaultValue={termValue}>
                  <SelectTrigger
                    id="term"
                    className={
                      showWarning && !termValue ? "border-red-500" : ""
                    }
                  >
                    <SelectValue placeholder={t("courseDetail.select-term")} />
                  </SelectTrigger>
                  <SelectContent>
                    {terms.map((term) => {
                      if (yearValue && specific[yearValue]) {
                        if (Object.keys(specific[yearValue]).includes(term)) {
                          return (
                            <SelectItem
                              className="hover:bg-muted"
                              value={term}
                              key={term}
                            >
                              {term}
                            </SelectItem>
                          );
                        }
                      } else {
                        return (
                          <SelectItem
                            className="hover:bg-muted"
                            value={term}
                            key={term}
                          >
                            {term}
                          </SelectItem>
                        );
                      }
                    })}
                  </SelectContent>
                </Select>
              </div>

              {/*选择成绩*/}
              <div className="flex flex-col space-y-1.5 w-24">
                <Label htmlFor="term" className="my-0.5">
                  {t("courseDetail.grade")}
                </Label>
                <Select onValueChange={setGradeValue} defaultValue={gradeValue}>
                  <SelectTrigger id="grade">
                    <SelectValue placeholder={t("courseDetail.select-term")} />
                  </SelectTrigger>
                  <SelectContent>
                    {grade.map((term) => (
                      <SelectItem
                        className="hover:bg-muted"
                        value={term}
                        key={term}
                      >
                        {term}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/*第二行：课程推荐度*/}
            <div className="flex flex-col space-y-1.5 items-center">
              <Label htmlFor="recommend" className="my-0.5 self-start">
                {t("courseDetail.course-recommendation")}
              </Label>
              <div className="self-start ml-1.5 min-h-5">
                <LoadIndicator rate={curRecommendLevel} type="rc" />
              </div>
              <SliderWithMarks
                maxMarks={5}
                setValue={setCurRecommendLevel}
              ></SliderWithMarks>
            </div>

            {/*第三行：课程工作量*/}
            <div className="flex flex-col space-y-1.5 items-center">
              <Label htmlFor="workload" className="my-0.5 self-start">
                {t("courseDetail.course-workload")}
              </Label>
              <div className="self-start ml-1.5 min-h-5">
                <LoadIndicator rate={curWorkloadLevel} type="wl" />
              </div>
              <SliderWithMarks
                maxMarks={5}
                setValue={setCurWorkloadLevel}
              ></SliderWithMarks>
            </div>

            {/*第四行：课程评价*/}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="course-review" className="my-0.5">
                {t("courseReview.course-review")}
              </Label>
              <Textarea
                id="course-review"
                placeholder={t("courseDetail.enter-course-review")}
                onChange={(e) => setCourseReviewValue(e.target.value)}
                className={
                  showWarning && !courseReviewValue ? "border-red-500" : ""
                }
              />
            </div>

            {/*第五行：选择讲师*/}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="instructor" className="my-0.5">
                {t("courseDetail.class-instructor")}
              </Label>
              {yearValue &&
              termValue &&
              specific[yearValue] &&
              specific[yearValue][termValue] ? (
                <Select
                  value={specificSubclass}
                  onValueChange={setSpecificSubclass}
                >
                  <SelectTrigger
                    id="instructor"
                    className={
                      showWarning && !specificSubclass ? "border-red-500" : ""
                    }
                  >
                    <SelectValue
                      placeholder={t("courseDetail.select-instructor")}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {specific[yearValue][termValue].map(
                      ({
                        subclass_id,
                        subclass_type,
                        subclass_section,
                        subclass_instructor_list,
                      }: {
                        subclass_id: number;
                        subclass_type: string;
                        subclass_section: string;
                        subclass_instructor_list: {
                          instructor_name: string;
                          instructor_id: number;
                        }[];
                      }) => (
                        <SelectGroup
                          key={"select_group_" + subclass_id.toString()}
                        >
                          <SelectLabel>
                            {subclass_type} - {subclass_section}
                          </SelectLabel>
                          {subclass_instructor_list.map(
                            ({ instructor_name, instructor_id }) => (
                              <SelectItem
                                value={subclass_id.toString()}
                                key={instructor_id.toString()}
                              >
                                {instructor_name}
                              </SelectItem>
                            ),
                          )}
                        </SelectGroup>
                      ),
                    )}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  id="instructor"
                  placeholder={t("courseDetail.select-instructor")}
                  onChange={(e) => setInstructorValue(e.target.value)}
                  className={
                    showWarning && !instructorValue ? "border-red-500" : ""
                  }
                />
              )}
            </div>

            {/*第六行：讲师评价*/}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="instructor-review" className="my-0.5">
                {t("courseDetail.instructor-review")}
              </Label>
              <Textarea
                id="instructor-review"
                placeholder={t("courseDetail.enter-instructor-review")}
                onChange={(e) => setInstructorReviewValue(e.target.value)}
                className={
                  showWarning && !instructorReviewValue ? "border-red-500" : ""
                }
              />
            </div>
          </div>

          <div className="mt-3 w-full flex justify-end">
            <Button
              onClick={submitReview}
              className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:shadow hover:cursor-pointer select-none"
            >
              {t("courseDetail.submit-review")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddReview;
