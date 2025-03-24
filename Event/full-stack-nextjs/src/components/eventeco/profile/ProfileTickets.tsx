"use client";

import React, { useEffect, useState } from "react";
import { Accordion, AccordionTab, Tag } from "@/utils/PrimeReactComponents";
import styles from "@/styles/eventeco/Client/ProfileTickets.module.css";
import dynamic from "next/dynamic";
import { Order } from "@/types/eventeco/Order";
import { getEventBySlug } from "@/services/eventeco/queries/getEvents";

const ReadOnlyCalendar = dynamic(() => import("@/components/eventeco/profile/ReadOnlyCalendar"), { ssr: false });
const EventMap = dynamic(() => import("@/components/eventeco/event/EventMap"), { ssr: false });

interface ProfileTicketsProps {
    activeTickets: Order[];
}

const ProfileTickets: React.FC<ProfileTicketsProps> = ({ activeTickets }) => {
    const [event, setEvent] = useState<any>(null);
    const [subevents, setSubevents] = useState<any>(null);
    const [coordinates, setCoordinates] = useState<[number, number]>([0, 0]);
    console.log(event);
    console.log(subevents);

    useEffect(() => {
        const fetchEvent = async () => {
            if (activeTickets.length > 0) {
                const fetchedEvent = await getEventBySlug(activeTickets[0].event.eventslug);
                setEvent(fetchedEvent);
                setSubevents(fetchedEvent.subevents);

                const position = fetchedEvent.position.slice(1, -1).split(",").map(Number) as [number, number];
                const coordinates: [number, number] = [position[0] || 0, position[1] || 0];
                setCoordinates(coordinates);
            }
        };
        fetchEvent();
    }, [activeTickets]);

    const calculateDaysLeft = (iso: string) => {
        const date = new Date(iso);
        const now = new Date();
        const difference = date.getTime() - now.getTime();
        const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));
        return daysLeft;
    };

    if (!event) {
        return <p>Cargando información del evento...</p>;
    }

    return (
        <div className={styles.container}>
            <h2>Mis Entradas Activas</h2>

            {activeTickets.length === 0 ? (
                <p>No tienes entradas activas actualmente.</p>
            ) : (
                <Accordion multiple>
                    {activeTickets.map((order) => {
                        const event = order.event;

                        return (
                            <AccordionTab
                                key={order.idorder}
                                header={
                                    <div className={styles.header}>
                                        <img src={event.urlposter.replace(/\\/g, "/")} alt={event.name} className={styles.poster} />
                                        <div>
                                            <h3>{event.name}</h3>
                                            <p>{event.location}</p>
                                            <p>
                                                {formatDate(event.startdate)} - {formatDate(event.enddate)}
                                            </p>
                                        </div>
                                        <div style={{ marginLeft: "auto", alignSelf: "flex-start" }}>
                                            <Tag severity="info" value={`Faltan ${calculateDaysLeft(event.startdate)} días`} />
                                        </div>
                                    </div>
                                }
                            >
                                <div className={styles.content}>
                                    <div className={styles.ticketList}>
                                        {order.ticketunits.map((ticket) => (
                                            <div key={ticket.idticketunit} className={styles.ticketCard}>
                                                <div className={styles.ticketLeft}>
                                                    <img
                                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`${ticket.code}-${ticket.dniassistant}-${ticket.nameassistant}`)}`}
                                                        alt="Código QR"
                                                        width="150"
                                                        height="150"
                                                        style={{ margin: "10px auto", display: "block" }}
                                                    />
                                                    <p className={styles.code}>{ticket.code}</p>
                                                </div>
                                                <div className={styles.ticketCenter}>
                                                    <p>
                                                        <strong>Nombre:</strong> {ticket.nameassistant}
                                                    </p>
                                                    <p>
                                                        <strong>DNI:</strong> {ticket.dniassistant}
                                                    </p>
                                                </div>
                                                <div className={styles.ticketRight}>
                                                    <p>
                                                        <strong> {ticket.ticketinfo.type}</strong>
                                                    </p>
                                                    {ticket.complements.length > 0 && (
                                                        <div>
                                                            <strong>Complementos:</strong>
                                                            <ul>
                                                                {ticket.complements.map((c) => (
                                                                    <li key={c.idcomplement}>{c.name}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <Accordion multiple className={styles.sectionAccordion}>
                                        <AccordionTab header="🧾 PRECIO EN DETALLE">
                                            <ul>
                                                <li>Entradas: {order.subtotaltickets} €</li>
                                                <li>Complementos: {order.subtotalcomplements} €</li>
                                                <li>Comisiones: {order.subtotalcommissions} €</li>
                                            </ul>
                                            <p>
                                                <strong>Total: {order.totalprice} €</strong>
                                            </p>
                                        </AccordionTab>
                                    </Accordion>

                                    <Accordion multiple className={styles.sectionAccordion}>
                                        <AccordionTab header="🎭 ACTIVIDADES">
                                            <div className={styles.section}>
                                                <h4>🗓️ Actividades del Evento</h4>
                                                {subevents && subevents.length > 0 ? (
                                                    <ReadOnlyCalendar subevents={subevents} />
                                                ) : (
                                                    <p>Este evento no tiene actividades programadas.</p>
                                                )}
                                            </div>
                                        </AccordionTab>
                                    </Accordion>

                                    <div>
                                        <h4>📋 Instrucciones</h4>
                                        <p>No es necesario que imprimas nada, solo tienes que mostrar tu ticket Eventeco desde el móvil.</p>
                                        <p>
                                            Únicamente podrás validar tu ticket cuando estés con el personal del establecimiento. Una vez validado, no
                                            podrás volver a utilizarlo sin el complemento de entrada.
                                        </p>
                                        <h4>Información: </h4>
                                        <p>📍 {event.location} - Playa de la Malvarrosa</p> <p>¡Nos vemos pronto!</p>
                                    </div>

                                    <EventMap location={event.location} coordinates={coordinates} />
                                </div>
                            </AccordionTab>
                        );
                    })}
                </Accordion>
            )}
        </div>
    );
};

const formatDate = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleDateString("es-ES");
};

export default ProfileTickets;
