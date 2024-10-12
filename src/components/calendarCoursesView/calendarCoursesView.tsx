import {
  Calendar,
  momentLocalizer,
  Formats,
  Views,
  ToolbarProps,
  View,
} from "react-big-calendar";
import moment from "moment";
import CustomToolbar from "./customToolBar.tsx";
import "./rbc.css";
import {
  CalendarListApiResponse,
  AvailableCalendar,
  CalendarEvent,
} from "@/lib/types.ts";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const localizer = momentLocalizer(moment);

interface EventRefs {
  [key: string]: HTMLDivElement | null;
}

const CalendarCoursesView = ({
  compact = false,
  events,
  currentDay,
  setCurrentDay,
  currentYear,
  setCurrentYear,
  currentTerm,
  setCurrentTerm,
  availability,
}: {
  compact?: boolean;
  events: CalendarListApiResponse[];
  currentDay?: Date;
  setCurrentDay?: React.Dispatch<SetStateAction<Date>>;
  currentYear?: string;
  setCurrentYear?: React.Dispatch<SetStateAction<string>>;
  currentTerm?: string;
  setCurrentTerm?: React.Dispatch<SetStateAction<string>>;
  availability?: AvailableCalendar;
}) => {
  // const [view, setView] = useState(Views.WORK_WEEK);
  const eventRefs = useRef<EventRefs>({});
  const [currentView, setCurrentView] = useState<View>(Views.WORK_WEEK);
  const [calEvents, setCalEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    if (!events || events.length <= 0) return;
    if (
      events.some((event: CalendarListApiResponse) => {
        return (
          event.calendar_weekday === "Sa" || event.calendar_weekday === "Su"
        );
      })
    ) {
      setCurrentView(Views.WEEK);
    }

    const newEvents: CalendarEvent[] = [];
    events.forEach((event: CalendarListApiResponse) => {
      const startHours = Math.floor(event.calendar_start_time / 60);
      const startMinutes = event.calendar_start_time % 60;
      const endHours = Math.floor(event.calendar_end_time / 60);
      const endMinutes = event.calendar_end_time % 60;
      event.calendar_date_list.forEach((date) => {
        const startDateTime = new Date(date);
        startDateTime.setHours(startHours, startMinutes);
        const endDateTime = new Date(date);
        endDateTime.setHours(endHours, endMinutes);
        const newEvent: CalendarEvent = {
          course_code: event.course_detail.course_code,
          course_title: event.course_detail.course_title,
          calendar_venue: event.calendar_venue,
          subclass_id: event.subclass_detail.subclass_id,
          calendar_start_date_time: startDateTime,
          calendar_end_date_time: endDateTime,
          date: date,
        };
        newEvents.push(newEvent);
      });
    });
    if (newEvents && newEvents.length > 0) {
      setCalEvents(newEvents);
    }
  }, [events]);

  const CustomToolbarWrapper: React.FC<ToolbarProps> = (props) => {
    return (
      <CustomToolbar
        currentDay={currentDay}
        setCurrentDay={setCurrentDay}
        currentYear={currentYear}
        setCurrentYear={setCurrentYear}
        currentTerm={currentTerm}
        setCurrentTerm={setCurrentTerm}
        availability={availability}
        props={props}
      />
    );
  };

  const minTime: Date = new Date();

  const maxTime: Date = new Date();
  if (events.length > 0) {
    let maxHour = 0;
    let minHour = 24;

    events.forEach((event: CalendarListApiResponse) => {
      const startHours = Math.floor(event.calendar_start_time / 60) - 1;
      const endHours = Math.floor(event.calendar_end_time / 60) + 1;
      if (endHours > maxHour) {
        maxHour = endHours;
      }
      if (startHours < minHour) {
        minHour = startHours;
      }
    });

    if (compact) {
      minTime.setHours(Math.min(minHour, 11), 0, 0);
      maxTime.setHours(Math.max(maxHour, 18), 0, 0);
    } else {
      minTime.setHours(Math.min(minHour, 9), 0, 0);
      maxTime.setHours(Math.max(maxHour, 19), 0, 0);
    }
  } else {
    minTime.setHours(9, 0, 0);
    maxTime.setHours(22, 0, 0);
  }

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

  const onMouseOverEvent = () => {
    if (!eventRefs.current) return;
    Object.values(eventRefs.current).forEach((el) => {
      if (!el?.parentElement?.parentElement) return;
      el.parentElement.parentElement.style.minHeight =
        el.parentElement.parentElement.style.height;
    });
  };

  const navigate = useNavigate();

  const CustomEvent = ({ event }: { event: CalendarEvent }) => {
    return (
      <div
        className="custom-event"
        onMouseEnter={onMouseOverEvent}
        onClick={() => navigate("/courses/" + event.course_code)}
        id={event.subclass_id.toString()}
        ref={(el) => (eventRefs.current[event.date + event.subclass_id] = el)}
      >
        <p className="text-xs font-bold">{event.course_code}</p>
        <p className="text-xs">{event.calendar_venue}</p>
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
        events={calEvents}
        startAccessor="calendar_start_date_time"
        endAccessor="calendar_end_date_time"
        style={{ height: "100%", width: "100%" }}
        // views={[hasWeekendEvents ? Views.WEEK : Views.WORK_WEEK]}
        // header={{ left: "", center: "", right: "" }}
        views={[Views.WORK_WEEK, Views.WEEK]}
        // view={currentView}
        defaultView={currentView}
        // defaultView={hasWeekendEvents ? Views.WEEK : Views.WORK_WEEK}
        toolbar={!compact}
        defaultDate={moment().toDate()}
        min={minTime}
        max={maxTime}
        formats={formats}
        step={60}
        components={{
          toolbar: CustomToolbarWrapper,
          week: {
            header: CustomDayHeader,
            event: CustomEvent,
          },
          work_week: {
            header: CustomDayHeader,
            event: CustomEvent,
          },
        }}
      />
    </>
  );
};

export default CalendarCoursesView;
