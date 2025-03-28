"use client";

import React, { useState, useEffect } from "react";
import { useOrdersByClient } from "@/hooks/eventeco/useOrders";
import { Order } from "@/types/eventeco/Order";
import EventecoLayout from "@/layouts/eventeco/EventecoLayout";
import Sidebar from "./Sidebar";
import ProfileTickets from "./ProfileTickets";
import ProfileOrders from "./ProfileOrders";
import ProfileSettings from "./ProfileSettings";
import ProfilePreferences from "./ProfilePreferences";
import styles from "@/styles/eventeco/Client/Profile.module.css";

const EventecoProfileClient = () => {
    const [selectedTab, setSelectedTab] = useState<"tickets" | "orders" | "settings" | "preferences">("settings");
    const orders = useOrdersByClient().data as { active_orders: Order[]; old_orders: Order[] } | null;
    const activeTickets = orders?.active_orders;
    const oldTickets = orders?.old_orders;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [selectedTab]);

    return (
        <EventecoLayout>
            <div className={styles.profileContainer}>
                <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                <div className={styles.profileContent}>
                    {selectedTab === "settings" && <ProfileSettings />}
                    {selectedTab === "tickets" && <ProfileTickets activeTickets={activeTickets || []} />}
                    {selectedTab === "orders" && <ProfileOrders oldTickets={oldTickets || []} />}
                    {selectedTab === "preferences" && <ProfilePreferences />}
                </div>
            </div>
        </EventecoLayout>
    );
};

export default EventecoProfileClient;
