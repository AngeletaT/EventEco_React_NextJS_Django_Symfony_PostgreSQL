"use client";

import React, { useState, useRef } from "react";
import { useComplements, useCreateComplement } from "@/hooks/pawnity/useComplements";
import { Complement } from "@/types/Complement";
import ComplementCard from "./ComplementCard";
import ComplementForm from "./ComplementForm";
import { Button, Toast } from "@/utils/PrimeReactComponents";
import styles from "@/styles/pawnity/Organizer/DashboardComplement.module.css";

const ComplementList = ({ eventSlug }: { eventSlug: string }) => {
    const { data: complements, isLoading, isError } = useComplements(eventSlug);
    const createComplement = useCreateComplement();
    const [creatingNewComplement, setCreatingNewComplement] = useState(false);
    const toast = useRef<Toast>(null);

    const handleCreateComplement = () => {
        setCreatingNewComplement(true);
    };

    const handleSubmitNewComplement = (complementData: Partial<Complement>) => {
        createComplement.mutate(
            { eventSlug, complementData },
            {
                onSuccess: () => {
                    toast.current?.show({ severity: "success", summary: "Éxito", detail: "Complemento creado correctamente", life: 3000 });
                    setCreatingNewComplement(false);
                },
                onError: () => {
                    toast.current?.show({ severity: "error", summary: "Error", detail: "No se pudo crear el complemento", life: 3000 });
                },
            }
        );
    };

    return (
        <div className={styles.complementContainer}>
            <Toast ref={toast} />
            <h2>Gestión de Complementos</h2>
            <Button label="Crear Nuevo Complemento" icon="pi pi-plus" className="p-button-info" onClick={handleCreateComplement} />

            {creatingNewComplement && (
                <div className={styles.newComplement}>
                    <ComplementForm eventSlug={eventSlug} onSubmit={handleSubmitNewComplement} onCancel={() => setCreatingNewComplement(false)} />
                </div>
            )}

            {isLoading ? (
                <p className={styles.loading}>Cargando complementos...</p>
            ) : isError ? (
                <p className={styles.error}>Error al cargar complementos</p>
            ) : (
                <div className={styles.complementList}>
                    {complements?.map((complement) => (
                        <ComplementCard key={complement.idComplement} complement={complement} eventSlug={eventSlug} toast={toast} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ComplementList;
