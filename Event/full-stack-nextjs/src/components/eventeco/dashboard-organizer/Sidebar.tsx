"use client";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/eventeco/slices/authSlice";
import styles from "@/styles/eventeco/Organizer/DashboardOrganizer.module.css";
import { useEventsByOrganizer } from "@/hooks/eventeco/useEvents";

interface SidebarProps {
    selectedView: "metrics" | "settings" | "event";
    setSelectedView: (view: "metrics" | "settings" | "event") => void;
    setSelectedEvent: (eventslug: string) => void;
    selectedEvent: string;
    newEventName: string;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedView, setSelectedView, setSelectedEvent, selectedEvent, newEventName }) => {
    const dispatch = useDispatch();
    const { data: events, isLoading, isError } = useEventsByOrganizer();
    const [creatingNewEvent, setCreatingNewEvent] = useState(false);

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>
                <img src="/assets/e_logo/LogoEventEco_White.png" alt="Eventeco Logo" />
            </div>
            <div className={styles.fixedTop}>
                <button className={selectedView === "metrics" ? styles.active : ""} onClick={() => setSelectedView("metrics")}>
                    📊 Métricas
                </button>
                <button className={selectedView === "settings" ? styles.active : ""} onClick={() => setSelectedView("settings")}>
                    ⚙️ Ajustes de Cuenta
                </button>
            </div>
            <div className={styles.eventList}>
                <h2>Mis Eventos</h2>
                {isLoading ? (
                    <div className={styles.spinner}>Cargando eventos...</div>
                ) : isError ? (
                    <div className={styles.error}>Error al cargar eventos</div>
                ) : (
                    <>
                        {events?.map((event: any) => (
                            <button
                                key={event.eventslug}
                                className={`${styles.eventItem} ${selectedEvent === event.eventslug ? styles.active : ""}`}
                                onClick={() => {
                                    setSelectedView("event");
                                    setSelectedEvent(event.eventslug);
                                }}
                            >
                                {event.name}
                            </button>
                        ))}
                        {creatingNewEvent && (
                            <button
                                className={`${styles.eventItem} ${styles.newEvent} ${selectedEvent === "null" ? styles.active : ""}`}
                                onClick={() => {
                                    setSelectedView("event");
                                    setSelectedEvent("null");
                                }}
                            >
                                {newEventName.trim() !== "" ? `${newEventName}` : "✨ Nuevo Evento"}
                            </button>
                        )}
                    </>
                )}
            </div>
            <nav className={styles.fixedBottom}>
                <button className={styles.createEvent} onClick={() => setCreatingNewEvent(true)}>
                    <i className="pi pi-plus"></i>&nbsp;&nbsp; Crear Nuevo Evento
                </button>
                <button className={styles.logout} onClick={() => dispatch(logoutUser() as any)}>
                    <i className="pi pi-sign-out"></i>&nbsp;&nbsp; Cerrar Sesión
                </button>
            </nav>
        </aside>
    );
};

export default Sidebar;
