"use client";

import React, { useState } from "react";
import { Subevent } from "@/types/Subevent";
import { useToggleSubevent } from "@/hooks/eventeco/useSubevents";
import SubeventForm from "./SubeventForm";
import { Button, Toast } from "@/utils/PrimeReactComponents";
import styles from "@/styles/eventeco/Organizer/DashboardSubevent.module.css";

const SubeventCard: React.FC<{ subevent: Subevent; idevent: number; toast: React.RefObject<Toast>; refetch: () => void }> = ({
    subevent,
    idevent,
    toast,
    refetch,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const toggleSubevent = useToggleSubevent();

    const handleDelete = () => {
        toggleSubevent.mutate(
            { idsubevents: subevent.idsubevents },
            {
                onSuccess: () => {
                    toast.current?.show({
                        severity: "success",
                        summary: "Éxito",
                        detail: `Actividad ${subevent.isactive ? "desactivada" : "activada"} correctamente`,
                        life: 3000,
                    });
                    refetch();
                    setIsEditing(false);
                },
                onError: () => {
                    toast.current?.show({ severity: "error", summary: "Error", detail: "No se pudo desactivar la actividad", life: 3000 });
                },
            }
        );
    };

    return (
        <div className={`${styles.subeventCard} ${subevent.isactive ? styles.active : styles.inactive}`}>
            <Toast ref={toast} />

            {isEditing ? (
                <SubeventForm subevent={subevent} idevent={idevent} onClose={() => setIsEditing(false)} refetch={refetch} />
            ) : (
                <div className={styles.subeventContent}>
                    <div className={styles.subeventInfo}>
                        <h3>{subevent.name}</h3>
                        <p>
                            <strong>Fecha y hora: </strong>
                            {new Date(subevent.startdate).toLocaleDateString() === new Date(subevent.enddate).toLocaleDateString() ? (
                                <>
                                    {new Date(subevent.startdate).toLocaleDateString()},
                                    {new Date(subevent.startdate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -
                                    {new Date(subevent.enddate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                </>
                            ) : (
                                <>
                                    {new Date(subevent.startdate).toLocaleString([], { hour: "2-digit", minute: "2-digit" })} -
                                    {new Date(subevent.enddate).toLocaleString([], { hour: "2-digit", minute: "2-digit" })}
                                </>
                            )}
                        </p>
                        <p>
                            <strong>Descripción:</strong> {subevent.description}
                        </p>
                    </div>
                    <div className={styles.subeventActions}>
                        <Button icon="pi pi-pencil" className="p-button-warning" onClick={() => setIsEditing(true)} />
                        <Button icon="pi pi-trash" className="p-button-danger" onClick={handleDelete} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default SubeventCard;
