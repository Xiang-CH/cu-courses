import NavBar from "@/components/navbar/navbar";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Calendar from "@/components/calendar/calendar";
import CourseSearch from "@/components/courseSearch/courseSearch.tsx";
import CourseList from "@/components/courseList/courseList.tsx";
import CalendarCoursesView from "@/components/calendarCoursesView/calendarCoursesView.tsx";

interface Announcement {
  title: string;
  date: string;
}

interface Course {
  courseCode: string;
  description: string;
  startTime: string;
  endTime: string;
  type: string;
  location: string;
}

const icon_size = "1.5em";
const directory_contents = [
  {
    title: "app",
    url: "",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={icon_size}
        height={icon_size}
        viewBox="0 0 48 48"
      >
        <g fill="none" stroke="#7d2882" strokeWidth={4}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 32h10v9H19z"
          ></path>
          <rect width={38} height={24} x={5} y={8} rx={2}></rect>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M22 27h4M14 41h20"
          ></path>
        </g>
      </svg>
    ),
  },
  {
    title: "food",
    url: "",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={icon_size}
        height={icon_size}
        viewBox="0 0 20 20"
      >
        <path
          fill="#7d2882"
          d="M7 4.5c-.3 0-.5.3-.5.5v2.5h-1V5c0-.3-.2-.5-.5-.5s-.5.3-.5.5v2.5h-1V5c0-.3-.2-.5-.5-.5s-.5.3-.5.5v3.3c0 .9.7 1.6 1.5 1.7v7c0 .6.4 1 1 1s1-.4 1-1v-7c.8-.1 1.5-.8 1.5-1.7V5c0-.2-.2-.5-.5-.5M9 5v6h1v6c0 .6.4 1 1 1s1-.4 1-1V2c-1.7 0-3 1.3-3 3m7-1c-1.4 0-2.5 1.5-2.5 3.3c-.1 1.2.5 2.3 1.5 3V17c0 .6.4 1 1 1s1-.4 1-1v-6.7c1-.7 1.6-1.8 1.5-3C18.5 5.5 17.4 4 16 4"
        ></path>
      </svg>
    ),
  },
  {
    title: "bus",
    url: "",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={icon_size}
        height={icon_size}
        viewBox="0 0 24 24"
      >
        <path
          fill="#7d2882"
          d="M18 11H6V6h12m-1.5 11a1.5 1.5 0 0 1-1.5-1.5a1.5 1.5 0 0 1 1.5-1.5a1.5 1.5 0 0 1 1.5 1.5a1.5 1.5 0 0 1-1.5 1.5m-9 0A1.5 1.5 0 0 1 6 15.5A1.5 1.5 0 0 1 7.5 14A1.5 1.5 0 0 1 9 15.5A1.5 1.5 0 0 1 7.5 17M4 16c0 .88.39 1.67 1 2.22V20a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h8v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4z"
        ></path>
      </svg>
    ),
  },
  {
    title: "map",
    url: "",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={icon_size}
        height={icon_size}
        viewBox="0 0 24 24"
      >
        <path
          fill="#7d2882"
          d="m15 21l-6-2.1l-4.65 1.8q-.5.2-.925-.112T3 19.75v-14q0-.325.188-.575T3.7 4.8L9 3l6 2.1l4.65-1.8q.5-.2.925.113T21 4.25v14q0 .325-.187.575t-.513.375zm-1-2.45V6.85l-4-1.4v11.7z"
        ></path>
      </svg>
    ),
  },
];

function CurrWeekCard({
  week,
  total_weeks,
}: {
  week: string;
  total_weeks: string;
}) {
  return (
    <>
      {/* Calendar week 卡片 */}
      <Card className="w-full px-1 py-2 shrink text-parimary-forground bg-primary text-center relative flex-col content-start items-center justify-around justify-items-center">
        <CardHeader className="mb-7">
          <CardTitle>WEEK</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-bold text-xl">{week}</p>
          {/* <p className="mt-5 font-light">of {total_weeks}</p> */}
        </CardContent>
        <CardFooter className="mt-7">
          <p className="font-light text-center w-full">of {total_weeks}</p>
        </CardFooter>
        <div className="flex justify-around w-full absolute bottom-6 left-0 px-6 h-fit">
          <p> . . . </p>
        </div>
      </Card>
    </>
  );
}

function TodayCourses({ today_courses }: { today_courses: Course[] }) {
  // const cur_date = new Date();
  return (
    <Card className="flex lg:flex-col w-full p-2 text-parimary-forground bg-primary text-center relative items-start pt-6 pb-4 h-full">
      <div className="w-2/5 lg:w-full flex items-start pt-1">
        <Calendar showTool={false} selectable={false} />
      </div>
      <CourseList today_courses={today_courses} />
    </Card>
  );
}

function CourseSearchCard() {
  const { t } = useTranslation();
  return (
    <Card className="flex flex-col w-full p-0 text-parimary-forground bg-primary text-center relative items-center pt-6 pb-3">
      <CardContent className="px-4 w-full pb-1">
        <CardTitle className="text-xl text-left px-2">
          {t("home.course")}
        </CardTitle>
        <div className="w-full px-0 text-left">
          <CourseSearch compact={true} />
        </div>
      </CardContent>
    </Card>
  );
}

function DirectoryCard() {
  const { t } = useTranslation();
  return (
    <Card className="w-full p-1 text-parimary-forground bg-primary text-center relative flex-col content-start">
      <CardHeader className="px-1">
        <CardTitle className="text-xl">{t("home.directory")}</CardTitle>
        <CardDescription>{t("home.directory-description")}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center px-4">
        <div className="grid grid-cols-2 gap-4 w-full">
          {directory_contents.map((content) => {
            return (
              <a
                className="flex-col items-center justify-center px-2 py-3 rounded-lg bg-accent min-w-12"
                href={content.url}
              >
                <div className="w-full flex justify-center">{content.icon}</div>
                <p className="text-secondary text-sm">
                  {t("home.directory-" + content.title)}
                </p>
              </a>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function AnnouncementCard({
  announcements,
}: {
  announcements: Announcement[];
}) {
  const { t } = useTranslation();
  return (
    <Card className="w-full py-1 text-parimary-forground bg-primary text-center relative flex-col content-start">
      <CardHeader className="px-1">
        <CardTitle className="text-xl">{t("home.announcement")}</CardTitle>
        <CardDescription>{t("home.announcement-description")}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col justify-center space-y-1.5 text-left px-4">
        {announcements.map((announcement) => {
          return (
            <Card className="w-full h-fit border-none bg-card shadow-none p-1">
              <CardContent className="flex flex-col justify-between p-0 mx-2">
                <p className="text-sm font-bold leading-tight">
                  {announcement.title}
                </p>
                <p className="text-xs font-light leading-tight">
                  {announcement.date}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </CardContent>
    </Card>
  );
}

function CalendarCoursesViewCard() {
  const { t } = useTranslation();
  return (
    <Card className="flex flex-col w-full p-0 text-parimary-forground bg-primary text-center relative items-center pt-6 pb-2">
      <CardContent className="px-6 w-full pb-1">
        <CardTitle className="text-xl text-left px-2">
          {t("home.calendar")}
        </CardTitle>
        <div className="w-full px-1.5 text-left my-2">
          <CalendarCoursesView compact />
        </div>
      </CardContent>
    </Card>
  );
}

function Home() {
  // const { t } = useTranslation();
  const week = "11";
  const total_weeks = "12";
  const today_course = [
    {
      courseCode: "COMP 1234",
      description: "Fundamental concepts of Mathematics",
      startTime: "10:00",
      endTime: "12:00",
      type: "Lecture",
      location: "Online",
    },
    {
      courseCode: "COMP 7282",
      description: "Machine Learning",
      startTime: "10:00",
      endTime: "12:00",
      type: "Lecture",
      location: "MWT 101",
    },
    {
      courseCode: "COMP 7282",
      description: "Machine Learning",
      startTime: "10:00",
      endTime: "12:00",
      type: "Lecture",
      location: "MWT 101",
    },
    {
      courseCode: "COMP 7282",
      description: "Machine Learning",
      startTime: "10:00",
      endTime: "12:00",
      type: "Lecture",
      location: "MWT 101",
    },
  ];
  const announcements = [
    {
      title: "申请转主修",
      date: "2021-11-11",
    },
    {
      title: "申请转主修",
      date: "2021-11-11",
    },
  ];

  return (
    <div className="flex max-w-full w-full">
      <NavBar currentPath="/home" />

      <ScrollArea className="w-full h-screen text-left px-5 relative">
        <div className="w-full text-left flex justify-around space-x-6 my-2 px-2 py-4 relative">
          {/* 左边 */}
          <div className="flex flex-col mb-4 lg:w-[65%] flex-grow w-full space-y-4">
            <div className="flex w-full space-x-4 relative h-fit">
              <CurrWeekCard week={week} total_weeks={total_weeks} />
              <DirectoryCard />
              <AnnouncementCard announcements={announcements} />
            </div>
            <div className="lg:hidden w-full">
              <TodayCourses today_courses={today_course} />
            </div>
            <CourseSearchCard />
            <CalendarCoursesViewCard />
          </div>
          {/* 右边 */}
          <div className="w-[35%] max-w-96 hidden lg:block h-full">
            <TodayCourses today_courses={today_course} />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

export default Home;
