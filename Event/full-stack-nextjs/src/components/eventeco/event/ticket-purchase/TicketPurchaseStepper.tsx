"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Steps, Button } from "@/utils/PrimeReactComponents";
import { Event } from "@/types/Event";
import StepSelectTickets from "./StepSelectTickets";
import StepSelectComplements from "./StepSelectComplements";
import StepBuyerInfo from "./StepBuyerInfo";
import StepPayment from "./StepPayment";
import StepNominateTickets from "./StepNominateTickets";
import styles from "@/styles/eventeco/TicketPurchase.module.css";
import { RootState } from "@/store/eventeco";

const TicketPurchaseStepper: React.FC<{ event: Event }> = ({ event }) => {
    const tickets = event.tickets;
    const complements = event.complements;
    const [activeIndex, setActiveIndex] = useState(0);
    const { isAuthenticated } = useSelector((state: RootState) => state.user);

    const [orderData, setOrderData] = useState({
        idevent: event.idevent,
        tickets: [],
    });

    const [idorder, setIdorder] = useState(0);
    const [ticketUnits, setTicketUnits] = useState<any[]>([]);

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
                {activeIndex === 0 && <StepSelectTickets tickets={tickets} onNext={handleNext} orderData={orderData} setOrderData={setOrderData} />}
                {activeIndex === 1 && (
                    <StepSelectComplements
                        complements={complements}
                        onNext={handleNext}
                        onPrev={handlePrev}
                        orderData={orderData}
                        setOrderData={setOrderData}
                    />
                )}
                {activeIndex === 2 && <StepBuyerInfo onNext={handleNext} onPrev={handlePrev} />}
                {activeIndex === 3 && (
                    <StepPayment
                        onNext={handleNext}
                        onPrev={handlePrev}
                        orderData={orderData}
                        setIdorder={setIdorder}
                        setTicketUnits={setTicketUnits}
                    />
                )}
                {activeIndex === 4 && <StepNominateTickets onPrev={handlePrev} idorder={idorder} ticketUnits={ticketUnits} />}
            </div>
        </div>
    );
};

export default TicketPurchaseStepper;
