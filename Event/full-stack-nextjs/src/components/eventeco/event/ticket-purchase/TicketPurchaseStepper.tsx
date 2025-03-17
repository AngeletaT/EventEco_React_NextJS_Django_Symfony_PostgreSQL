"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Steps, Button } from "@/utils/PrimeReactComponents";
import { Event } from "@/types/Event";
import StepSelectTickets from "./StepSelectTickets";
import StepSelectComplements from "./StepSelectComplements";
import StepBuyerInfo from "./StepBuyerInfo";
// import StepPayment from "./StepPayment";
// import StepNominateTickets from "./StepNominateTickets";
import styles from "@/styles/eventeco/TicketPurchase.module.css";
import { RootState } from "@/store/eventeco";

const TicketPurchaseStepper: React.FC<{ event: Event }> = ({ event }) => {
    const tickets = event.tickets;
    const complements = event.complements;
    const [activeIndex, setActiveIndex] = useState(0);
    const { isAuthenticated } = useSelector((state: RootState) => state.user);
    const [ticketData, setTicketData] = useState<any>(null);
    const [orderId, setOrderId] = useState<number | null>(null);

    const steps = [
        { label: "Seleccionar Entradas" },
        { label: "Seleccionar Complementos" },
        { label: "Datos del Comprador" },
        { label: "Pago" },
        { label: "Asignar Nombres" },
    ];

    const handleNext = () => {
        setActiveIndex((prev) => Math.min(prev + 1, steps.length - 1));
    };

    const handlePrev = () => {
        setActiveIndex((prev) => Math.max(prev - 1, 0));
    };

    return (
        <div className={styles.container}>
            <Steps model={steps} activeIndex={activeIndex} />

            {activeIndex < 2 && !isAuthenticated && (
                <div className={styles.warningCard}>
                    <i className="pi pi-info-circle" />
                    <span>Debes iniciar sesión para finalizar la compra.</span>
                </div>
            )}

            <div className={styles.content}>
                {activeIndex === 0 && <StepSelectTickets tickets={tickets} setTicketData={setTicketData} onNext={handleNext} />}
                {activeIndex === 1 && (
                    <StepSelectComplements ticketData={ticketData} complements={complements} onNext={handleNext} onPrev={handlePrev} />
                )}
                {activeIndex === 2 && <StepBuyerInfo onNext={handleNext} onPrev={handlePrev} />}
                {/* {activeIndex === 3 && (
                    <StepPayment
                        eventId={eventId}
                        ticketData={ticketData}
                        buyerInfo={buyerInfo}
                        setOrderId={setOrderId}
                        onNext={handleNext}
                        onPrev={handlePrev}
                    />
                )} */}
                {/* {activeIndex === 4 && <StepNominateTickets orderId={orderId} onPrev={handlePrev} />} */}
            </div>
        </div>
    );
};

export default TicketPurchaseStepper;
