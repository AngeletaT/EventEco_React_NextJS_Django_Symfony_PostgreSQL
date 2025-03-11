"use client";

import React, { useEffect, useState } from "react";
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import { useSubevents, useUpdateSubevent } from "@/hooks/eventeco/useSubevents";
import { Event } from "@/types/Event";
import { Subevent } from "@/types/Subevent";
import { parseISO, format } from "date-fns";
import { Toast } from "@/utils/PrimeReactComponents";
import SubeventModal from "./SubeventModal";
import { subeventCalendar } from "@/types/SubeventCalendar";

// #region getDays
const getDays = (startDate: string, endDate: string) => {
    const days = [];
    const start = new Date(startDate);
    const end = new Date(endDate);
    let id = 1;

    for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
        days.push({
            name: format(date, "dd/MM/yyyy"),
            id: id.toString(),
            start: new DayPilot.Date(date),
        });
        id++;
    }

    return days;
};

// #region formatEventDate
const formatEventDate = (dateString: string) => {
    return new DayPilot.Date(parseISO(dateString)).toString();
};

// #region mapSubeventsToEvents
const mapSubeventsToEvents = (subevents: Subevent[], columns: any, idevent: number) => {
    const subeventsCalendar = subevents
        .filter((subevent) => subevent.isactive)
        .map((subevent) => {
            const subeventStartDate = format(parseISO(subevent.startdate), "dd/MM/yyyy");
            const column = columns.find((col: any) => col.name === subeventStartDate);

            return {
                id: subevent.idsubevents,
                text: subevent.name,
                start: formatEventDate(subevent.startdate),
                end: formatEventDate(subevent.enddate),
                barColor: subevent.urlposter,
                resource: column ? column.id : null,
                data: {
                    idsubevents: subevent.idsubevents,
                    name: subevent.name,
                    description: subevent.description,
                    startdate: subevent.startdate,
                    enddate: subevent.enddate,
                    isactive: subevent.isactive,
                    urlposter: subevent.urlposter,
                    status: subevent.status,
                    idevent: idevent,
                },
            };
        });
    console.log("Subevents calendar: ", subeventsCalendar);
    return subeventsCalendar as subeventCalendar[];
};

// #region SubeventCalendar
const SubeventCalendar: React.FC<{ event: Event }> = ({ event }) => {
    const { subevents, isLoading, isError, refetch } = useSubevents(event.eventslug);
    const updateSubevent = useUpdateSubevent();
    const toast = React.useRef<Toast>(null);

    const [columns, setColumns] = useState(getDays(event.startdate, event.enddate));
    const [events, setEvents] = useState<any[]>([]);
    const [selectedSubevent, setSelectedSubevent] = useState<subeventCalendar | null>(null);
    const [selectedRange, setSelectedRange] = useState<{ start: string; end: string } | undefined>(undefined);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (subevents) {
            setEvents(mapSubeventsToEvents(subevents, columns, event.idevent));
        }
    }, [subevents, columns]);

    const config: DayPilot.CalendarConfig = {
        viewType: "Resources",
        locale: "es-es",
        columns: columns,
        events: events,
        timeRangeSelectedHandling: "Enabled",
        // #region onTimeRangeSelected
        onTimeRangeSelected: async (args) => {
            console.log("Time range selected: ", args.start, args.end);

            setSelectedRange({ start: args.start.toString(), end: args.end.toString() });
            setSelectedSubevent(null);
            setModalVisible(true);
        },
        // #region onEventClick
        onEventClick: async (args) => {
            console.log("Event clicked: ", args.e.data);

            const subevent = subevents.find((subevent) => subevent.idsubevents === args.e.id());
            if (subevent) {
                setSelectedSubevent({
                    id: subevent.idsubevents,
                    text: subevent.name,
                    start: formatEventDate(subevent.startdate),
                    end: formatEventDate(subevent.enddate),
                    barColor: subevent.urlposter,
                    resource: columns.find((col: any) => col.name === format(parseISO(subevent.startdate), "dd/MM/yyyy"))?.id || null,
                    data: subevent,
                });
                setSelectedRange(undefined);
                setModalVisible(true);
            } else {
                setSelectedRange({ start: args.e.start.toString(), end: args.e.end.toString() });
                setSelectedSubevent(null);
                setModalVisible(true);
            }
        },
        // #region onEventMoved
        onEventMoved: async (args) => {
            const subeventCalendar = args.e.data;
            const idsubevents = args.e.id() as number;
            const newStart = args.newStart.toString();
            const newEnd = args.newEnd.toString();

            updateSubevent.mutate(
                {
                    idsubevents,
                    subeventData: {
                        name: subeventCalendar.text,
                        startDate: newStart,
                        endDate: newEnd,
                        description: subeventCalendar.data.description,
                        status: subeventCalendar.data.status,
                        urlposter: subeventCalendar.data.urlposter,
                    },
                },
                {
                    onSuccess: () => {
                        toast.current?.show({ severity: "success", summary: "Éxito", detail: "Subevento actualizado correctamente", life: 3000 });
                        refetch();
                    },
                    onError: () => {
                        toast.current?.show({ severity: "error", summary: "Error", detail: "No se pudo actualizar el subevento", life: 3000 });
                    },
                }
            );
        },
        // #region onEventResized
        onEventResized: async (args) => {
            const subeventCalendar = args.e.data;
            const idsubevents = args.e.id() as number;
            const newStart = args.newStart.toString();
            const newEnd = args.newEnd.toString();
            const originalStart = subeventCalendar.data.start;
            const originalEnd = subeventCalendar.data.end;

            if (newStart !== originalStart) {
                console.log("Start date changed: ", newStart);
                subeventCalendar.start = newStart;
            }

            if (newEnd !== originalEnd) {
                console.log("End date changed: ", newEnd);
                subeventCalendar.end = newEnd;
            }

            updateSubevent.mutate(
                {
                    idsubevents,
                    subeventData: {
                        name: subeventCalendar.text,
                        startDate: subeventCalendar.start,
                        endDate: subeventCalendar.end,
                        description: subeventCalendar.data.description,
                        status: subeventCalendar.data.status,
                        urlposter: subeventCalendar.data.urlposter,
                    },
                },
                {
                    onSuccess: () => {
                        toast.current?.show({
                            severity: "success",
                            summary: "Éxito",
                            detail: "Duración del subevento actualizada",
                            life: 3000,
                        });
                        refetch();
                    },
                    onError: () => {
                        toast.current?.show({
                            severity: "error",
                            summary: "Error",
                            detail: "No se pudo actualizar el subevento",
                            life: 3000,
                        });
                    },
                }
            );
        },
    };

    if (isLoading) return <p>Cargando subeventos...</p>;
    if (isError) return <p>Error al cargar los subeventos.</p>;

    // #region return
    return (
        <div>
            <Toast ref={toast} />
            <DayPilotCalendar {...config} />
            <SubeventModal
                visible={modalVisible}
                onHide={() => setModalVisible(false)}
                subevent={selectedSubevent}
                idevent={event.idevent}
                selectedRange={selectedRange}
                refetch={refetch}
            />
        </div>
    );
};

export default SubeventCalendar;
