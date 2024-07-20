// import { useState } from "react";
import NavBar from "@/components/navbar/navbar";
import Calendar from "@/components/calendar/calendar";

function MyCalendar() {
  // const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="flex">
      <NavBar currentPath="/calendar" />
      <div className="flex w-full h-full py-10 pl-14 text-left">
        <div className="w-1/3">
          <Calendar showTool={true} selectable={true} />
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default MyCalendar;
