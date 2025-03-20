"use client";

import React, { useState } from "react";
import { Complement } from "@/types/Complement";
import { Button, Checkbox, Toast } from "@/utils/PrimeReactComponents";
import styles from "@/styles/pawnity/TicketPurchase.module.css";

const StepSelectComplements: React.FC<{
    orderData: any;
    complements: Complement[] | [];
    onNext: () => void;
    onPrev: () => void;
    setOrderData: (data: any) => void;
}> = ({ orderData, complements, onNext, onPrev, setOrderData }) => {
    const toast = React.useRef<Toast>(null);

    const [selectedComplements, setSelectedComplements] = useState<{ [key: number]: number[] }>(
        Object.fromEntries(orderData.tickets.map((ticket: any) => [ticket.idticketinfo, []]))
    );

    const handleComplementChange = (ticketId: number, complementId: number) => {
        setSelectedComplements((prev) => {
            const current = prev[ticketId] || [];
            return {
                ...prev,
                [ticketId]: current.includes(complementId) ? current.filter((id) => id !== complementId) : [...current, complementId],
            };
        });
    };

    const calculateSubtotalComplements = (complementIds: number[]) => {
        return complementIds
            .reduce((sum, id) => {
                const complement = complements.find((c) => c.idcomplement === id);
                return sum + (complement ? parseFloat(complement.price.toString()) : 0);
            }, 0)
            .toFixed(2);
    };

    function getTotalPrice() {
        return orderData.tickets.reduce((total: number, ticket: any) => {
            const ticketPrice = ticket.quantity * parseFloat(ticket.price);

            const managementFees = ticket.quantity * 5;

            const complementsPrice = (selectedComplements[ticket.idticketinfo] || []).reduce((sum: number, complementId: number) => {
                const complement = complements.find((c) => c.idcomplement === complementId);
                return sum + (complement ? parseFloat(complement.price.toString()) : 0);
            }, 0);

            return total + ticketPrice + managementFees + complementsPrice;
        }, 0);
    }

    const handleNext = () => {
        const updatedOrderData = {
            ...orderData,
            tickets: orderData.tickets.map((ticket: any) => ({
                ...ticket,
                entries: ticket.entries.map(() => {
                    const selected = selectedComplements[ticket.idticketinfo] || [];
                    return {
                        complements: selected,
                        subtotalComplements: calculateSubtotalComplements(selected),
                        info: selected.map((complementId) => {
                            const complement = complements.find((c) => c.idcomplement === complementId);
                            return {
                                type: complement?.name || "",
                                price: complement?.price || 0,
                            };
                        }),
                    };
                }),
            })),
        };

        setOrderData(updatedOrderData);

        onNext();
    };

    return (
        <div className={styles.stepContainer}>
            <Toast ref={toast} />
            <h2>Selecciona Complementos para tus Entradas</h2>

            <div className={styles.complementList}>
                {orderData.tickets.map((ticket: any) => (
                    <div key={ticket.idticketinfo} className={styles.ticketComplementSection}>
                        <h3>{`Entrada ${orderData.tickets.indexOf(ticket) + 1} - (${ticket.type})`}</h3>
                        {complements?.map((complement: Complement) => (
                            <div key={complement.idcomplement} className={styles.complementItem}>
                                <Checkbox
                                    inputId={`comp-${ticket.idticketinfo}-${complement.idcomplement}`}
                                    checked={selectedComplements[ticket.idticketinfo]?.includes(complement.idcomplement)}
                                    onChange={() => handleComplementChange(ticket.idticketinfo, complement.idcomplement)}
                                />
                                <label htmlFor={`comp-${ticket.idticketinfo}-${complement.idcomplement}`}>
                                    {complement.name} - {complement.price}€ {complement.description && ` (${complement.description})`}
                                </label>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div className={styles.totalPrice}>
                <h5>Complementos: {calculateSubtotalComplements(Object.values(selectedComplements).flat())}€</h5>
                <h3>Total: {getTotalPrice().toFixed(2)}€</h3>
            </div>

            <div className={styles.navigationButtons}>
                <Button label="Atrás" icon="pi pi-chevron-left" className="p-button-secondary" onClick={onPrev} />
                <Button label="Siguiente" icon="pi pi-chevron-right" className="p-button-primary" onClick={handleNext} />
            </div>
        </div>
    );
};

export default StepSelectComplements;
