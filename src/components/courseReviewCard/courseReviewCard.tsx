import { useTranslation } from "react-i18next";
import moment from "moment";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card.tsx";
import LoadIndicator from "@/components/courseReviewCard/loadIndicator.tsx";
import { Review } from "@/lib/types.ts";

function CourseReviewCard({ course_data }: { course_data: Review }) {
  const { t } = useTranslation();
  return (
    <Card className="w-full h-fit border-none bg-card shadow-none p-1 py-2.5 relative">
      <CardContent className="flex justify-between p-0 mx-3">
        <div className="flex flex-col w-3/4 pb-3 md:pb-0">
          <CardTitle className="text-sm text-secondary">
            {course_data.review_term}, Professor {course_data.review_instructor}
          </CardTitle>
          <CardDescription className="text-xs text-secondary mt-2 min-h-16">
            <span className="font-bold">{t("courseReview.course-review")}</span>
            {": "}
            {course_data.review_course_content}
          </CardDescription>
          <CardDescription className="text-xs text-secondary mt-3 min-h-16">
            <span className="font-bold">
              {t("courseReview.instructor-review")}
            </span>
            {": "}
            {course_data.review_instructor_content}
          </CardDescription>
        </div>
      </CardContent>
      <CardFooter className="flex-row flex md:flex-col absolute right-4 bottom-3 p-0 m-0">
        <LoadIndicator rate={course_data.review_workload_level} type="wl" />
        <div className="md:hidden w-3" />
        <LoadIndicator rate={course_data.review_recommend_level} type="rc" />
        <div className="text-xs text-muted-foreground ml-3 block min-w-fit">
          {moment.unix(course_data.review_create_time).format("DD-MM-YYYY")}
        </div>
      </CardFooter>
    </Card>
  );
}

export default CourseReviewCard;
