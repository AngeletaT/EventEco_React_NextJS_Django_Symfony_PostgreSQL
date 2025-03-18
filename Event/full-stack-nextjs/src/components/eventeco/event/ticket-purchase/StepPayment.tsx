"use client";

import React, { useState } from "react";
import { useCreateOrder } from "@/hooks/eventeco/useOrders";
import { Button, Toast } from "@/utils/PrimeReactComponents";
import styles from "@/styles/eventeco/TicketPurchase.module.css";

const StepPayment: React.FC<{
    orderData: any;
    onNext: () => void;
    onPrev: () => void;
    setIdorder: (idorder: number) => void;
    setTicketUnits: (ticketUnits: any[]) => void;
}> = ({ orderData, onNext, onPrev, setIdorder, setTicketUnits }) => {
    const toast = React.useRef<Toast>(null);
    const [loading, setLoading] = useState(false);
    console.log(orderData);

    const createOrder = useCreateOrder();
    // const processPayment = useProcessPayment();

    const handlePayment = async () => {
        setLoading(true);

        try {
            const order = await createOrder.mutateAsync(orderData);
            console.log(order);
            setIdorder(order.idorder);
            setTicketUnits(order.ticketunits);

            // Redirigir a Stripe Checkout
            // const paymentUrl = await processPayment.mutateAsync(order.id);
            // window.location.href = paymentUrl;
            onNext();
        } catch (error) {
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "No se pudo procesar el pago. Intenta de nuevo.",
                life: 3000,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.stepContainer}>
            <Toast ref={toast} />
            <h2>Resumen de tu Pedido</h2>

            <div className={styles.orderSummary}>
                <h3>Entradas Seleccionadas</h3>
                {orderData.tickets.map((ticket: any, index: number) => (
                    <div key={index}>
                        <p>
                            {ticket.quantity}x {ticket.type} - {ticket.quantity * ticket.price}€
                        </p>
                        {ticket.entries.map((entry: any, entryIndex: number) => (
                            <div key={entryIndex} className={styles.complementSummary}>
                                <h4>Complementos:</h4>
                                {entry.info.map((complement: any, complementIndex: number) => (
                                    <li key={complementIndex}>
                                        {complement.type} - {complement.price}€
                                    </li>
                                ))}
                                <p>Subtotal Complementos: {entry.subtotalComplements}€</p>
                            </div>
                        ))}
                    </div>
                ))}
                <h3>
                    Total:{" "}
                    {orderData.tickets
                        .reduce((sum: number, ticket: any) => {
                            const ticketTotal = ticket.quantity * ticket.price;
                            const complementsTotal = ticket.entries.reduce(
                                (entrySum: number, entry: any) => entrySum + parseFloat(entry.subtotalComplements || 0),
                                0
                            );
                            return sum + ticketTotal + complementsTotal;
                        }, 0)
                        .toFixed(2)}
                    €
                </h3>
            </div>

            <div className={styles.navigationButtons}>
                <Button label="Atrás" icon="pi pi-chevron-left" className="p-button-secondary" onClick={onPrev} disabled={loading} />
                <Button label="Pagar con Stripe" icon="pi pi-credit-card" className="p-button-primary" onClick={handlePayment} loading={loading} />
            </div>
        </div>
    );
};

export default StepPayment;
