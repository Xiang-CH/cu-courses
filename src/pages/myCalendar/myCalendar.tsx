// import { useState } from "react";
import NavBar from "@/components/navbar/navbar";
import Calendar from "@/components/calendar/calendar";
import CalendarCoursesView from "@/components/calendarCoursesView/calendarCoursesView.tsx";
import CourseList from "@/components/courseList/courseList.tsx";
import NotLoggedIn from "@/components/notLoggedIn/notLoggedIn.tsx";
import { useEffect, useState } from "react";
import { request } from "@/lib/api.ts";
import { CalendarListApiResponse } from "@/lib/types.ts";
import moment from "moment";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const weekday = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function MyCalendar() {
  // const [date, setDate] = useState<Date | undefined>(new Date())
  const { t } = useTranslation();
  const token = localStorage.getItem("token");
  const [currentDay, setCurrentDay] = useState(moment().toDate());
  const [availableYears, setAvailableYears] = useState<string[]>([]);
  const [availableTerms, setAvailableTerms] = useState({});
  const [currentYear, setCurrentYear] = useState<string>("");
  const [currentTerm, setCurrentTerm] = useState<string>("");

  const [myCourses, setMyCourses] = useState([]);
  const [todayCourses, setTodayCourses] = useState([]);

  useEffect(() => {
    console.log(currentDay);
    if (token) {
      // fetch my courses
      getAvailable().then((calendar_available: { [key: string]: string[] }) => {
        setAvailableTerms(calendar_available);
        const availableYearsTemp: string[] = [];
        Object.keys(calendar_available).forEach((key) => {
          availableYearsTemp.push(key);
        });
        setAvailableYears(availableYearsTemp);
        setCurrentYear(availableYearsTemp[0]);
        setCurrentTerm(calendar_available[availableYearsTemp[0]][0]);

        getCalendar(
          availableYearsTemp[0],
          calendar_available[availableYearsTemp[0]][0],
        ).then((calendar_list) => {
          setMyCourses(calendar_list);
          const d = new Date();
          const day = weekday[d.getDay()];
          const today_course = calendar_list.filter(
            (course: CalendarListApiResponse) => course.calendar_weekday == day,
          );
          console.log(today_course);
          setTodayCourses(today_course);
        });
      });
    }
  }, []);

  useEffect(() => {
    const day = weekday[currentDay.getDay()];
    console.log(day);
    const today_course = myCourses.filter(
      (course: CalendarListApiResponse) => course.calendar_weekday == day,
    );
    setTodayCourses(today_course);
  }, [currentDay, myCourses]);

  async function getCalendar(calendar_year: string, calendar_term: string) {
    const cache = sessionStorage.getItem("calendar_events");
    if (cache) {
      return JSON.parse(cache);
    }
    try {
      const res = await request("/calendar/get.php", {
        token: token || "",
        calendar_year: calendar_year,
        calendar_term: calendar_term,
      });
      if (res.code == 200) {
        sessionStorage.setItem(
          "calendar_events",
          JSON.stringify(res.calendar_list),
        );
        return res.calendar_list;
      }
      toast(t("errors.error"), {
        description: res.msg,
      });
      return [];
    } catch {
      toast(t("errors.error"), {
        description: t("errors.network-error"),
      });
      return [];
    }
  }

  async function getAvailable(): Promise<{ [key: string]: string[] }> {
    const cache = sessionStorage.getItem("available_calendars");
    if (cache) {
      return JSON.parse(cache);
    }

    try {
      const res = await request("/calendar/available.php", {
        token: token || "",
      });
      if (res.code == 200) {
        sessionStorage.setItem(
          "available_calendars",
          JSON.stringify(res.calendar_available),
        );
        return res.calendar_available;
      }
      toast(t("errors.error"), {
        description: res.msg,
      });
      return {};
    } catch {
      toast(t("errors.error"), {
        description: t("errors.network-error"),
      });
      return {};
    }
  }

  return (
    <div className="flex">
      <NavBar currentPath="/calendar" />

      <div className="flex w-full h-screen pl-6 text-left items-center relative">
        {!token && <NotLoggedIn />}
        <div className="w-2/5 pt-8 self-start hidden lg:block">
          <Calendar
            showTool={true}
            selectable={true}
            currentDay={currentDay}
            setCurrentDay={setCurrentDay}
          />
          <CourseList courses={todayCourses} label="课程" />
        </div>
        <div className="w-[4px] h-[95%] bg-secondary mx-2 hidden lg:block" />

        <div className="w-full px-6 h-full pb-6 pt-6 self-start">
          <CalendarCoursesView
            events={myCourses}
            currentDay={currentDay}
            setCurrentDay={setCurrentDay}
            currentYear={currentYear}
            setCurrentYear={setCurrentYear}
            currentTerm={currentTerm}
            setCurrentTerm={setCurrentTerm}
            availableYears={availableYears}
            availableTerms={availableTerms}
          />
        </div>
      </div>
    </div>
  );
}

export default MyCalendar;
