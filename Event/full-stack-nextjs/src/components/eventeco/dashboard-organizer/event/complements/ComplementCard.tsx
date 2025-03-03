"use client";

import React, { useState } from "react";
import { useUpdateComplement, useToggleComplement } from "@/hooks/eventeco/useComplements";
import { Complement } from "@/types/Complement";
import { Button, InputText, InputNumber, InputTextarea, Toast } from "@/utils/PrimeReactComponents";
import styles from "@/styles/eventeco/Organizer/DashboardComplement.module.css";

const ComplementCard = ({ complement, eventSlug, toast }: { complement: Complement; eventSlug: string; toast: React.RefObject<Toast> }) => {
    const updateComplement = useUpdateComplement();
    const toggleComplement = useToggleComplement();
    const [isEditing, setIsEditing] = useState(false);
    const [complementData, setComplementData] = useState<Partial<Complement>>(complement);

    const handleChange = (field: keyof Complement, value: any) => {
        setComplementData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleUpdate = () => {
        updateComplement.mutate(
            { idComplement: complement.idComplement, complementData },
            {
                onSuccess: () => {
                    toast.current?.show({ severity: "success", summary: "Éxito", detail: "Complemento actualizado correctamente", life: 3000 });
                    setIsEditing(false);
                },
                onError: () => {
                    toast.current?.show({ severity: "error", summary: "Error", detail: "No se pudo actualizar el complemento", life: 3000 });
                },
            }
        );
    };

    const handleToggle = () => {
        toggleComplement.mutate(
            { idComplement: complement.idComplement, complementData },
            {
                onSuccess: () => {
                    toast.current?.show({ severity: "success", summary: "Éxito", detail: "Ticket actualizado correctamente", life: 3000 });
                },
                onError: () => {
                    toast.current?.show({ severity: "error", summary: "Error", detail: "No se pudo actualizar el complemento", life: 3000 });
                },
            }
        );
    };

    return (
        <div className={`${styles.complementCard} ${complement.price === 0 ? styles.free : ""}`}>
            <Toast ref={toast} />
            <div className={styles.complementHeader}>
                {isEditing ? (
                    <InputText value={complementData.name} onChange={(e) => handleChange("name", e.target.value)} />
                ) : (
                    <h3>{complement.name}</h3>
                )}
                {isEditing ? (
                    <InputTextarea value={complementData.description} onChange={(e) => handleChange("description", e.target.value)} rows={2} />
                ) : (
                    <p>{complement.description}</p>
                )}
            </div>

            <div className={styles.complementContent}>
                <div className={styles.complementLeft}>
                    <p>
                        <strong>Precio: </strong>
                        {isEditing ? (
                            <InputNumber value={complementData.price} onValueChange={(e) => handleChange("price", e.value)} />
                        ) : (
                            `${complement.price} €`
                        )}
                    </p>
                </div>

                <div className={styles.complementRight}>
                    {isEditing ? (
                        <>
                            <Button icon="pi pi-check" label="" className="p-button-success" onClick={handleUpdate} />
                            <Button icon="pi pi-times" label="" className="p-button-secondary" onClick={() => setIsEditing(false)} />
                        </>
                    ) : (
                        <>
                            <Button icon="pi pi-pencil" className="p-button-warning" onClick={() => setIsEditing(true)} />
                            <Button
                                icon={complement.isActive ? "pi pi-times" : "pi pi-check"}
                                className={complement.isActive ? "p-button-danger" : "p-button-success"}
                                onClick={handleToggle}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ComplementCard;
