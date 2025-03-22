"use client";

import React from "react";
import { logoutUser } from "@/store/pawnity/slices/authSlice";
import { useDispatch } from "react-redux";
import styles from "@/styles/pawnity/Organizer/DashboardOrganizer.module.css";

interface SidebarProps {
    selectedView: "metrics" | "pets" | "adoptions" | "suscriptions" | "settings" | "event";
    setSelectedView: (view: "metrics" | "pets" | "adoptions" | "suscriptions" | "settings" | "event") => void;
    setSelectedEvent: (eventslug: string) => void;
    selectedEvent: string;
    newEventName: string;
    events: any[] | undefined;
    creatingNewEvent: boolean;
    onCreateNewEvent: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
    selectedView,
    setSelectedView,
    setSelectedEvent,
    selectedEvent,
    newEventName,
    events,
    creatingNewEvent,
    onCreateNewEvent,
}) => {
    const dispatch = useDispatch();
    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>
                <img src="/assets/p_logo/LogoPawnity_White.png" alt="Pawnity Logo" />
            </div>
            <div className={styles.fixedTop}>
                <button className={selectedView === "metrics" ? styles.active : ""} onClick={() => setSelectedView("metrics")}>
                    📊 Métricas
                </button>
                <button className={selectedView === "pets" ? styles.active : ""} onClick={() => setSelectedView("pets")}>
                    🐶 Mascotas
                </button>
                <button className={selectedView === "adoptions" ? styles.active : ""} onClick={() => setSelectedView("adoptions")}>
                    🏠 Adopciones
                </button>
                <button className={selectedView === "suscriptions" ? styles.active : ""} onClick={() => setSelectedView("suscriptions")}>
                    🎟️ Suscripciones
                </button>
                <button className={selectedView === "settings" ? styles.active : ""} onClick={() => setSelectedView("settings")}>
                    ⚙️ Ajustes de Cuenta
                </button>
            </div>
            <div className={styles.eventList}>
                <h2>Mis Eventos</h2>
                {events?.length === 0 ? (
                    <div className={styles.spinner}>Cargando eventos...</div>
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
                                {selectedEvent === event.eventslug && newEventName.trim() !== "" ? newEventName : event.name}
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
                <button className={styles.createEvent} onClick={onCreateNewEvent}>
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
