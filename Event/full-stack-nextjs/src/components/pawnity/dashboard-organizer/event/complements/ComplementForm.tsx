"use client";

import React, { useState } from "react";
import { Complement } from "@/types/Complement";
import { Button, InputText, InputNumber, InputTextarea } from "@/utils/PrimeReactComponents";
import styles from "@/styles/pawnity/Organizer/DashboardComplement.module.css";

const ComplementForm = ({
    eventSlug,
    onSubmit,
    onCancel,
    initialData,
}: {
    eventSlug: string;
    onSubmit: (complementData: Partial<Complement>) => void;
    onCancel: () => void;
    initialData?: Partial<Complement>;
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [complementData, setComplementData] = useState<Partial<Complement>>(
        initialData || {
            name: "",
            description: "",
            price: undefined,
        }
    );

    const handleChange = (field: keyof Complement, value: any) => {
        setComplementData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleSubmit = () => {
        setIsLoading(true);
        onSubmit(complementData);
        setIsLoading(false);
    };

    return (
        <div className={styles.complementForm}>
            <InputText value={complementData.name} onChange={(e) => handleChange("name", e.target.value)} placeholder="Nombre del Complemento" />

            <InputTextarea
                value={complementData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={3}
                placeholder="Descripción"
            />

            <InputNumber value={complementData.price} onValueChange={(e) => handleChange("price", e.value)} placeholder="Precio" />

            <div className={styles.actions}>
                <Button label="Guardar" className="p-button-primary" onClick={handleSubmit} icon="pi pi-check" />
                <Button label="Cancelar" className="p-button-secondary" onClick={onCancel} icon="pi pi-times" />
            </div>
        </div>
    );
};

export default ComplementForm;
