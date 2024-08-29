import React, { SetStateAction } from "react";
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
  currentDay = new Date(),
  setCurrentDay,
}: {
  showTool: boolean;
  selectable: boolean;
  currentDay?: Date;
  setCurrentDay?: React.Dispatch<SetStateAction<Date>>;
}) {
  const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
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

  const changeCurrentDay = (day: CalendarDay) => {
    if (!selectable) return;
    if (setCurrentDay) setCurrentDay(new Date(day.year, day.month, day.number));
  };

  // const changeCurrentMonth = (day: any) => {
  //   setCurrentDay(new Date(day.year, day.month, day.number));
  // };

  const nextDay = () => {
    if (setCurrentDay)
      setCurrentDay(
        (prevDay) => new Date(prevDay.setDate(prevDay.getDate() + 1)),
      );
  };

  const previousDay = () => {
    if (setCurrentDay)
      setCurrentDay(
        (prevDay) => new Date(prevDay.setDate(prevDay.getDate() - 1)),
      );
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <div className="title">
          <h2>
            {currentDay && months[currentDay.getMonth()]}{" "}
            {currentDay && currentDay.getFullYear()}
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
        {currentDay && (
          <CalendarDays
            selectable={selectable}
            day={currentDay}
            changeCurrentDay={changeCurrentDay}
          />
        )}
      </div>
    </div>
  );
}
