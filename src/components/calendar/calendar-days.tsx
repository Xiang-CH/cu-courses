interface CalendarDay {
  currentMonth: boolean;
  date: Date;
  month: number;
  number: number;
  selected: boolean;
  year: number;
}

function CalendarDays({
  day,
  changeCurrentDay,
  selectable = false,
}: {
  day: Date;
  changeCurrentDay: (day: CalendarDay) => void;
  selectable?: boolean;
}) {
  const firstDayOfMonth: Date = new Date(day.getFullYear(), day.getMonth(), 1);
  const weekdayOfFirstDay: number = firstDayOfMonth.getDay();
  const currentDays: CalendarDay[][] = [[], [], [], [], [], []];

  for (let d = 0; d < 42; d++) {
    if (d === 0 && weekdayOfFirstDay === 0) {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
    } else if (d === 0) {
      firstDayOfMonth.setDate(
        firstDayOfMonth.getDate() + (d - weekdayOfFirstDay),
      );
    } else {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
    }

    const calendarDay = {
      currentMonth: firstDayOfMonth.getMonth() === day.getMonth(),
      date: new Date(firstDayOfMonth),
      month: firstDayOfMonth.getMonth(),
      number: firstDayOfMonth.getDate(),
      selected: firstDayOfMonth.toDateString() === day.toDateString(),
      year: firstDayOfMonth.getFullYear(),
    };

    const weekIdx = Math.floor(d / 7);
    currentDays[weekIdx].push(calendarDay);
  }

  return (
    <div className="table-content">
      {currentDays.map((week, index) => {
        return (
          <div className="week" key={index}>
            {week.map((day, index) => {
              return (
                <div
                  key={index}
                  className={
                    "calendar-day" +
                    (day.currentMonth ? "" : " not-current") +
                    (day.date.toDateString() === new Date().toDateString()
                      ? " today"
                      : "") +
                    (!selectable ? " no-select" : "") +
                    (day.selected ? " selected" : "")
                  }
                  onClick={() => changeCurrentDay(day)}
                >
                  <p>{day.number}</p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default CalendarDays;
