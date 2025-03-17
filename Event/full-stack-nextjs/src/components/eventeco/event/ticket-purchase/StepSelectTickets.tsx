"use client";

import React, { useState } from "react";
import { Ticket } from "@/types/Ticket";
import { Button, InputNumber, Toast } from "@/utils/PrimeReactComponents";
import styles from "@/styles/eventeco/TicketPurchase.module.css";

const StepSelectTickets: React.FC<{ tickets: Ticket[]; setTicketData: (data: any) => void; onNext: () => void }> = ({
    tickets,
    setTicketData,
    onNext,
}) => {
    const toast = React.useRef<Toast>(null);

    const [selectedTickets, setSelectedTickets] = useState<{ [key: number]: number }>({});

    const handleQuantityChange = (idticketinfo: number, quantity: number) => {
        setSelectedTickets((prev) => ({
            ...prev,
            [idticketinfo]: quantity,
        }));
    };

    const getTotalPrice = () => {
        return (
            tickets?.reduce((total, ticket) => {
                return total + (selectedTickets[ticket.idticketinfo] || 0) * parseFloat(ticket.price);
            }, 0) || 0
        );
    };

    const handleNext = () => {
        const selected = Object.entries(selectedTickets)
            .filter(([_, quantity]) => quantity > 0)
            .map(([idticketinfo, quantity]) => ({
                idticketinfo: Number(idticketinfo),
                type: tickets.find((ticket) => ticket.idticketinfo === Number(idticketinfo))?.type,
                price: tickets.find((ticket) => ticket.idticketinfo === Number(idticketinfo))?.price,
                quantity,
                entries: Array.from({ length: quantity }, (_, index) => ({ complements: [], key: `${idticketinfo}-${index}` })),
            }));

        if (selected.length === 0) {
            toast.current?.show({
                severity: "warn",
                summary: "Atención",
                detail: "Debes seleccionar al menos una entrada antes de continuar.",
                life: 3000,
            });
            return;
        }

        setTicketData(selected);
        onNext();
    };

    console.log("selectedTickets", selectedTickets);

    return (
        <div className={styles.stepContainer}>
            <Toast ref={toast} />
            <h2>Selecciona tus Entradas</h2>

            <div className={styles.ticketList}>
                {tickets?.map((ticket: Ticket) => (
                    <div key={ticket.idticketinfo} className={styles.ticketItem}>
                        <div className={styles.ticketInfo}>
                            <h3>{ticket.type}</h3>
                            <p>{ticket.descripcion}</p>
                            <p>
                                <strong>Precio:</strong> {ticket.price} €
                            </p>
                        </div>
                        <div className={styles.ticketActions}>
                            <InputNumber
                                value={selectedTickets[ticket.idticketinfo] || 0}
                                onValueChange={(e) => handleQuantityChange(ticket.idticketinfo, e.value || 0)}
                                showButtons
                                min={0}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.totalPrice}>
                <h3>Total: {(getTotalPrice() + Object.values(selectedTickets).reduce((total, quantity) => total + quantity, 0) * 5).toFixed(2)} €</h3>
                <p>Gastos de gestión + {(Object.values(selectedTickets).reduce((total, quantity) => total + quantity, 0) * 5).toFixed(2)} €</p>
            </div>

            <div className={styles.navigationNext}>
                <Button label="Siguiente" icon="pi pi-chevron-right" className="p-button-primary" onClick={handleNext} />
            </div>
        </div>
    );
};

export default StepSelectTickets;
