import { useState } from "react";
import CalendarDays from "./calendar-days";
import "./calendar.css";
import arrowRight from "@/assets/arrow-right.svg";

interface CalendarDay {
  currentMonth: boolean;
  date: Date;
  month: number;
  number: number;
  selected: boolean;
  year: number;
}

export default function Calendar({
  showTool,
  selectable,
}: {
  showTool: boolean;
  selectable: boolean;
}) {
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

  const changeCurrentDay = (day: CalendarDay) => {
    if (!selectable) return;
    setCurrentDay(new Date(day.year, day.month, day.number));
  };

  // const changeCurrentMonth = (day: any) => {
  //   setCurrentDay(new Date(day.year, day.month, day.number));
  // };

  const nextDay = () => {
    setCurrentDay(
      (prevDay) => new Date(prevDay.setDate(prevDay.getDate() + 1)),
    );
  };

  const previousDay = () => {
    setCurrentDay(
      (prevDay) => new Date(prevDay.setDate(prevDay.getDate() - 1)),
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
            <img
              alt="left"
              onClick={previousDay}
              src={arrowRight}
              className="leftArrow"
            />
            <img
              alt="Right"
              onClick={nextDay}
              src={arrowRight}
              className="rightArrow"
            />
          </div>
        )}
      </div>

      <div className="calendar-body">
        <div className="table-header">
          {weekdays.map((weekday, key) => {
            return (
              <div className="weekday" key={key}>
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
