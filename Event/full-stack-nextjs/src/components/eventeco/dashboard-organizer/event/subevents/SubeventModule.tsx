"use client";

import React, { useState } from "react";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { Event } from "@/types/Event";
import SubeventCalendar from "./SubeventCalendar";
import styles from "@/styles/eventeco/Organizer/DashboardSubevent.module.css";

const SubeventModule: React.FC<{ event: Event }> = ({ event }) => {
    const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Gestión de Subeventos</h2>
                <div className="card flex flex-wrap justify-content-end gap-2" style={{ marginBottom: "20px" }}>
                    {viewMode === "calendar" && (
                        <div>
                            <Button
                                type="button"
                                label=""
                                icon="pi pi-question-circle"
                                className="p-button-rounded p-button-success"
                                disabled
                                tooltip={`INSTRUCCIONES DE USO DEL CALENDARIO:
                                    \n - Haz clic en un espacio vacío para crear un nuevo subevento en la franja horaria seleccionada.
                                    \n - Arrastra y suelta un subevento para cambiar su horario o día.
                                    \n - Redimensiona un subevento para ajustar su duración.
                                    \n - Haz clic en un subevento existente para editar su información.`}
                                tooltipOptions={{ position: "bottom", mouseTrack: true, mouseTrackTop: 15, showOnDisabled: true }}
                            />
                        </div>
                    )}
                    <Button
                        label=""
                        icon="pi pi-calendar"
                        className={viewMode === "calendar" ? "p-button-success" : "p-button-outlined p-button-success"}
                        onClick={() => setViewMode("calendar")}
                    />
                    <Button
                        label=""
                        icon="pi pi-list"
                        className={viewMode === "list" ? "p-button-success" : "p-button-outlined p-button-success"}
                        onClick={() => setViewMode("list")}
                    />
                </div>
            </div>

            <div className={styles.content}>
                {viewMode === "calendar" ? <SubeventCalendar key={event.eventslug} event={event} /> : <h1>Lista</h1>}
            </div>
        </div>
    );
};

export default SubeventModule;
