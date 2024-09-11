// import { useState } from "react";
import Calendar from "@/components/calendar/calendar";
import CalendarCoursesView from "@/components/calendarCoursesView/calendarCoursesView.tsx";
import CourseList from "@/components/courseList/courseList.tsx";
import NotLoggedIn from "@/components/notLoggedIn/notLoggedIn.tsx";
import { useEffect, useState } from "react";
import { getCalendar, getAvailable } from "@/lib/api.ts";
import {
  CalendarListApiResponse,
  AvailableCalendar,
  TermInfo,
} from "@/lib/types.ts";
import moment from "moment";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";

const weekday = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function getClosestYear(availableYears: string[]): string {
  if (availableYears.length === 0) return "";
  const currentYear = new Date().getFullYear();
  const closestYear = availableYears
    .map((year) => parseInt(year.split("-")[0], 10)) // Extract the starting year
    .reduce((prev, curr) =>
      Math.abs(curr - currentYear) < Math.abs(prev - currentYear) ? curr : prev,
    );
  return (
    availableYears.find((year) => year.startsWith(closestYear.toString())) ||
    availableYears[0]
  );
}

function getCurrentTerm(terms: TermInfo): string {
  if (terms === undefined) return "";
  const currentDate = new Date();
  for (const term of Object.keys(terms)) {
    const termStartDate = new Date(terms[term].start_date);
    const termEndDate = new Date(terms[term].end_date);

    if (currentDate >= termStartDate && currentDate <= termEndDate) {
      return term;
    }
  }

  if (currentDate < new Date(terms[Object.keys(terms)[0]].start_date)) {
    return Object.keys(terms)[0];
  }

  return Object.keys(terms)[Object.keys(terms).length - 1];
}

function MyCalendar() {
  // const [date, setDate] = useState<Date | undefined>(new Date())
  const token = localStorage.getItem("token");
  const [currentDay, setCurrentDay] = useState(moment().toDate());

  const [availability, setAvailability] = useState<AvailableCalendar>({});

  const [currentYear, setCurrentYear] = useState<string>("");
  const [currentTerm, setCurrentTerm] = useState<string>("");

  const [myCourses, setMyCourses] = useState([]);
  const [todayCourses, setTodayCourses] = useState([]);

  useEffect(() => {
    console.log(currentDay);
    if (token) {
      // fetch my courses
      getAvailable().then((calendar_available: AvailableCalendar) => {
        setAvailability(calendar_available);

        const availableYearsTemp: string[] = [];
        Object.keys(calendar_available).forEach((key) => {
          availableYearsTemp.push(key);
        });
        if (availableYearsTemp.length === 0) return;
        const currentYear = getClosestYear(availableYearsTemp);
        setCurrentYear(currentYear);
        const currentTerm = getCurrentTerm(calendar_available[currentYear]);
        setCurrentTerm(currentTerm);
        getCalendar(currentYear, currentTerm).then((calendar_list) => {
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

    console.log(availability);
    for (const year of Object.keys(availability)) {
      console.log(year);
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
  }, [currentDay, myCourses]);

  useEffect(() => {
    if (!availability || !currentYear || !currentTerm) return;
    console.log(currentYear, currentTerm);
    getCalendar(currentYear, currentTerm)
      .then((calendar_list) => {
        setMyCourses(calendar_list);
        const d = new Date();
        const day = weekday[d.getDay()];
        const today_course = calendar_list.filter(
          (course: CalendarListApiResponse) => course.calendar_weekday == day,
        );
        setTodayCourses(today_course);
      })
      .finally(() => {
        const currentDate = new Date();
        const terms = availability[currentYear];

        const termStartDate = new Date(terms[currentTerm].start_date);
        const termEndDate = new Date(terms[currentTerm].end_date);
        if (currentDate >= termStartDate && currentDate <= termEndDate) {
          setCurrentDay(currentDate);
          return;
        }
        setCurrentDay(
          new Date(availability[currentYear][currentTerm].start_date),
        );
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
            <CourseList courses={todayCourses} label="课程" />
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
