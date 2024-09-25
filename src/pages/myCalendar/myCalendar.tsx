// import { useState } from "react";
import Calendar from "@/components/calendar/calendar";
import CalendarCoursesView from "@/components/calendarCoursesView/calendarCoursesView.tsx";
import CourseList from "@/components/courseList/courseList.tsx";
import NotLoggedIn from "@/components/notLoggedIn/notLoggedIn.tsx";
import { useEffect, useState } from "react";
import { getCalendar, getAvailable } from "@/lib/api.ts";
import { CalendarListApiResponse, AvailableCalendar } from "@/lib/types.ts";
import moment from "moment";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { useTranslation } from "react-i18next";

const weekday = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function MyCalendar() {
  const { t } = useTranslation();
  // const [date, setDate] = useState<Date | undefined>(new Date())
  const token = localStorage.getItem("token");
  const [currentDay, setCurrentDay] = useState(moment().toDate());

  const [availability, setAvailability] = useState<AvailableCalendar>({});

  const [currentYear, setCurrentYear] = useState<string>("");
  const [currentTerm, setCurrentTerm] = useState<string>("");

  const [myCourses, setMyCourses] = useState([]);
  const [todayCourses, setTodayCourses] = useState([]);

  useEffect(() => {
    if (token) {
      // fetch my courses
      getAvailable().then((res) => {
        setAvailability(res.calendarAvailable);
        setCurrentYear(res.currentYear);
        setCurrentTerm(res.currentTerm);
        getCalendar(res.currentYear, res.currentTerm).then((calendar_list) => {
          setMyCourses(calendar_list);
          const d = new Date();
          const day = weekday[d.getDay()];
          const today_course = calendar_list.filter(
            (course: CalendarListApiResponse) => course.calendar_weekday == day,
          );
          setTodayCourses(today_course);
        });
      });
    }
  }, []);

  useEffect(() => {
    if (
      !availability ||
      !currentYear ||
      !currentTerm ||
      !myCourses ||
      !currentDay
    )
      return;

    const day = weekday[currentDay.getDay()];
    const today_course = myCourses.filter(
      (course: CalendarListApiResponse) => course.calendar_weekday == day,
    );
    setTodayCourses(today_course);

    for (const year of Object.keys(availability)) {
      for (const term of Object.keys(availability[year])) {
        const termStartDate = new Date(availability[year][term].start_date);
        const termEndDate = new Date(availability[year][term].end_date);
        if (currentDay >= termStartDate && currentDay <= termEndDate) {
          setCurrentYear(year);
          setCurrentTerm(term);
          return;
        }
      }
    }
  }, [currentDay]);

  useEffect(() => {
    if (!availability || !currentYear || !currentTerm) return;
    const currentDate = new Date();
    const terms = availability[currentYear];

    const termStartDate = new Date(terms[currentTerm].start_date);
    const termEndDate = new Date(terms[currentTerm].end_date);

    if (currentDate >= termStartDate && currentDate <= termEndDate) {
      setCurrentDay(currentDate);
    } else {
      setCurrentDay(termStartDate);
    }

    getCalendar(currentYear, currentTerm).then((calendar_list) => {
      setMyCourses(calendar_list);
      const d = new Date();
      const day = weekday[d.getDay()];
      const today_course = calendar_list.filter(
        (course: CalendarListApiResponse) => course.calendar_weekday == day,
      );
      setTodayCourses(today_course);
    });
  }, [currentTerm, currentYear]);

  return (
    <div className="w-full h-full relative">
      <div className="flex h-full w-full lg:pl-3 text-left items-center relative">
        {!token && <NotLoggedIn />}
        <ScrollArea className="hidden lg:block h-full w-1/4 min-w-[320px]">
          <div className="w-full pt-6 self-start max-h-screen">
            <Calendar
              showTool={true}
              selectable={true}
              currentDay={currentDay}
              setCurrentDay={setCurrentDay}
            />
            <CourseList
              courses={todayCourses}
              label={t("calendar.course-list")}
            />
          </div>
        </ScrollArea>

        <div className="w-[3px] h-[95%] bg-muted mx-2 hidden lg:block" />

        <div className="w-full flex-1 lg:px-2 md:px-6 h-full pb-6 pt-1 md:pt-6 self-start">
          <CalendarCoursesView
            events={myCourses}
            currentDay={currentDay}
            setCurrentDay={setCurrentDay}
            currentYear={currentYear}
            setCurrentYear={setCurrentYear}
            currentTerm={currentTerm}
            setCurrentTerm={setCurrentTerm}
            availability={availability}
          />
        </div>
      </div>
    </div>
  );
}

export default MyCalendar;
