"use client";

import React, { useState } from "react";
import { Ticket } from "@/types/Ticket";
import { Button, InputText, InputNumber, InputTextarea } from "@/utils/PrimeReactComponents";
import styles from "@/styles/eventeco/Organizer/DashboardTicket.module.css";

const TicketForm = ({
    eventSlug,
    onSubmit,
    onCancel,
    initialData,
}: {
    eventSlug: string;
    onSubmit: (ticketData: Partial<Ticket>) => void;
    onCancel: () => void;
    initialData?: Partial<Ticket>;
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [ticketData, setTicketData] = useState<Partial<Ticket>>(
        initialData || {
            type: "",
            price: "",
            capacity: undefined,
            remaining: undefined,
            descripcion: "",
        }
    );

    const handleChange = (field: keyof Ticket, value: any) => {
        setTicketData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleSubmit = () => {
        setIsLoading(true);
        onSubmit(ticketData);
        setIsLoading(false);
    };

    return (
        <div className={styles.ticketForm}>
            <InputText value={ticketData.type} onChange={(e) => handleChange("type", e.target.value)} placeholder="Tipo de Ticket" />

            <InputText value={ticketData.price} onChange={(e) => handleChange("price", e.target.value)} placeholder="Precio" />

            <InputNumber value={ticketData.capacity} onValueChange={(e) => handleChange("capacity", e.value)} placeholder="Capacidad" />

            <InputNumber value={ticketData.remaining} onValueChange={(e) => handleChange("remaining", e.value)} placeholder="Disponibles" />

            <InputTextarea
                value={ticketData.descripcion}
                onChange={(e) => handleChange("descripcion", e.target.value)}
                rows={3}
                placeholder="Descripción"
            />

            <div className={styles.actions}>
                <Button label="Guardar" className="p-button-primary" onClick={handleSubmit} icon="pi pi-check" />
                <Button label="Cancelar" className="p-button-secondary" onClick={onCancel} icon="pi pi-times" />
            </div>
        </div>
    );
};

export default TicketForm;
