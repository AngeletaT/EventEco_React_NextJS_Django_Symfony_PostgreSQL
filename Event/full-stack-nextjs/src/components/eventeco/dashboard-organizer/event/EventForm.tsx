import React, { useState, useEffect } from "react";
import { useCreateEvent, useUpdateEvent } from "@/hooks/eventeco/useEvents";
import { Event } from "@/types/Event";
import { Button, InputText, FloatLabel, InputTextarea } from "@/utils/PrimeReactComponents";
import styles from "@/styles/eventeco/Organizer/DashboardEvent.module.css";

const EventForm = ({ event, setNewEventName }: { event?: Event | null; setNewEventName?: (name: string) => void }) => {
    const createEvent = useCreateEvent();
    const updateEvent = useUpdateEvent();

    const [eventData, setEventData] = useState<Partial<Event>>({
        name: event?.name || "",
        startdate: event?.startdate || "",
        enddate: event?.enddate || "",
        location: event?.location || "",
        description: event?.description || "",
        idcategory: event?.idcategory || 1,
        urlposter: event?.urlposter || "",
    });

    useEffect(() => {
        if (eventData.name && setNewEventName) {
            setNewEventName(eventData.name);
        }
    }, [eventData.name, setNewEventName]);

    const handleSubmit = () => {
        if (event) {
            updateEvent.mutate({ id: event.idevent, data: eventData });
        } else {
            createEvent.mutate(eventData);
        }
    };

    return (
        <div className={styles.form}>
            <FloatLabel className={styles.floatLabelContainer}>
                <InputText value={eventData.name} onChange={(e) => setEventData({ ...eventData, name: e.target.value })} />
                <label htmlFor="name">Nombre del Evento</label>
            </FloatLabel>
            <FloatLabel className={styles.floatLabelContainer}>
                <InputText value={eventData.startdate} onChange={(e) => setEventData({ ...eventData, startdate: e.target.value })} />
                <label htmlFor="startdate">Fecha de Inicio (yyyy-mm-dd)</label>
            </FloatLabel>
            <FloatLabel className={styles.floatLabelContainer}>
                <InputText value={eventData.enddate} onChange={(e) => setEventData({ ...eventData, enddate: e.target.value })} />
                <label htmlFor="enddate">Fecha de Fin (yyyy-mm-dd)</label>
            </FloatLabel>
            <FloatLabel className={styles.floatLabelContainer}>
                <InputText value={eventData.location} onChange={(e) => setEventData({ ...eventData, location: e.target.value })} />
                <label htmlFor="location">Ciudad</label>
            </FloatLabel>
            <FloatLabel className={styles.floatLabelContainer}>
                <InputTextarea value={eventData.description} onChange={(e) => setEventData({ ...eventData, description: e.target.value })} />
                <label htmlFor="description">Descripción</label>
            </FloatLabel>
            <FloatLabel className={styles.floatLabelContainer}>
                <InputText value={eventData.urlposter} onChange={(e) => setEventData({ ...eventData, urlposter: e.target.value })} />
                <label htmlFor="urlposter">URL del Poster</label>
            </FloatLabel>

            <Button label="Guardar" className="p-button-primary" onClick={handleSubmit} />
        </div>
    );
};

export default EventForm;
