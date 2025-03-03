"use client";

import React, { useState } from "react";
import { useUpdateTicket, useToggleTicket } from "@/hooks/eventeco/useTickets";
import { Ticket } from "@/types/Ticket";
import { Button, InputText, InputNumber, InputTextarea, Toast } from "@/utils/PrimeReactComponents";
import styles from "@/styles/eventeco/Organizer/DashboardTicket.module.css";

const TicketCard = ({ ticket, eventSlug, toast }: { ticket: Ticket; eventSlug: string; toast: React.RefObject<Toast> }) => {
    const updateTicket = useUpdateTicket();
    const toggleTicket = useToggleTicket();
    const [isEditing, setIsEditing] = useState(false);
    const [ticketData, setTicketData] = useState<Partial<Ticket>>(ticket);

    const handleChange = (field: keyof Ticket, value: any) => {
        setTicketData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleUpdate = () => {
        updateTicket.mutate(
            { idTicketInfo: ticket.idTicketInfo, ticketData },
            {
                onSuccess: () => {
                    toast.current?.show({ severity: "success", summary: "Éxito", detail: "Ticket actualizado correctamente", life: 3000 });
                    setIsEditing(false);
                },
                onError: () => {
                    toast.current?.show({ severity: "error", summary: "Error", detail: "No se pudo actualizar el ticket", life: 3000 });
                },
            }
        );
    };

    const handleToggle = () => {
        toggleTicket.mutate(
            { idTicketInfo: ticket.idTicketInfo, ticketData },
            {
                onSuccess: () => {
                    toast.current?.show({ severity: "success", summary: "Éxito", detail: "Ticket actualizado correctamente", life: 3000 });
                },
                onError: () => {
                    toast.current?.show({ severity: "error", summary: "Error", detail: "No se pudo actualizar el ticket", life: 3000 });
                },
            }
        );
    };

    return (
        <div className={`${styles.ticketCard} ${ticket.remaining === 0 ? styles.soldOut : ""}`}>
            <Toast ref={toast} />
            <div className={styles.ticketHeader}>
                {isEditing ? <InputText value={ticketData.type} onChange={(e) => handleChange("type", e.target.value)} /> : <h3>{ticket.type}</h3>}
                {isEditing ? (
                    <InputTextarea value={ticketData.descripcion} onChange={(e) => handleChange("descripcion", e.target.value)} rows={2} />
                ) : (
                    <p>{ticket.descripcion}</p>
                )}
            </div>

            <div className={styles.ticketContent}>
                <div className={styles.ticketLeft}>
                    <p>
                        <strong>Capacidad: </strong>
                        {isEditing ? (
                            <InputNumber value={ticketData.capacity} onValueChange={(e) => handleChange("capacity", e.value)} />
                        ) : (
                            ticket.capacity
                        )}
                    </p>
                    <p>
                        <strong>Disponibles: </strong>
                        {isEditing ? (
                            <InputNumber value={ticketData.remaining} onValueChange={(e) => handleChange("remaining", e.value)} />
                        ) : (
                            ticket.remaining
                        )}
                    </p>
                </div>

                <div className={styles.ticketCenter}>
                    <p>
                        <strong>Precio: </strong>
                        {isEditing ? (
                            <InputText value={ticketData.price} onChange={(e) => handleChange("price", e.target.value)} />
                        ) : (
                            `${ticket.price} €`
                        )}
                    </p>
                </div>

                <div className={styles.ticketRight}>
                    {isEditing ? (
                        <>
                            <Button icon="pi pi-check" label="" className="p-button-success" onClick={handleUpdate} />
                            <Button icon="pi pi-times" label="" className="p-button-secondary" onClick={() => setIsEditing(false)} />
                        </>
                    ) : (
                        <>
                            <Button icon="pi pi-pencil" className="p-button-warning" onClick={() => setIsEditing(true)} />
                            <Button
                                icon={ticket.isActive ? "pi pi-times" : "pi pi-check"}
                                className={ticket.isActive ? "p-button-danger" : "p-button-success"}
                                onClick={handleToggle}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TicketCard;
