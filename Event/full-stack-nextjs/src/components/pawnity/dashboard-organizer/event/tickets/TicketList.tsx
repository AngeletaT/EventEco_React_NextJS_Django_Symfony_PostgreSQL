"use client";

import React, { useState, useRef } from "react";
import { useTickets, useCreateTicket } from "@/hooks/pawnity/useTickets";
import { Ticket } from "@/types/Ticket";
import TicketCard from "./TicketCard";
import TicketForm from "./TicketForm";
import { Button, Toast } from "@/utils/PrimeReactComponents";
import styles from "@/styles/pawnity/Organizer/DashboardTicket.module.css";

const TicketList = ({ eventSlug }: { eventSlug: string }) => {
    const { data: tickets, isLoading, isError } = useTickets(eventSlug);
    const createTicket = useCreateTicket();
    const [creatingNewTicket, setCreatingNewTicket] = useState(false);
    const toast = useRef<Toast>(null);

    const handleCreateTicket = () => {
        setCreatingNewTicket(true);
    };

    const handleSubmitNewTicket = (ticketData: Partial<Ticket>) => {
        createTicket.mutate(
            { eventSlug, ticketData },
            {
                onSuccess: () => {
                    toast.current?.show({ severity: "success", summary: "Éxito", detail: "Ticket creado correctamente", life: 3000 });
                    setCreatingNewTicket(false);
                },
                onError: () => {
                    toast.current?.show({ severity: "error", summary: "Error", detail: "No se pudo crear el ticket", life: 3000 });
                },
            }
        );
    };

    return (
        <div className={styles.ticketContainer}>
            <Toast ref={toast} />
            <h2>Gestión de Tickets</h2>
            <Button label="Crear Nuevo Ticket" icon="pi pi-plus" className="p-button-info" onClick={handleCreateTicket} />

            {creatingNewTicket && (
                <div className={styles.newTicket}>
                    <TicketForm eventSlug={eventSlug} onSubmit={handleSubmitNewTicket} onCancel={() => setCreatingNewTicket(false)} />
                </div>
            )}

            {isLoading ? (
                <p className={styles.loading}>Cargando tickets...</p>
            ) : isError ? (
                <p className={styles.error}>Error al cargar tickets</p>
            ) : (
                <div className={styles.ticketList}>
                    {tickets?.map((ticket) => <TicketCard key={ticket.idTicketInfo} ticket={ticket} eventSlug={eventSlug} toast={toast} />)}
                </div>
            )}
        </div>
    );
};

export default TicketList;
