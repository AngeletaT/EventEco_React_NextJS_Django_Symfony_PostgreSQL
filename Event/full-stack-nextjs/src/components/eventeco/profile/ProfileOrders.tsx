"use client";

import React, { useRef } from "react";
import { Accordion, AccordionTab, Card, Tag, Rating, Button } from "@/utils/PrimeReactComponents";
import styles from "@/styles/eventeco/Client/ProfileOrders.module.css";
import { Order } from "@/types/eventeco/Order";
import { Toast } from "primereact/toast";

interface ProfileOrdersProps {
    oldTickets: Order[];
}

const ProfileOrders: React.FC<ProfileOrdersProps> = ({ oldTickets }) => {
    const [value, setValue] = React.useState<number>(0);
    const toast = useRef<Toast>(null);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "paid":
                return "success";
            case "pending":
                return "warning";
            case "cancelled":
                return "danger";
            default:
                return "info";
        }
    };

    const getStatusName = (status: string) => {
        switch (status) {
            case "completed":
                return "Completado";
            case "pending":
                return "Pendiente";
            case "cancelled":
                return "Cancelado";
            case "refunded":
                return "Reembolsado";
            default:
                return "Desconocido";
        }
    };

    const getPaymentStatus = (status: string) => {
        switch (status) {
            case "paid":
                return "Pagado";
            case "pending":
                return "Pendiente";
            case "failed":
                return "Fallido";
            case "refunded":
                return "Reembolsado";
            default:
                return "Desconocido";
        }
    };

    return (
        <div className={styles.container}>
            <h1>Historial de Compras</h1>
            {oldTickets.length === 0 ? (
                <p>No tienes pedidos anteriores.</p>
            ) : (
                <Accordion multiple>
                    {oldTickets.map((order, index) => {
                        const event = order.event;
                        const ticket = order.ticketunits?.[0];
                        const ticketInfo = ticket?.ticketinfo;

                        return (
                            <AccordionTab
                                key={order.idorder}
                                header={
                                    <div className={styles.header}>
                                        <img src={event.urlposter.replace(/\\/g, "/")} alt={event.name} className={styles.poster} />
                                        <div className={styles.details}>
                                            <h3>{event.name}</h3>
                                            <p>
                                                {event.location} | {new Date(event.startdate).toLocaleDateString()} -{" "}
                                                {new Date(event.enddate).toLocaleDateString()}
                                            </p>
                                            <p>Fecha de compra: {new Date(order.datepurchase).toLocaleDateString()}</p>
                                            <div className={styles.statusColumn}>
                                                <Tag
                                                    value={`Estado del pedido: ${getStatusName(order.status)}`}
                                                    severity={getStatusColor(order.status)}
                                                />
                                                <Tag
                                                    value={`Pago: ${getPaymentStatus(order.paymentstatus)}`}
                                                    severity={getStatusColor(order.paymentstatus)}
                                                />
                                            </div>
                                        </div>
                                        <div className={styles.total}>
                                            <h4>Total</h4>
                                            <p>{order.totalprice.toFixed(2)} €</p>
                                        </div>
                                    </div>
                                }
                            >
                                <div className={styles.body}>
                                    <div className={styles.section}>
                                        <h4>Entradas</h4>
                                        {order.ticketunits.map((ticket) => (
                                            <div key={ticket.idticketunit} className={styles.ticketCard}>
                                                <div className={styles.ticketDetails}>
                                                    <p>
                                                        <strong>Tipo:</strong> {ticket.ticketinfo.type} - {ticket.ticketinfo.price} €
                                                    </p>
                                                    <p>
                                                        <strong>Nombre:</strong> {ticket.nameassistant}
                                                    </p>
                                                    <p>
                                                        <strong>DNI:</strong> {ticket.dniassistant}
                                                    </p>
                                                    <p>
                                                        <strong>Código:</strong> {ticket.code}
                                                    </p>
                                                    <div className={styles.complements}>
                                                        <h5>Complementos</h5>
                                                        {ticket.complements.length === 0 ? (
                                                            <p>No se añadieron complementos a esta entrada.</p>
                                                        ) : (
                                                            <ul>
                                                                {ticket.complements.map((comp, i) => (
                                                                    <li key={i}>
                                                                        {comp.name} - {comp.price} €
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className={styles.ticketPrices}>
                                                    <p>
                                                        <strong>Total de Entrada:</strong>{" "}
                                                        {(
                                                            parseFloat(ticket.unitprice) +
                                                            ticket.complements.reduce((acc, comp) => acc + parseFloat(comp.price), 0)
                                                        ).toFixed(2)}
                                                        €
                                                    </p>
                                                    <p>+ 5.00 €</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className={styles.section}>
                                        <h4>Puntúa este evento</h4>
                                        <Rating value={value} onChange={(e) => setValue(e.value ?? 0)} cancel={false} disabled={value > 0} />
                                        {value > 1 && (
                                            <div className={styles.thankYouMessage}>
                                                <p>¡Gracias por tu valoración!</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </AccordionTab>
                        );
                    })}
                </Accordion>
            )}
        </div>
    );
};

export default ProfileOrders;
