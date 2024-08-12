import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card.tsx";
import LoadIndicator from "@/components/courseReviewCard/loadIndicator.tsx";

interface Review {
  term: string;
  instructor: string;
  course_review: string;
  instructor_review: string;
  workload: 0 | 1 | 2 | 3 | 4;
  recommend: 0 | 1 | 2 | 3;
  date?: string;
}

function CourseReviewCard({ course_data }: { course_data: Review }) {
  const { t } = useTranslation();
  return (
    <Card className="w-full h-fit border-none bg-card shadow-none p-1 py-1.5 relative">
      <CardContent className="flex justify-between p-0 mx-3">
        <div className="flex flex-col w-3/4">
          <CardTitle className="text-sm text-secondary">
            {course_data.term}, Professor {course_data.instructor}
          </CardTitle>
          <CardDescription className="text-xs text-secondary mt-2 min-h-16">
            <span className="font-bold">{t("courseReview.course-review")}</span>
            {": "}
            {course_data.course_review}
          </CardDescription>
          <CardDescription className="text-xs text-secondary mt-3 min-h-16">
            <span className="font-bold">
              {t("courseReview.instructor-review")}
            </span>
            {": "}
            {course_data.instructor_review}
          </CardDescription>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col absolute right-4 bottom-3 p-0 m-0">
        <LoadIndicator rate={course_data.workload} type="wl" />
        <LoadIndicator rate={course_data.recommend} type="rc" />
        <CardDescription className="text-xs text-muted-foreground ml-3">
          {course_data.date}
        </CardDescription>
      </CardFooter>
    </Card>
  );
}

export default CourseReviewCard;
