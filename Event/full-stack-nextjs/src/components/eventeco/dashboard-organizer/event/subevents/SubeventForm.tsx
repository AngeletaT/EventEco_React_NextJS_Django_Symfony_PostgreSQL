"use client";

import React, { useState } from "react";
import { Subevent } from "@/types/Subevent";
import { useUpdateSubevent, useCreateSubevent } from "@/hooks/eventeco/useSubevents";
import { InputText, Calendar, InputTextarea, Button, Toast } from "@/utils/PrimeReactComponents";
import styles from "@/styles/eventeco/Organizer/DashboardSubevent.module.css";

const SubeventForm: React.FC<{ subevent: Subevent | null; idevent: number; onClose: () => void; refetch: () => void }> = ({
    subevent,
    idevent,
    onClose,
    refetch,
}) => {
    const updateSubevent = useUpdateSubevent();
    const createSubevent = useCreateSubevent();
    const toast = React.useRef<Toast>(null);

    const [subeventData, setSubeventData] = useState<Partial<Subevent>>({
        name: subevent?.name || "",
        startdate: subevent?.startdate || "",
        enddate: subevent?.enddate || "",
        description: subevent?.description || "",
    });

    const handleChange = (field: keyof Subevent, value: any) => {
        setSubeventData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = () => {
        if (!subeventData.name || !subeventData.startdate || !subeventData.enddate) {
            toast.current?.show({
                severity: "warn",
                summary: "Atención",
                detail: "Todos los campos son obligatorios",
                life: 3000,
            });
            return;
        }

        if (subevent) {
            const idsubevents = subevent.idsubevents;
            updateSubevent.mutate(
                {
                    idsubevents,
                    subeventData: {
                        name: subeventData.name,
                        startDate: subeventData.startdate,
                        endDate: subeventData.enddate,
                        description: subeventData.description,
                        status: "Confirmed",
                    },
                },
                {
                    onSuccess: () => {
                        toast.current?.show({ severity: "success", summary: "Éxito", detail: "Actividad actualizada correctamente", life: 3000 });
                        refetch();
                        onClose();
                    },
                    onError: () => {
                        toast.current?.show({ severity: "error", summary: "Error", detail: "No se pudo actualizar la actividad", life: 3000 });
                    },
                }
            );
        } else {
            createSubevent.mutate(
                {
                    idevent,
                    subeventData: {
                        name: subeventData.name,
                        startDate: subeventData.startdate,
                        endDate: subeventData.enddate,
                        description: subeventData.description,
                        status: "Confirmed",
                    },
                },
                {
                    onSuccess: () => {
                        toast.current?.show({ severity: "success", summary: "Éxito", detail: "Actividad creada correctamente", life: 3000 });
                        refetch();
                        onClose();
                    },
                    onError: () => {
                        toast.current?.show({ severity: "error", summary: "Error", detail: "No se pudo crear la actividad", life: 3000 });
                    },
                }
            );
        }
    };

    return (
        <div className={styles.subeventForm}>
            <Toast ref={toast} />
            <label>Nombre de la Actividad</label>
            <InputText value={subeventData.name} onChange={(e) => handleChange("name", e.target.value)} />

            <label>Fecha y Hora de Inicio</label>
            <Calendar
                value={subeventData.startdate ? new Date(subeventData.startdate) : null}
                onChange={(e) => handleChange("startdate", e.value?.toISOString() || "")}
                showTime
                hourFormat="24"
            />

            <label>Fecha y Hora de Fin</label>
            <Calendar
                value={subeventData.enddate ? new Date(subeventData.enddate) : null}
                onChange={(e) => handleChange("enddate", e.value?.toISOString() || "")}
                showTime
                hourFormat="24"
            />

            <label>Descripción</label>
            <InputTextarea value={subeventData.description} onChange={(e) => handleChange("description", e.target.value)} rows={3} />

            <div className={styles.actions}>
                <Button label="Guardar" icon="pi pi-check" className="p-button-primary" onClick={handleSubmit} />
                <Button label="Cancelar" icon="pi pi-times" className="p-button-secondary" onClick={onClose} />
            </div>
        </div>
    );
};

export default SubeventForm;
