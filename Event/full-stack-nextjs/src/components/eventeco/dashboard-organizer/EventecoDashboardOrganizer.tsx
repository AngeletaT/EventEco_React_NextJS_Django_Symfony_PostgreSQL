"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "@/store/eventeco/slices/userSlice";
import { RootState } from "@/store/eventeco";
import { Organizer } from "@/types/User";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Metrics from "./Metrics";
import EventList from "./event/EventList";
import TicketList from "./tickets/TicketList";
import OrganizerSettings from "./OrganizerSettings";
import styles from "@/styles/eventeco/DashboardOrganizer.module.css";

const EventecoDashboardOrganizer: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState<"metrics" | "events" | "tickets" | "settings">("metrics");

    const dispatch = useDispatch();
    const { user, isLoading } = useSelector((state: RootState) => state.user) as {
        user: Organizer | null;
        isAuthenticated: boolean;
        isLoading: boolean;
    };

    useEffect(() => {
        if (!user) {
            dispatch(fetchUser() as any);
        }
    }, [dispatch, user]);

    return (
        <div className={styles.dashboardContainer}>
            <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            <div className={styles.mainContent}>
                <Topbar user={user} isLoading={isLoading} />
                <div className={styles.content}>
                    {selectedTab === "metrics" && <Metrics />}
                    {selectedTab === "events" && <EventList />}
                    {selectedTab === "tickets" && <TicketList />}
                    {selectedTab === "settings" && <OrganizerSettings />}
                </div>
            </div>
        </div>
    );
};

export default EventecoDashboardOrganizer;
