import NavBar from "@/components/navbar/navbar";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface Review_Data {
  course_code: string;
  course_name: string;
  term: string;
  professor: string;
  course_review: string;
  professor_review: string;
  workload: number;
  recommend: number;
  date?: string;
}

const reviews: Review_Data[] = [
  {
    course_code: "COMP1001",
    course_name: "Introduction to Computer Science",
    term: "2021-2022 Term1",
    professor: "John Doe",
    course_review: "This course is very interesting.",
    professor_review: "The professor is very nice.",
    workload: 3,
    recommend: 5,
    date: "2021-09-01",
  },
  {
    course_code: "COMP1002",
    course_name: "Data Structure",
    term: "2021-2022 Term2",
    professor: "Jane Doe",
    course_review: "This course is very interesting.",
    professor_review: "The professor is very nice.",
    workload: 3,
    recommend: 5,
    date: "2021-09-01",
  },
  {
    course_code: "COMP1003",
    course_name: "Algorithm",
    term: "2021-2022 Term3",
    professor: "John Doe",
    course_review: "This course is very interesting.",
    professor_review: "The professor is very nice.",
    workload: 3,
    recommend: 5,
  },
  {
    course_code: "COMP1004",
    course_name: "Operating System",
    term: "2021-2022 Summer",
    professor: "Jane Doe",
    course_review: "This course is very interesting.",
    professor_review: "The professor is very nice.",
    workload: 3,
    recommend: 5,
  },
];

function LoadIndicator({ rate }: { rate: number }) {
  let color = "bg-green-500";
  if (rate < 2) {
    color = "bg-red-500";
  } else if (rate < 3) {
    color = "bg-yellow-500";
  }
  return <div className={`rounded-full h-2 w-2 ${color}`}></div>;
}

function CourseReviewCard({ course_data }: { course_data: Review_Data }) {
  const { t } = useTranslation();
  return (
    <Card className="w-full h-fit border-none bg-card shadow-none my-3 p-1 py-1.5 mb-6 relative">
      <CardContent className="flex justify-between p-0 mx-3">
        <div className="flex flex-col w-3/4">
          <CardTitle className="text-sm text-secondary">
            {course_data.term}, Professor {course_data.professor}
          </CardTitle>
          <CardDescription className="text-xs text-secondary mt-2 min-h-16">
            <span className="font-bold">{t("profile.course-review")}</span>
            {": "}
            {course_data.course_review}
          </CardDescription>
          <CardDescription className="text-xs text-secondary mt-3 min-h-16">
            <span className="font-bold">{t("profile.professor-review")}</span>
            {": "}
            {course_data.professor_review}
          </CardDescription>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col absolute right-4 bottom-3 p-0 m-0">
        <div className="flex h-fit items-center justify-start w-full">
          <LoadIndicator rate={course_data.workload} />
          <CardDescription className="text-xs text-secondary ml-1">
            {course_data.workload}
          </CardDescription>
        </div>
        <div className="flex h-fit items-center justify-start w-full">
          <LoadIndicator rate={course_data.workload} />
          <CardDescription className="text-xs text-secondary ml-1">
            {course_data.recommend}
          </CardDescription>
        </div>
        <CardDescription className="text-xs text-muted-foreground ml-3">
          {course_data.date}
        </CardDescription>
      </CardFooter>
    </Card>
  );
}

function Profile() {
  const { t } = useTranslation();
  return (
    <div className="flex">
      <NavBar currentPath="/profile" />
      <ScrollArea className="w-full h-screen text-left">
        <div className="flex flex-col w-full h-full py-10 px-14 text-left">
          <Label className="text-3xl font-black text-secondary">
            {t("profile.my-reviews")}
          </Label>
          <div className="flex flex-col w-full mt-6">
            {reviews.map((review) => {
              return (
                <div className="flex flex-col">
                  <label className="text-lg font-bold text-secondary">
                    {review.course_code} - {review.course_name}
                  </label>
                  <div className="ml-2">
                    <CourseReviewCard course_data={review} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

export default Profile;
