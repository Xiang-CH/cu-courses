// import { useState } from "react";
import NavBar from "@/components/navbar/navbar";
import Calendar from "@/components/calendar/calendar";
import CalendarCoursesView from "@/components/calendarCoursesView/calendarCoursesView.tsx";
import CourseList from "@/components/courseList/courseList.tsx";

function MyCalendar() {
  // const [date, setDate] = useState<Date | undefined>(new Date())
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

  return (
    <div className="flex">
      <NavBar currentPath="/calendar" />

      <div className="flex w-full h-screen pl-6 text-left items-center">
        <div className="w-2/5 pt-8 self-start hidden lg:block">
          <Calendar showTool={true} selectable={true} />
          <CourseList today_courses={today_course} />
        </div>
        <div className="w-[4px] h-[95%] bg-secondary mx-2 hidden lg:block" />

        <div className="w-full px-6 h-full pb-6 pt-6 self-start">
          <CalendarCoursesView />
        </div>
      </div>
    </div>
  );
}

export default MyCalendar;
