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

const EventecoDashboardOrganizer: React.FC = () => {
    const dispatch = useDispatch();
    const { user, isLoading } = useSelector((state: RootState) => state.user) as {
        user: Organizer | null;
        isAuthenticated: boolean;
        isLoading: boolean;
    };

    const [selectedView, setSelectedView] = useState<"metrics" | "settings" | "event">("metrics");
    const [selectedEvent, setSelectedEvent] = useState<string>("");

    useEffect(() => {
        if (!user) {
            dispatch(fetchUser() as any);
        }
    }, [dispatch, user]);

    return (
        <div className={styles.dashboardContainer}>
            <Sidebar
                selectedView={selectedView}
                setSelectedView={setSelectedView}
                setSelectedEvent={setSelectedEvent}
                selectedEvent={selectedEvent}
                newEventName=""
            />
            <div className={styles.mainContent}>
                <Topbar user={user} isLoading={isLoading} />
                <div className={styles.content}>
                    {selectedView === "metrics" && <Metrics />}
                    {selectedView === "settings" && <OrganizerSettings />}
                    {selectedView === "event" && <EventView eventslug={selectedEvent} />}
                </div>
            </div>
        </div>
    );
};

export default EventecoDashboardOrganizer;
