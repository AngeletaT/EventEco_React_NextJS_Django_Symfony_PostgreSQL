"use client";

import React, { useState } from "react";
import EventecoLayout from "@/layouts/eventeco/EventecoLayout";
import Sidebar from "./Sidebar";
import ProfileTickets from "./ProfileTickets";
import ProfileOrders from "./ProfileOrders";
import ProfileSettings from "./ProfileSettings";
import ProfilePreferences from "./ProfilePreferences";
import styles from "@/styles/eventeco/Profile.module.css";

const EventecoProfileClient: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState<"tickets" | "orders" | "settings" | "preferences">("settings");

    return (
        <EventecoLayout>
            <div className={styles.profileContainer}>
                <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                <div className={styles.profileContent}>
                    {selectedTab === "tickets" && <ProfileTickets />}
                    {selectedTab === "orders" && <ProfileOrders />}
                    {selectedTab === "settings" && <ProfileSettings />}
                    {selectedTab === "preferences" && <ProfilePreferences />}
                </div>
            </div>
        </EventecoLayout>
    );
};

export default EventecoProfileClient;
