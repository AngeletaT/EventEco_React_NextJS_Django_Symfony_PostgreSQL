"use client";

import React, { useState } from "react";
import PawnityLayout from "@/layouts/pawnity/PawnityLayout";
import Sidebar from "./Sidebar";
import ProfileTickets from "./ProfileTickets";
import ProfileOrders from "./ProfileOrders";
import ProfileSettings from "./ProfileSettings";
import ProfilePreferences from "./ProfilePreferences";
import styles from "@/styles/pawnity/Profile.module.css";

const PawnityProfileClient: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState<"tickets" | "orders" | "settings" | "preferences">("settings");

    return (
        <PawnityLayout>
            <div className={styles.profileContainer}>
                <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                <div className={styles.profileContent}>
                    {selectedTab === "settings" && <ProfileSettings />}
                    {selectedTab === "tickets" && <ProfileTickets />}
                    {selectedTab === "orders" && <ProfileOrders />}
                    {selectedTab === "preferences" && <ProfilePreferences />}
                </div>
            </div>
        </PawnityLayout>
    );
};

export default PawnityProfileClient;
