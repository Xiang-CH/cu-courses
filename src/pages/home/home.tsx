import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Calendar from "@/components/calendar/calendar";
// import { Calendar } from "@/components/ui/calendar"
import CourseSearch from "@/components/courseSearch/courseSearch.tsx";
import CourseList from "@/components/courseList/courseList.tsx";
import CalendarCoursesView from "@/components/calendarCoursesView/calendarCoursesView.tsx";
import { useEffect, useState } from "react";
import { getAvailable, getCalendar, request } from "@/lib/api.ts";
import { CalendarListApiResponse, Announcement } from "@/lib/types";
import { Link, useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import moment from "moment";

const icon_size = "1.5em";
const directory_contents = [
  {
    title: "app",
    url: "/home/apps",
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
    url: "https://www.fno.cuhk.edu.hk/staff/on-campus-catering-outlets/",
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
    url: "https://transport.cuhk.edu.hk/",
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
    url: "https://www.cuhk.edu.hk/english/campus/cuhk-campus-map.html",
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

const weekday = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function CurrWeekCard({
  week,
  total_weeks,
}: {
  week: string;
  total_weeks: string;
}) {
  return (
    <Card className="w-full p-1 text-parimary-forground bg-primary text-center relative flex-col content-start items-center justify-around justify-items-center">
      <CardHeader className="mb-7">
        <CardTitle>Week</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-bold text-xl">{week}</p>
      </CardContent>
      <CardFooter className="mt-7">
        <p className="font-light text-center w-full">of {total_weeks}</p>
      </CardFooter>
      <div className="flex justify-around w-full absolute bottom-6 left-0 px-6 h-fit">
        <p> . . . </p>
      </div>
    </Card>
  );
}

function TodayCourses({
  today_courses,
}: {
  today_courses: CalendarListApiResponse[];
}) {
  // const cur_date = new Date();
  const { t } = useTranslation();
  return (
    <Card className="flex lg:h-full flex-col md:flex-row lg:flex-col w-full md:p-2 text-parimary-forground bg-primary text-center relative items-start pb-2 pt-3 md:pt-4 md:pb-4 overflow-y-auto flex-grow">
      <ScrollArea className="max-h-full h-full w-full">
        <CardContent className="p-0">
          <div className="hidden w-2/5 lg:w-full md:flex items-start md:pt-1">
            <Calendar showTool={false} selectable={false} />
          </div>
          <div className="h-full flex-grow max-h-full w-full">
            <CourseList
              courses={today_courses}
              label={t("home.today-course")}
            />
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}

function CourseSearchCard() {
  const { t } = useTranslation();
  return (
    <Card
      className="flex-col overflow-y-auto w-full flex-grow p-0 text-parimary-forground bg-primary text-center relative items-center pt-2 md:pt-4 pb-3"
      id="CourseSearchCard"
    >
      <CardContent className="px-1 md:px-2 w-full pb-1">
        <CardTitle className="text-xl text-left px-4 pt-2 mb-1">
          {t("home.course")}
        </CardTitle>
        <div className="w-full px-1 text-left">
          <CourseSearch compact={true} />
        </div>
      </CardContent>
    </Card>
  );
}

function DirectoryCard() {
  const { t } = useTranslation();
  return (
    <Card className="w-full p-1 text-parimary-forground bg-primary text-center relative flex-col content-start ml-0">
      <CardHeader className="px-1">
        <CardTitle className="text-xl">{t("home.directory")}</CardTitle>
        <CardDescription>{t("home.directory-description")}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center px-2 md:px-4">
        <div className="grid grid-cols-2 gap-2 md:gap-4 w-full">
          {directory_contents.map((content) => {
            return (
              <Link
                key={content.url}
                to={content.url}
                target={content.url.startsWith("http") ? "_blank" : ""}
              >
                <div className="flex-col items-center justify-center px-2 py-4 rounded-lg bg-muted min-w-12 hover:bg-card hover:cursor-pointer transition duration-200 ease-in-out">
                  <div className="w-full flex justify-center">
                    {content.icon}
                  </div>
                  <p className="text-secondary text-sm">
                    {t("home.directory-" + content.title)}
                  </p>
                </div>
              </Link>
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
  const navigate = useNavigate();

  return (
    <Card className="w-full p-1 text-parimary-forground bg-primary text-center relative flex-col content-start">
      <CardHeader className="px-1">
        <CardTitle className="text-xl">{t("home.announcement")}</CardTitle>
        <CardDescription>{t("home.announcement-description")}</CardDescription>
      </CardHeader>
      <CardContent className="text-left w-full relative px-0">
        <ScrollArea className="h-44 px-2 md:px-4" scrollHideDelay={10}>
          <div className="w-full h-fit flex flex-col justify-center space-y-2.5">
            {announcements.map((announcement, index) => {
              return (
                <Card
                  key={index}
                  className="w-full h-fit border-none bg-muted shadow-none p-2 hover:bg-card hover:cursor-pointer transition duration-200 ease-in-out"
                  onClick={() => {
                    navigate(`/article/${announcement.article_id}`);
                  }}
                >
                  <CardContent className="flex flex-col justify-between p-0 mx-2">
                    <p className="text-sm font-bold leading-tight truncate">
                      {announcement.announcement_title}
                    </p>
                    <p className="text-xs font-light leading-tight">
                      {moment
                        .unix(announcement.announcement_create_time)
                        .format("yyyy-MM-DD")}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

function CalendarCoursesViewCard({
  events,
}: {
  events: CalendarListApiResponse[];
}) {
  const { t } = useTranslation();
  return (
    <Card className="flex-col overflow-y-hidden w-full flex-grow p-0 text-parimary-forground bg-primary text-center relative items-center pt-6 pb-3 min-h-40">
      <ScrollArea className="max-h-full h-full">
        <CardContent className="px-2 md:px-4 w-full pb-1">
          <CardTitle className="text-xl text-left px-2">
            {t("home.calendar")}
          </CardTitle>

          <div className="w-full px-1.5 text-left my-2">
            <CalendarCoursesView compact events={events} />
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}

function Home() {
  // const { t } = useTranslation();
  const [week, setWeek] = useState("");
  const [totalWeeks, setTotalWeeks] = useState("");
  const [todayCourses, setTodayCourses] = useState<CalendarListApiResponse[]>(
    [],
  );
  const [calendarEvents, setCalendarEvents] = useState<
    CalendarListApiResponse[]
  >([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const token = localStorage.getItem("token") || "";
  const logged_in = !!token;

  useEffect(() => {
    getAvailable().then((res) => {
      if (!res) return;

      const currentTerm = res.currentTerm;
      const currentYear = res.currentYear;
      const calendarDates = res.calendarAvailable[currentYear][currentTerm];

      const t1 = new Date(calendarDates.start_date).getTime();
      const t2 = new Date(calendarDates.end_date).getTime();
      const total_weeks = Math.ceil((t2 - t1) / (24 * 3600 * 1000 * 7));
      const week = Math.ceil(
        (new Date().getTime() - t1) / (24 * 3600 * 1000 * 7),
      );

      setWeek(week.toString());
      setTotalWeeks(total_weeks.toString());

      getCalendar(currentYear, currentTerm).then((calendar_list) => {
        setCalendarEvents(calendar_list);
        const d = new Date();
        const today_course = calendar_list.filter(
          (course: CalendarListApiResponse) =>
            course.calendar_weekday == weekday[d.getDay()],
        );
        setTodayCourses(today_course);
      });
    });
  }, []);

  // useEffect(() => {
  //   if (!token) return;
  //   request("/calendar/today.php", { token: token }).then((res) => {
  //     if (res.code === 200) {
  //       setTodayCourses(res.calendar_list);
  //     }
  //   });
  // }, []);

  useEffect(() => {
    request("/info/announcement.php", { token: token }).then((res) => {
      if (res.code === 200) {
        setAnnouncements(res.announcement_list);
      }
    });
  }, []);

  return (
    <div className="w-full h-full text-left flex justify-around space-x-6 px-2 md:px-6 pb-4 md:py-4 relative overflow-y-hidden max-w-[1300px]">
      {/* 左边 */}
      <div className="flex flex-col flex-grow lg:w-[65%] w-full space-y-4">
        <div className="hidden md:flex w-full space-x-4 relative h-72">
          <CurrWeekCard week={week} total_weeks={totalWeeks} />
          <DirectoryCard />
          <AnnouncementCard announcements={announcements} />
        </div>

        <div className="flex md:hidden w-full space-x-4 relative h-72">
          <DirectoryCard />
          <AnnouncementCard announcements={announcements} />
        </div>
        {logged_in ? (
          <CalendarCoursesViewCard events={calendarEvents} />
        ) : (
          <CourseSearchCard />
        )}
      </div>

      {/* 右边 */}
      <div className="lg:flex lg:flex-col w-[35%] max-w-96 hidden relative">
        <TodayCourses today_courses={todayCourses} />
      </div>
    </div>
  );
}

export default Home;
