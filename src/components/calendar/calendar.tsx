import { useState } from "react";
import CalendarDays from "./calendar-days";
import "./calendar.css";
import arrowRight from "@/assets/arrow-right.svg";

export default function Calendar({ showTool, selectable }: { showTool: Boolean, selectable: Boolean}) {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [currentDay, setCurrentDay] = useState(new Date());

  const changeCurrentDay = (day: any) => {
    if (!selectable) return;
    setCurrentDay(new Date(day.year, day.month, day.number));
  };

  const changeCurrentMonth = (day: any) => {
    setCurrentDay(new Date(day.year, day.month, day.number));
  };

  const nextDay = () => {
    setCurrentDay(
      (prevDay) => new Date(prevDay.setDate(prevDay.getDate() + 1))
    );
  };

  const previousDay = () => {
    setCurrentDay(
      (prevDay) => new Date(prevDay.setDate(prevDay.getDate() - 1))
    );
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <div className="title">
          <h2>
            {months[currentDay.getMonth()]} {currentDay.getFullYear()}
          </h2>
        </div>
        {showTool && (
          <div className="tools">
            <img onClick={previousDay} src={arrowRight} className="leftArrow" />

            <img onClick={nextDay} src={arrowRight} className="rightArrow" />
          </div>
        )}
      </div>

      <div className="calendar-body">
        <div className="table-header">
          {weekdays.map((weekday) => {
            return (
              <div className="weekday">
                <p>{weekday}</p>
              </div>
            );
          })}
        </div>
        <CalendarDays day={currentDay} changeCurrentDay={changeCurrentDay} />
      </div>
    </div>
  );
}
