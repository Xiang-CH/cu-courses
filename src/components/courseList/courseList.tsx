import { Card, CardContent, CardTitle } from "@/components/ui/card.tsx";
import { useTranslation } from "react-i18next";

interface Course {
  courseCode: string;
  description: string;
  startTime: string;
  endTime: string;
  type: string;
  location: string;
}

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
  courseCode,
  description,
  startTime,
  endTime,
  type,
  location,
}: {
  courseCode: string;
  description: string;
  startTime: string;
  endTime: string;
  type: string;
  location: string;
}) {
  return (
    <Card className="w-full h-fit border-none bg-card shadow-none p-1 py-1.5">
      <CardContent className="flex justify-between p-0 mx-3">
        <div className="flex-1 text-left self-center min-w-32">
          <p className="font-bold text-sm">{courseCode}</p>
          <p className="leading-3 text-xs mb-1">{description}</p>
          <p className="text-xs text-gray-700">{type}</p>
        </div>
        <div className="flex-2 flex items-center ml-1">
          <div className="text-left">
            <p className="text-xs mb-1">
              {startTime} - {endTime}
            </p>
            <div className="flex h-full items-center w-20">
              <LocationIcon />
              <p className="text-xs">{location}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function CourseList({ today_courses }: { today_courses: Course[] }) {
  const { t } = useTranslation();
  // const cur_date = new Date();

  return (
    <div className="flex-1 w-full">
      <CardContent className="px-4 pb-0 mb-2">
        <CardTitle className="text-xl text-left mt-2 mb-2">
          {t("home.today-course")}
        </CardTitle>
        <div className="w-full px-0 flex-col flex gap-4">
          {today_courses.map((course) => {
            return <CourseItem {...course} />;
          })}
        </div>
      </CardContent>
    </div>
  );
}

export default CourseList;
