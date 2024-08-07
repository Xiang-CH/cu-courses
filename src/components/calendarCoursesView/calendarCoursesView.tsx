import { useState } from "react";
import { Calendar, momentLocalizer, Formats, Views } from "react-big-calendar";
import moment from "moment";
import CustomToolbar from "./customToolBar.tsx";
import "./rbc.css";

interface CourseEvent {
  courseCode: string;
  title: string;
  location: string;
  start: Date;
  end: Date;
  allDay?: boolean;
}

const localizer = momentLocalizer(moment);

const CalendarCoursesView = ({ compact = false }: { compact?: boolean }) => {
  const [events] = useState<CourseEvent[]>([
    {
      courseCode: "Math 101",
      title: "Fundamental concepts of Mathematics",
      location: "Online",
      start: new Date(2024, 7, 5, 10, 0),
      end: new Date(2024, 7, 5, 11, 0),
    },
    {
      courseCode: "History 201",
      title: "World War II",
      location: "MWT 101",
      start: new Date(2024, 7, 6, 12, 0),
      end: new Date(2024, 7, 6, 13, 30),
    },
  ]);

  const minTime: Date = new Date();
  minTime.setHours(8, 0, 0);

  const maxTime: Date = new Date();
  maxTime.setHours(20, 0, 0);

  const formats: Formats = {
    timeGutterFormat: "HH",
    eventTimeRangeFormat: (localizer) =>
      localizer
        ? ""
        : // ? `${localizer.format(start, "HH:mm", culture)} - ${localizer.format(end, "HH:mm", culture)}`
          "",
    dayHeaderFormat: "ddd MMM DD",
    dayRangeHeaderFormat: ({ start, end }, culture, localizer) =>
      localizer
        ? `${localizer.format(start, "MMM DD", culture)} - ${localizer.format(end, "MMM DD", culture)}`
        : "",
    dayFormat: `ddd`,
    dateFormat: "DD",
    monthHeaderFormat: "MMMM YYYY",
    weekdayFormat: "dddd",
  };

  const CustomDayHeader = ({ date, label }: { date: Date; label: string }) => {
    return (
      <div className="custom-day-header">
        <strong>{label}</strong>
        <br />
        <span>{moment(date).format("MMM DD")}</span>
      </div>
    );
  };

  const CustomEvent = ({ event }: { event: CourseEvent }) => {
    return (
      <div className="custom-event">
        <p className="text-xs font-bold">{event.courseCode}</p>
        <p className="text-xs">{event.title}</p>
        <p className="text-xs">{event.location}</p>
      </div>
    );
  };

  return (
    <>
      {compact && (
        <style>{` .rbc-time-slot .rbc-label{ margin-left: 0.2rem; } `}</style>
      )}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%", width: "100%" }}
        views={[Views.WEEK]}
        // header={{ left: "", center: "", right: "" }}
        defaultView={"week"}
        toolbar={!compact}
        defaultDate={moment().toDate()}
        min={minTime}
        max={maxTime}
        formats={formats}
        // step={60}
        components={{
          toolbar: CustomToolbar,
          week: {
            header: CustomDayHeader,
            event: CustomEvent,
          },
        }}
      />
    </>
  );
};

export default CalendarCoursesView;
