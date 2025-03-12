"use client";

import React, { useState } from "react";
import { Button, Toast } from "@/utils/PrimeReactComponents";
import SubeventForm from "./SubeventForm";
import SubeventCard from "./SubeventCard";
import { useSubevents } from "@/hooks/pawnity/useSubevents";
import { Subevent } from "@/types/Subevent";
import { Event } from "@/types/Event";
import styles from "@/styles/pawnity/Organizer/DashboardSubevent.module.css";

const SubeventList: React.FC<{ event: Event }> = ({ event }) => {
    const { subevents, isLoading, isError, refetch } = useSubevents(event.eventslug);
    const toast = React.useRef<Toast>(null);
    const [creatingNew, setCreatingNew] = useState(false);

    return (
        <div className={styles.listContainer}>
            <Toast ref={toast} />
            <h2>Gestión de Subeventos</h2>

            <Button label="Nuevo Subevento" icon="pi pi-plus" className="p-button-info" onClick={() => setCreatingNew(true)} />

            {creatingNew && (
                <div className={styles.newSubeventForm}>
                    <SubeventForm subevent={null} idevent={event.idevent} onClose={() => setCreatingNew(false)} refetch={refetch} />
                </div>
            )}

            {isLoading ? (
                <p className={styles.loading}>Cargando subeventos...</p>
            ) : isError ? (
                <p className={styles.error}>Error al cargar los subeventos.</p>
            ) : (
                <div className={styles.subeventList}>
                    {subevents.length > 0 ? (
                        subevents.map((subevent: Subevent) => (
                            <SubeventCard key={subevent.idsubevents} subevent={subevent} idevent={event.idevent} toast={toast} refetch={refetch} />
                        ))
                    ) : (
                        <p className={styles.noEvents}>No hay subeventos registrados.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default SubeventList;
