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
import { CalendarListApiResponse } from "@/lib/types.ts";
import React, { SetStateAction, useEffect, useRef, useState } from "react";

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
  availableYears,
  availableTerms,
}: {
  compact?: boolean;
  events: CalendarListApiResponse[];
  currentDay?: Date;
  setCurrentDay?: React.Dispatch<SetStateAction<Date>>;
  currentYear?: string;
  setCurrentYear?: React.Dispatch<SetStateAction<string>>;
  currentTerm?: string;
  setCurrentTerm?: React.Dispatch<SetStateAction<string>>;
  availableYears?: string[];
  availableTerms?: { [key: string]: string[] };
}) => {
  // const [view, setView] = useState(Views.WORK_WEEK);
  const eventRefs = useRef<EventRefs>({});
  const [currentView, setCurrentView] = useState<View>(Views.WORK_WEEK);

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
        availableYears={availableYears}
        availableTerms={availableTerms}
        props={props}
      />
    );
  };

  const minTime: Date = new Date();
  if (compact) minTime.setHours(9, 0, 0);
  else minTime.setHours(8, 0, 0);

  const maxTime: Date = new Date();
  if (compact) maxTime.setHours(17, 0, 0);
  else maxTime.setHours(20, 0, 0);

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

  const CustomEvent = ({ event }: { event: CalendarListApiResponse }) => {
    return (
      <div
        className="custom-event"
        onMouseEnter={onMouseOverEvent}
        id={event.subclass_detail.subclass_id.toString()}
        ref={(el) =>
          (eventRefs.current[event.subclass_detail.subclass_id] = el)
        }
      >
        <p className="text-xs font-bold">{event.course_detail.course_code}</p>
        <p className="text-xs">{event.course_detail.course_title}</p>
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
        events={events}
        startAccessor="calendar_end_time"
        endAccessor="calendar_start_time"
        style={{ height: "100%", width: "100%" }}
        // views={[hasWeekendEvents ? Views.WEEK : Views.WORK_WEEK]}
        // header={{ left: "", center: "", right: "" }}
        views={[Views.WORK_WEEK, Views.WEEK]}
        view={currentView}
        defaultView={currentView}
        // defaultView={hasWeekendEvents ? Views.WEEK : Views.WORK_WEEK}
        toolbar={!compact}
        defaultDate={moment().toDate()}
        min={minTime}
        max={maxTime}
        formats={formats}
        // step={60}
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
