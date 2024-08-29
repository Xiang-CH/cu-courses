import { Card, CardContent, CardTitle } from "@/components/ui/card.tsx";
import { CalendarListApiResponse, CourseDetails } from "@/lib/types.ts";
import { Link } from "react-router-dom";

function LocationIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="0.8em"
      height="0.8em"
      viewBox="0 0 32 32"
    >
      <path
        fill="black"
        d="M16 2A11.013 11.013 0 0 0 5 13a10.9 10.9 0 0 0 2.216 6.6s.3.395.349.452L16 30l8.439-9.953c.044-.053.345-.447.345-.447l.001-.003A10.9 10.9 0 0 0 27 13A11.013 11.013 0 0 0 16 2m0 15a4 4 0 1 1 4-4a4.005 4.005 0 0 1-4 4"
      ></path>
      <circle cx={16} cy={13} r={4} fill="none"></circle>
    </svg>
  );
}

function CourseItem({
  course_detail,
  calendar_display,
  calendar_venue,
}: {
  course_detail: CourseDetails;
  calendar_display: string;
  calendar_venue: string;
}) {
  return (
    <Link to={`/courses/${course_detail.course_code}`}>
      <Card className="w-full h-fit border-none bg-card shadow-none p-1 py-1.5 hover:shadow hover:cursor-pointer">
        <CardContent className="flex justify-between p-0 mx-3">
          <div className="flex-1 text-left self-center min-w-20">
            <p className="font-bold text-sm">{course_detail.course_code}</p>
            <p className="leading-3 text-xs mb-0.5">
              {course_detail.course_title}
            </p>
            <p className="text-xs text-gray-700">{course_detail.course_type}</p>
          </div>
          <div className="flex-2 flex items-center ml-1">
            <div className="text-left">
              <p className="text-xs mb-1">{calendar_display}</p>
              <div className="flex h-full items-center w-28">
                <LocationIcon />
                <p className="text-xs ml-2 leading-3">{calendar_venue}</p>
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

  return (
    <div className="flex-1 w-full">
      <CardContent className="px-4 pb-0 mb-2">
        <CardTitle className="text-xl text-left mt-2 mb-2">{label}</CardTitle>
        <div className="w-full px-0 flex-col flex gap-4">
          {courses.map((course, index) => {
            return <CourseItem {...course} key={index} />;
          })}
        </div>
      </CardContent>
    </div>
  );
}

export default CourseList;
