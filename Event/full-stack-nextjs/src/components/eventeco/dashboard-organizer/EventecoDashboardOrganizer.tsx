"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "@/store/eventeco/slices/userSlice";
import { RootState } from "@/store/eventeco";
import { Organizer } from "@/types/User";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Metrics from "./Metrics";
import OrganizerSettings from "./OrganizerSettings";
import EventView from "./event/EventView";
import styles from "@/styles/eventeco/Organizer/DashboardOrganizer.module.css";
import { useEventsByOrganizer } from "@/hooks/eventeco/useEvents";

const EventecoDashboardOrganizer: React.FC = () => {
    const dispatch = useDispatch();
    const { user, isLoading } = useSelector((state: RootState) => state.user) as {
        user: Organizer | null;
        isAuthenticated: boolean;
        isLoading: boolean;
    };

    const [selectedView, setSelectedView] = useState<"metrics" | "settings" | "event">("metrics");
    const [selectedEvent, setSelectedEvent] = useState<string>("");
    const [newEventName, setNewEventName] = useState<string>("");
    const { data: events, refetch } = useEventsByOrganizer();
    const [creatingNewEvent, setCreatingNewEvent] = useState(false);

    useEffect(() => {
        if (!user) {
            dispatch(fetchUser() as any);
        }
    }, [dispatch, user]);

    const handleSetSelectedEvent = (eventslug: string) => {
        setSelectedEvent(eventslug);
        setNewEventName("");
        setCreatingNewEvent(false);
    };

    const handleCreateNewEvent = () => {
        setSelectedEvent("null");
        setNewEventName("");
        setCreatingNewEvent(true);
        setSelectedView("event");
    };

    const handleEventUpdated = () => {
        refetch();
        setCreatingNewEvent(false);
    };

    return (
        <div className={styles.dashboardContainer}>
            <Sidebar
                selectedView={selectedView}
                setSelectedView={setSelectedView}
                setSelectedEvent={handleSetSelectedEvent}
                selectedEvent={selectedEvent}
                newEventName={newEventName}
                events={events}
                creatingNewEvent={creatingNewEvent}
                onCreateNewEvent={handleCreateNewEvent}
            />
            <div className={styles.mainContent}>
                <Topbar user={user} isLoading={isLoading} />
                <div className={styles.content}>
                    {selectedView === "metrics" && <Metrics />}
                    {selectedView === "settings" && <OrganizerSettings />}
                    {selectedView === "event" && (
                        <EventView
                            eventslug={selectedEvent}
                            newEventName={newEventName}
                            setNewEventName={setNewEventName}
                            onEventUpdated={handleEventUpdated}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventecoDashboardOrganizer;
