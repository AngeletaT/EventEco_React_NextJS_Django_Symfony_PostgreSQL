import React, { useState, useEffect } from "react";
import { useCreateEvent, useUpdateEvent, useToggleEvent } from "@/hooks/pawnity/useEvents";
import { Event } from "@/types/Event";
import { Button, InputText, FloatLabel, InputTextarea, Toast } from "@/utils/PrimeReactComponents";
import styles from "@/styles/pawnity/Organizer/DashboardEvent.module.css";

const EventForm = ({
    event,
    setNewEventName,
    onEventUpdated,
}: {
    event?: Event | null;
    setNewEventName?: (name: string) => void;
    onEventUpdated?: () => void;
}) => {
    const createEvent = useCreateEvent();
    const updateEvent = useUpdateEvent();
    const toggleEvent = useToggleEvent();

    const toast = React.useRef<any>(null);
    const [isLoadingSave, setIsLoadingSave] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isModified, setIsModified] = useState(false);
    const [isActive, setIsActive] = useState(event?.isactive || false);

    const initialEventData = {
        name: event?.name || "",
        startdate: event?.startdate || "",
        enddate: event?.enddate || "",
        location: event?.location || "",
        position: event?.position || "",
        description: event?.description || "",
        idcategory: event?.idcategory || 1,
        urlposter: event?.urlposter || "",
    };

    const [eventData, setEventData] = useState<Partial<Event>>(initialEventData);

    useEffect(() => {
        if (eventData.name && setNewEventName) {
            setNewEventName(eventData.name);
        }
    }, [eventData.name, setNewEventName]);

    useEffect(() => {
        const isDataModified = JSON.stringify(eventData) !== JSON.stringify(initialEventData);
        setIsModified(isDataModified);
    }, [eventData]);

    const handleSubmit = () => {
        if (event) {
            try {
                setIsLoadingSave(true);
                updateEvent.mutate(
                    { id: event.idevent, data: eventData },
                    {
                        onSuccess: () => {
                            toast.current?.show({ severity: "success", summary: "Éxito", detail: "Evento actualizado correctamente", life: 3000 });
                            if (onEventUpdated) onEventUpdated();
                            setIsLoadingSave(false);
                        },
                    }
                );
            } catch (error) {
                console.error("Error updating event:", error);
                toast.current?.show({ severity: "error", summary: "Error", detail: "Error al actualizar el evento", life: 3000 });
                setIsLoadingSave(false);
            }
        } else {
            try {
                setIsLoadingSave(true);
                createEvent.mutate(eventData, {
                    onSuccess: () => {
                        toast.current?.show({ severity: "success", summary: "Éxito", detail: "Evento creado correctamente", life: 3000 });
                        if (onEventUpdated) onEventUpdated();
                        setIsLoadingSave(false);
                    },
                });
            } catch (error) {
                console.error("Error creating event:", error);
                toast.current?.show({ severity: "error", summary: "Error", detail: "Error al crear el evento", life: 3000 });
                setIsLoadingSave(false);
            }
        }
    };

    const handleToggleEvent = () => {
        if (event) {
            try {
                setIsLoading(true);
                setIsActive(!isActive);
                toggleEvent.mutate(
                    { id: event.idevent },
                    {
                        onSuccess: () => {
                            toast.current?.show({
                                severity: "success",
                                summary: "Éxito",
                                detail: `Evento ${isActive ? "desactivado" : "activado"} correctamente`,
                                life: 3000,
                            });
                            if (onEventUpdated) onEventUpdated();
                            setIsLoading(false);
                        },
                        onError: () => {
                            setIsLoading(false);
                            setIsActive(isActive);
                            toast.current?.show({
                                severity: "error",
                                summary: "Error",
                                detail: `Error al ${isActive ? "desactivar" : "activar"} el evento`,
                                life: 3000,
                            });
                        },
                    }
                );
            } catch (error) {
                console.error("Error toggling event:", error);
                toast.current?.show({ severity: "error", summary: "Error", detail: "Error al cambiar el estado del evento", life: 3000 });
                setIsLoading(false);
            }
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
                <label htmlFor="startdate">Fecha de Inicio ( yyyy-mm-dd )</label>
            </FloatLabel>
            <FloatLabel className={styles.floatLabelContainer}>
                <InputText value={eventData.enddate} onChange={(e) => setEventData({ ...eventData, enddate: e.target.value })} />
                <label htmlFor="enddate">Fecha de Fin ( yyyy-mm-dd )</label>
            </FloatLabel>
            <FloatLabel className={styles.floatLabelContainer}>
                <InputText value={eventData.location} onChange={(e) => setEventData({ ...eventData, location: e.target.value })} />
                <label htmlFor="location">Ciudad</label>
            </FloatLabel>
            <FloatLabel className={styles.floatLabelContainer}>
                <InputText value={eventData.position} onChange={(e) => setEventData({ ...eventData, position: e.target.value })} />
                <label htmlFor="position">Coordenadas de la localización ( [00.00,00.00] )</label>
            </FloatLabel>
            <FloatLabel className={styles.floatLabelContainer}>
                <InputTextarea value={eventData.description} onChange={(e) => setEventData({ ...eventData, description: e.target.value })} />
                <label htmlFor="description">Descripción</label>
            </FloatLabel>
            <FloatLabel className={styles.floatLabelContainer}>
                <InputText value={eventData.urlposter} onChange={(e) => setEventData({ ...eventData, urlposter: e.target.value })} />
                <label htmlFor="urlposter">URL del Poster</label>
            </FloatLabel>

            <Button
                label={isLoadingSave ? "Cargando" : "Guardar"}
                className={`${styles.saveButton} "p-button-success"`}
                onClick={handleSubmit}
                disabled={isLoadingSave || !isModified}
            />
            {event && (
                <Button
                    label={isLoading ? "Cargando" : isActive ? "Desactivar" : "Activar"}
                    className={`${styles.toggleButton} ${isActive ? "p-button-danger" : "p-button-success"}`}
                    onClick={handleToggleEvent}
                    disabled={isLoading}
                />
            )}

            <Toast ref={toast} />
        </div>
    );
};

export default EventForm;
