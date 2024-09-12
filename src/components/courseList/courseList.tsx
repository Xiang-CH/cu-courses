import { Card, CardContent, CardTitle } from "@/components/ui/card.tsx";
import {
  CalendarListApiResponse,
  CourseDetails,
  Subclass,
} from "@/lib/types.ts";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { convertTimeRange } from "@/lib/convert.ts";

function CourseItem({
  course_detail,
  subclass_detail,
  calendar_display,
  calendar_venue,
}: {
  course_detail: CourseDetails;
  subclass_detail: Subclass;
  calendar_display: string;
  calendar_venue: string;
}) {
  return (
    <Link to={`/courses/${course_detail.course_code}`}>
      <Card className="w-full h-fit border-none bg-muted shadow-none py-3 px-2 hover:bg-card hover:cursor-pointer transition duration-200 ease-in-out">
        <CardContent className="flex justify-between p-0 mx-3">
          <div className="flex-1 text-left self-center min-w-20">
            <p className="leading-[1.2] font-bold truncate">
              {course_detail.course_code} - {subclass_detail.subclass_section}
            </p>
            <p className="leading-4 text-sm mt-1 truncate">
              {convertTimeRange(calendar_display)}
            </p>
          </div>
          <div className="flex-2 flex items-center ml-1">
            <div className="text-right">
              <div className="flex h-full w-28">
                <p className="text-sm ml-2">{calendar_venue}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function CourseList({
  courses,
  label,
}: {
  courses: CalendarListApiResponse[];
  label: string;
}) {
  // const cur_date = new Date();
  const { t } = useTranslation();

  return (
    <div className="w-full h-full relative">
      <CardContent className="px-4 pb-0 mb-2 overflow-x-visible">
        <CardTitle className="text-xl text-left md:mt-2 mb-1">
          {label}
        </CardTitle>

        <div className="w-full pt-2 flex-col flex gap-3">
          {courses.length === 0 && (
            <div className="mx-1 text-sm">{t("courses.no-course")}</div>
          )}
          {courses.map((course, index) => {
            return <CourseItem {...course} key={index} />;
          })}
        </div>
      </CardContent>
    </div>
  );
}

export default CourseList;
