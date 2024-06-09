import { useState } from "react";
import NavBar from "@/components/navbar/navbar";
import { Calendar } from "@/components/ui/calendar"


function MyCalendar() {
    const [date, setDate] = useState<Date | undefined>(new Date())

    return (
        <>
            <NavBar/>
            <div className="flex w-full h-full py-10 pl-14 text-left">
                <div className="w-1/3">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border w-full h-96"
                    />
                </div>
            </div>
        </>
    );
};

export default MyCalendar;