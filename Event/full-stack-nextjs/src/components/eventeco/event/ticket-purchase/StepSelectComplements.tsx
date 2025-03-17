"use client";

import React, { useState } from "react";
import { useComplements } from "@/hooks/eventeco/useComplements";
import { Complement } from "@/types/Complement";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Toast } from "primereact/toast";
import styles from "@/styles/eventeco/TicketPurchase.module.css";

const StepSelectComplements: React.FC<{ ticketData: any; complements: Complement[]; onNext: () => void; onPrev: () => void }> = ({
    ticketData,
    complements,
    onNext,
    onPrev,
}) => {
    const toast = React.useRef<Toast>(null);
    console.log("ticketData", ticketData);

    const [selectedComplements, setSelectedComplements] = useState<{ [key: number]: number[] }>(
        Object.fromEntries(ticketData.map((ticket: any) => [ticket.idticketinfo, []]))
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

    const getTotalPrice = () => {
        return ticketData.reduce((total: number, ticket: any) => {
            const ticketPrice = parseFloat(ticket.price) + 5;
            const complementsPrice =
                selectedComplements[ticket.idticketinfo]?.reduce((sum, id) => {
                    const comp = complements?.find((c: Complement) => c.idcomplement === id);
                    return sum + (comp ? parseFloat(comp.price.toString()) : 0);
                }, 0) || 0;
            return total + ticketPrice + complementsPrice;
        }, 0);
    };

    const getComplementPrice = () => {
        return ticketData.reduce((total: number, ticket: any) => {
            return (
                total +
                (selectedComplements[ticket.idticketinfo]?.reduce((sum, id) => {
                    const comp = complements?.find((c: Complement) => c.idcomplement === id);
                    return sum + (comp ? parseFloat(comp.price.toString()) : 0);
                }, 0) || 0)
            );
        }, 0);
    };

    const handleNext = () => {
        const updatedTicketData = ticketData.map((ticket: any) => ({
            ...ticket,
            entries: ticket.entries.map(() => ({
                complements: selectedComplements[ticket.idticketinfo] || [],
            })),
        }));

        if (!updatedTicketData) {
            toast.current?.show({
                severity: "warn",
                summary: "Atención",
                detail: "Debes seleccionar al menos un complemento antes de continuar.",
                life: 3000,
            });
            return;
        }

        onNext();
    };

    return (
        <div className={styles.stepContainer}>
            <Toast ref={toast} />
            <h2>Selecciona Complementos para tus Entradas</h2>

            <div className={styles.complementList}>
                {ticketData.map((ticket: any) => (
                    <div key={ticket.idticketinfo} className={styles.ticketComplementSection}>
                        <h3>{`Entrada ${ticketData.indexOf(ticket) + 1} - (${ticket.type})`}</h3>
                        {complements?.map((complement: Complement) => (
                            <div key={complement.idcomplement} className={styles.complementItem}>
                                <Checkbox
                                    inputId={`comp-${ticket.idticketinfo}-${complement.idcomplement}`}
                                    checked={selectedComplements[ticket.idticketinfo]?.includes(complement.idcomplement)}
                                    onChange={() => handleComplementChange(ticket.idticketinfo, complement.idcomplement)}
                                />
                                <label htmlFor={`comp-${ticket.idticketinfo}-${complement.idcomplement}`}>
                                    {complement.name} - ${complement.price}
                                    {complement.description && ` (${complement.description})`}
                                </label>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div className={styles.totalPrice}>
                <h5>Complementos: {getComplementPrice().toFixed(2)}€</h5>
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
