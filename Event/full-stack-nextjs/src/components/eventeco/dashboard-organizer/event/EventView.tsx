"use client";

import React, { useState, useEffect } from "react";
import { useEventDetails } from "@/hooks/eventeco/useEvents";
import EventForm from "./EventForm";
import styles from "@/styles/eventeco/Organizer/DashboardEvent.module.css";

const EventView = ({ eventslug }: { eventslug: string }) => {
    console.log("EventView eventslug: ", eventslug);
    const { data: event, isLoading, isError } = eventslug ? useEventDetails(eventslug) : { data: null, isLoading: false, isError: false };
    const [activeTab, setActiveTab] = useState<"details" | "subevents" | "tickets" | "complements">("details");

    return (
        <div className={styles.container}>
            <h2>{event ? `Gestión del Evento ${event.name}` : "Crear Nuevo Evento"}</h2>
            <nav className={styles.tabs}>
                <button className={activeTab === "details" ? styles.active : ""} onClick={() => setActiveTab("details")}>
                    Detalles
                </button>
                <button className={activeTab === "subevents" ? styles.active : ""} onClick={() => setActiveTab("subevents")}>
                    Subeventos
                </button>
                <button className={activeTab === "tickets" ? styles.active : ""} onClick={() => setActiveTab("tickets")}>
                    Tickets
                </button>
                <button className={activeTab === "complements" ? styles.active : ""} onClick={() => setActiveTab("complements")}>
                    Complementos
                </button>
            </nav>
            <div className={styles.content}>
                {activeTab === "details" && <EventForm key={eventslug || "null"} event={event} />}
                {activeTab === "subevents" && <p>Aquí se gestionarán los subeventos.</p>}
                {activeTab === "tickets" && <p>Aquí se gestionarán los tickets.</p>}
                {activeTab === "complements" && <p>Aquí se gestionarán los complementos.</p>}
            </div>
        </div>
    );
};

export default EventView;
