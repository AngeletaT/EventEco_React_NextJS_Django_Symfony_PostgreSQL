"use client";

import React, { useEffect, useState } from "react";
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import { Subevent } from "@/types/Subevent";
import { parseISO, format } from "date-fns";
import styles from "@/styles/eventeco/Client/ProfileTickets.module.css";

interface ReadOnlyCalendarProps {
    subevents: Subevent[];
}

const getDays = (startDate: string, endDate: string) => {
    const days = [];
    const start = new Date(startDate);
    const end = new Date(endDate);

    for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
        const dateISO = date.toISOString().split("T")[0];
        days.push({
            name: format(date, "dd/MM/yyyy"),
            id: dateISO,
            start: new DayPilot.Date(dateISO),
        });
    }

    return days;
};

const formatEventDate = (dateString: string) => {
    return new DayPilot.Date(parseISO(dateString)).toString();
};

const mapSubeventsToEvents = (subevents: Subevent[], columns: any) => {
    return subevents
        .filter((subevent) => subevent.isactive)
        .map((subevent) => {
            const resourceId = format(parseISO(subevent.startdate), "yyyy-MM-dd");
            const subeventStartDate = format(parseISO(subevent.startdate), "dd/MM/yyyy");
            const column = columns.find((col: any) => col.name === subeventStartDate);

            return {
                id: subevent.idsubevents,
                text: subevent.name,
                start: formatEventDate(subevent.startdate),
                end: formatEventDate(subevent.enddate),
                barColor: subevent.urlposter,
                description: subevent.description,
                resource: resourceId,
            };
        });
};

const ReadOnlyCalendar: React.FC<ReadOnlyCalendarProps> = ({ subevents }) => {
    const firstDate = subevents[0]?.startdate;
    const lastDate = subevents[subevents.length - 1]?.enddate;
    const columns = getDays(firstDate, lastDate);
    const [events, setEvents] = useState<any[]>([]);

    useEffect(() => {
        if (subevents && columns.length > 0) {
            setEvents(mapSubeventsToEvents(subevents, columns));
        }
    }, [subevents]);

    const config: DayPilot.CalendarConfig = {
        viewType: "Resources",
        locale: "es-es",
        columns: columns,
        events: events,
        timeRangeSelectedHandling: "Disabled",
        eventClickHandling: "Disabled",
        eventResizeHandling: "Disabled",
        eventMoveHandling: "Disabled",
        onBeforeEventRender: (args) => {
            const eventData = args.data as unknown as { description: string; text: string };
            const description = eventData.description;
            args.data.html = `<b>${eventData.text}</b><br/><small>${description}</small>`;
        },
    };

    return (
        <div style={{ height: "600px", border: "1px solid #ccc", borderRadius: "8px", maxWidth: "100%", margin: "0 auto" }}>
            <DayPilotCalendar {...config} />
        </div>
    );
};

export default ReadOnlyCalendar;
