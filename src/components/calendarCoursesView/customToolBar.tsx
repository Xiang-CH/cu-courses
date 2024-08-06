import React from "react";
import { ToolbarProps } from "react-big-calendar";
import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";

const CustomToolbar: React.FC<ToolbarProps> = (props) => {
  const { t } = useTranslation();

  const goToBack = () => {
    const { date, view, onNavigate } = props;
    const newDate = new Date(date);

    switch (view) {
      case "day":
        newDate.setDate(date.getDate() - 1);
        break;
      case "week":
        newDate.setDate(date.getDate() - 7);
        break;
      case "month":
        newDate.setMonth(date.getMonth() - 1);
        break;
      default:
        break;
    }

    onNavigate("PREV");
  };

  const goToNext = () => {
    const { date, view, onNavigate } = props;
    const newDate = new Date(date);

    switch (view) {
      case "day":
        newDate.setDate(date.getDate() + 1);
        break;
      case "week":
        newDate.setDate(date.getDate() + 7);
        break;
      case "month":
        newDate.setMonth(date.getMonth() + 1);
        break;
      default:
        break;
    }

    onNavigate("NEXT");
  };

  const goToToday = () => {
    const { onNavigate } = props;
    onNavigate("TODAY");
  };

  // const handleViewChange = (view: View) => {
  //   props.onView(view);
  // };

  return (
    <div className="flex justify-between mb-4">
      <button onClick={goToToday} className="rounded-3xl shadow px-4 py-2">
        {t("myCalendar.today")}
      </button>

      <div className="flex items-center">
        <button
          className="rounded-full shadow px-4 pt-2 mr-4 pb-2.5"
          onClick={goToBack}
        >
          &lt;
        </button>
        <Label className="font-bold text-sm">{props.label}</Label>
        <button
          className="rounded-full shadow px-4 py-2 ml-4 pb-2.5"
          onClick={goToNext}
        >
          &gt;
        </button>
      </div>

      <div>
        <span>Sem1</span>
      </div>
    </div>
  );
};

export default CustomToolbar;
