"use client";

import React from "react";
import { logoutUser } from "@/store/eventeco/slices/authSlice";
import { Button } from "@/utils/PrimeReactComponents";
import { useDispatch } from "react-redux";
import styles from "@/styles/eventeco/DashboardOrganizer.module.css";

interface SidebarProps {
    selectedTab: "metrics" | "events" | "tickets" | "settings";
    setSelectedTab: (tab: "metrics" | "events" | "tickets" | "settings") => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedTab, setSelectedTab }) => {
    const dispatch = useDispatch();
    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>
                <img src="/assets/e_logo/LogoEventEco_White.png" alt="Eventeco Logo" />
            </div>
            <nav className={styles.nav}>
                <button className={selectedTab === "metrics" ? styles.active : ""} onClick={() => setSelectedTab("metrics")}>
                    📊 Métricas
                </button>
                <button className={selectedTab === "events" ? styles.active : ""} onClick={() => setSelectedTab("events")}>
                    📅 Eventos
                </button>
                <button className={selectedTab === "tickets" ? styles.active : ""} onClick={() => setSelectedTab("tickets")}>
                    🎟 Entradas
                </button>
                <button className={selectedTab === "settings" ? styles.active : ""} onClick={() => setSelectedTab("settings")}>
                    ⚙️ Ajustes
                </button>
            </nav>
            <Button label="Cerrar Sesión" className="p-button-secondary" onClick={() => dispatch(logoutUser() as any)} />
        </aside>
    );
};

export default Sidebar;
