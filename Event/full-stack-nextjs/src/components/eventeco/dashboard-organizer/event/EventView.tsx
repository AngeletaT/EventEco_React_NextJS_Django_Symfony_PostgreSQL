"use client";

import React, { useState, useEffect } from "react";
import { useEventDetails } from "@/hooks/eventeco/useEvents";
import { useTickets } from "@/hooks/eventeco/useTickets";
import EventForm from "./EventForm";
import styles from "@/styles/eventeco/Organizer/DashboardEvent.module.css";
import TicketList from "./tickets/TicketList";

const EventView = ({
    eventslug,
    newEventName,
    setNewEventName,
    onEventUpdated,
}: {
    eventslug: string;
    newEventName: string;
    setNewEventName: (name: string) => void;
    onEventUpdated: () => void;
}) => {
    const { data: event, isLoading, isError } = eventslug ? useEventDetails(eventslug) : { data: null, isLoading: false, isError: false };
    const { data: tickets } = eventslug ? useTickets(eventslug) : { data: null };
    const [activeTab, setActiveTab] = useState<"details" | "settings" | "subevents" | "tickets" | "complements">("details");

    return (
        <div className={styles.container}>
            <h2>{`Gestión del Evento ${newEventName}` || (event ? `Gestión del Evento ${event.name}` : "Crear Nuevo Evento")}</h2>
            <nav className={styles.tabs}>
                <button className={activeTab === "details" ? styles.active : ""} onClick={() => setActiveTab("details")}>
                    Detalles
                </button>
                <button className={activeTab === "settings" ? styles.active : ""} onClick={() => setActiveTab("settings")}>
                    Configuración
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
                {activeTab === "details" && <p>Aquí se gestionarán los detalles del evento.</p>}
                {activeTab === "settings" && (
                    <EventForm key={eventslug || "null"} event={event} setNewEventName={setNewEventName} onEventUpdated={onEventUpdated} />
                )}
                {activeTab === "subevents" && <p>Aquí se gestionarán los subeventos.</p>}
                {activeTab === "tickets" && event?.eventslug && <TicketList key={eventslug || "null"} eventSlug={event.eventslug} />}
                {activeTab === "complements" && <p>Aquí se gestionarán los complementos.</p>}
            </div>
        </div>
    );
};

export default EventView;
