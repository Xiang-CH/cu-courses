import NavBar from "@/components/navbar/navbar";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { useTranslation } from "react-i18next";
import CourseReviewCard from "@/components/courseReviewCard/courseReviewCard.tsx";

interface Review_Data {
  course_code: string;
  course_name: string;
  term: string;
  instructor: string;
  course_review: string;
  instructor_review: string;
  workload: 0 | 1 | 2 | 3 | 4;
  recommend: 0 | 1 | 2 | 3;
  date?: string;
}

const reviews: Review_Data[] = [
  {
    course_code: "COMP1001",
    course_name: "Introduction to Computer Science",
    term: "2021-2022 Term1",
    instructor: "John Doe",
    course_review: "This course is very interesting.",
    instructor_review: "The instructor is very nice.",
    workload: 2,
    recommend: 3,
    date: "2021-09-01",
  },
  {
    course_code: "COMP1002",
    course_name: "Data Structure",
    term: "2021-2022 Term2",
    instructor: "Jane Doe",
    course_review: "This course is very interesting.",
    instructor_review: "The instructor is very nice.",
    workload: 3,
    recommend: 3,
    date: "2021-09-01",
  },
  {
    course_code: "COMP1003",
    course_name: "Algorithm",
    term: "2021-2022 Term3",
    instructor: "John Doe",
    course_review: "This course is very interesting.",
    instructor_review: "The instructor is very nice.",
    workload: 3,
    recommend: 2,
  },
  {
    course_code: "COMP1004",
    course_name: "Operating System",
    term: "2021-2022 Summer",
    instructor: "Jane Doe",
    course_review: "This course is very interesting.",
    instructor_review: "The instructor is very nice.",
    workload: 3,
    recommend: 1,
  },
];

function Profile() {
  const { t } = useTranslation();
  return (
    <div className="flex">
      <NavBar currentPath="/profile" />
      <ScrollArea className="w-full h-screen text-left">
        <div className="flex flex-col w-full h-full py-9 px-9 text-left">
          <Label className="text-3xl font-black text-secondary">
            {t("profile.my-reviews")}
          </Label>
          <div className="flex flex-col w-full mt-6 gap-4">
            {reviews.map((review) => {
              return (
                <div className="flex flex-col">
                  <label className="text-lg font-bold text-secondary mb-2">
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
