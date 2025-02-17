"use client";

import React, { useState } from "react";
import { useEventsByOrganizer } from "@/hooks/eventeco/useEvents";
import { Button, Dialog } from "@/utils/PrimeReactComponents";
import EventForm from "./EventForm";
import EventCard from "./EventCard";
import styles from "@/styles/eventeco/DashboardEvent.module.css";

const EventList: React.FC = () => {
    const { data: events, isLoading, isError } = useEventsByOrganizer();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleCreateEvent = () => {
        setSelectedEvent(null);
        setIsModalOpen(true);
    };

    const handleEditEvent = (event: any) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    return (
        <div className={styles.EventContainer}>
            <h2>Gestión de Eventos</h2>
            <Button label="Crear Evento" className="p-button-success" onClick={handleCreateEvent} />

            {isLoading ? (
                <p>Cargando eventos...</p>
            ) : isError ? (
                <p>Error al cargar eventos</p>
            ) : (
                <div className={styles.eventGrid}>
                    {events?.map((event) => <EventCard key={event.idevent} event={event} onEdit={() => handleEditEvent(event)} />)}
                </div>
            )}

            <Dialog className={styles.Modal} visible={isModalOpen} onHide={() => setIsModalOpen(false)} header="Gestión de Evento">
                <EventForm event={selectedEvent} closeModal={() => setIsModalOpen(false)} />
            </Dialog>
        </div>
    );
};

export default EventList;
