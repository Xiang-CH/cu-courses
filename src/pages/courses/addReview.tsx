import React, { useState } from "react";
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

function AddReview({ courseId }: { courseId: string }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const years = [];
  for (let year = moment().year(); year >= moment().year() - 10; year--) {
    years.push(year);
  }
  const terms = ["Term 1", "Term 2", "Term 3", "Term 4", "Summer Session"];
  const grade = [
    "N/A",
    "A+",
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
  function submitReview(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    // submit review
    if (
      !yearValue ||
      !termValue ||
      !courseReviewValue ||
      !instructorValue ||
      !instructorReviewValue
    ) {
      toast.error(t("courseDetail.warning"));
      setShowWarning(true);
      return;
    }
    request("/review/post.php", {
      token: localStorage.getItem("token") || "",
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
        navigate(-1);
      } else {
        toast.error(t("courseDetail.submit-review-fail") + ": " + res.msg);
      }
    });
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="bg-accent py-1.5 px-4 h-fit text-xs font-normal hover:shadow">
          <span>{t("courseDetail.add-course-review")}</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-h-[90%] pb-4 overflow-y-auto"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle>
            {t("courseDetail.course-review-card-title")}
          </DialogTitle>
        </DialogHeader>
        <form className="px-1">
          <div className="grid w-full items-center gap-4">
            <div className="flex gap-2">
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
                    {terms.map((term) => (
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

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="instructor" className="my-0.5">
                {t("courseDetail.class-instructor")}
              </Label>
              <Input
                id="instructor"
                placeholder={t("courseDetail.select-instructor")}
                onChange={(e) => setInstructorValue(e.target.value)}
                className={
                  showWarning && !instructorValue ? "border-red-500" : ""
                }
              />
            </div>
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
