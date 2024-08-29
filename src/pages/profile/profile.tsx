import NavBar from "@/components/navbar/navbar";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { useTranslation } from "react-i18next";
import CourseReviewCard from "@/components/courseReviewCard/courseReviewCard.tsx";
import { Review } from "@/lib/types.ts";
import NotLoggedIn from "@/components/notLoggedIn/notLoggedIn.tsx";
import { useEffect, useState } from "react";
import { request } from "@/lib/api.ts";

function Profile() {
  const { t } = useTranslation();
  const token = localStorage.getItem("token");
  const [reviewList, setReviewList] = useState<Review[]>([]);

  useEffect(() => {
    request("/review/my.php", { token: token || "" }).then((res) => {
      if (res.code == 200) {
        console.log(res.review_list);
        setReviewList(res.review_list);
      }
    });
  }, []);

  return (
    <div className="flex">
      <NavBar currentPath="/profile" />
      <ScrollArea className="w-full h-screen text-left relative">
        {!token && <NotLoggedIn />}
        <div className="flex flex-col w-full h-full py-9 px-9 text-left">
          <Label className="text-3xl font-black text-secondary">
            {t("profile.my-reviews")}
          </Label>
          <div className="flex flex-col w-full mt-6 gap-4">
            {reviewList.length > 0 ? (
              reviewList.map((review, index) => {
                return (
                  <div className="flex flex-col" key={index}>
                    <label className="text-lg font-bold text-secondary mb-2">
                      {review.course_code} - {review.course_title}
                    </label>
                    <div className="ml-2">
                      <CourseReviewCard course_data={review} />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-secondary w-full text-center text-md mt-3">
                <span>-- {t("profile.no-reviews")} --</span>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

export default Profile;
