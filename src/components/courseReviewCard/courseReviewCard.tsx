import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card.tsx";
import { Label } from "@/components/ui/label.tsx";
import LoadIndicator from "@/components/courseReviewCard/loadIndicator.tsx";
import { Review } from "@/lib/types.ts";

function CourseReviewCard({ course_data }: { course_data: Review }) {
  const { t } = useTranslation();
  return (
    <Card className="border-none bg-muted shadow-none p-3">
      <div className="flex justify-between items-start mb-2">
        <Label>
          <span className="text-base lg:text-lg font-bold">
            {course_data.review_title || t("courseReview.review-title-null")}
            <br />
          </span>
          <span className="text-xs lg:text-sm leading-3">
            {course_data.review_instructor} ({course_data.review_year} {course_data.review_term})
          </span>
        </Label>
      </div>
      <div className="flex flex-col lg:gap-1.5 mt-2 lg:mt-4">

        {course_data.review_course_content && (
          <div className="text-sm">
            <span className="font-bold">
              {t("courseReview.course-review")}:
            </span>
            <div className="whitespace-pre-line">{course_data.review_course_content}</div>
            {(course_data.review_instructor_content || course_data.review_grade || course_data.review_workload_level || course_data.review_recommend_level) && <br />}
          </div>
        )}

        {course_data.review_instructor_content && (
          <div className="text-sm whitespace-pre-line">
            <span className="font-bold">
              {t("courseReview.instructor-review")}:
            </span>
            <div className="whitespace-pre-line">{course_data.review_instructor_content}</div>
            {(course_data.review_grade || course_data.review_workload_level || course_data.review_recommend_level) && <br />}
          </div>
        )}

        {course_data.review_grade && (
          <div className="text-sm whitespace-pre-line">
            <span className="font-bold pr-5">
              {t("courseReview.grade")}:&nbsp;
            </span>
            {course_data.review_grade}
          </div>
        )}

        {course_data.review_workload_level && (
          <div className="text-sm">
            <div className="flex items-center">
              <span className="font-bold pr-2">{t("courseReview.workload")}:&nbsp;</span>
              <LoadIndicator rate={course_data.review_workload_level} type="wl" />
            </div>
          </div>
        )}

        {course_data.review_recommend_level && (
          <div className="text-sm">
            <div className="flex items-center">
              <span className="font-bold pr-2">{t("courseReview.recommend")}:&nbsp;</span>
              <LoadIndicator rate={course_data.review_recommend_level} type="rc" />
            </div>
          </div>
        )}

      </div>
    </Card>
  );
}

export default CourseReviewCard;
