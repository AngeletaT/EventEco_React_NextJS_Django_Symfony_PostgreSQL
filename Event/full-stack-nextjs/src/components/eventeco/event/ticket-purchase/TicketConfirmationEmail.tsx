"use client";

import React from "react";
import { Html, Head, Preview, Body, Container, Section, Img, Text, Heading, Hr } from "@react-email/components";

const TicketConfirmationEmail: React.FC<{ emailData: any }> = ({ emailData }) => {
    const event = emailData.event;
    const tickets = emailData.tickets;
    const user = emailData.user;
    const order = emailData.order;

    return (
        <Html>
            <Head />
            <Preview>¡Gracias por tu compra en Eventeco!</Preview>
            <Body style={styles.body}>
                <Container style={styles.container}>
                    {/* Header con imagen */}
                    <Section style={styles.bannerPlaceholder}>
                        <Text style={styles.bannerText}>🎟️ Confirmación de Compra</Text>
                    </Section>

                    <Section style={styles.titleSection}>
                        <Heading as="h2" style={styles.title}>
                            ¡Aquí tienes tu entrada {user.name}!
                        </Heading>
                        <Text style={styles.subtitle}>{event.name}</Text>
                    </Section>

                    {/* Info del evento */}
                    <Section style={styles.eventInfo}>
                        <Text>
                            <strong>📍 Lugar:</strong> {event.location}
                        </Text>
                        <Text>
                            <strong>📅 Fecha:</strong> {new Date(event.startdate).toLocaleDateString("es-ES")} -{" "}
                            {new Date(event.enddate).toLocaleDateString("es-ES")}
                        </Text>
                    </Section>

                    <Hr />

                    {/* Lista de tickets */}
                    {tickets.map((ticket: any, index: number) => (
                        <Section key={index} style={styles.ticketSection}>
                            <Text style={styles.ticketTitle}>
                                {order.tickets[index].type} - {order.tickets[index].price} €
                            </Text>
                            <Img src={ticket.qr} alt="Código QR" width="150" height="150" style={{ margin: "10px auto", display: "block" }} />{" "}
                            <Text>
                                <strong>Nombre:</strong> {ticket.nameassistant}
                            </Text>
                            <Text>
                                <strong>DNI:</strong> {ticket.dniassistant}
                            </Text>
                        </Section>
                    ))}

                    <Hr />

                    {/* Footer */}
                    <Section style={styles.footer}>
                        <Text>¿Alguna duda?</Text>
                        <Text>
                            Consulta nuestras <a href="https://eventeco.es/faq">preguntas frecuentes</a> o{" "}
                            <a href="https://eventeco.es/contacto">contáctanos</a>.
                        </Text>
                        <Text style={styles.footerNote}>Gracias por apoyar eventos sostenibles 🌱</Text>
                        <Text style={styles.footerNote}>Eventeco · info@eventeco.com</Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

export default TicketConfirmationEmail;

const styles = {
    body: {
        backgroundColor: "#f6f9fc",
        fontFamily: "Helvetica, Arial, sans-serif",
        padding: "20px",
    },
    container: {
        backgroundColor: "#fff",
        borderRadius: "8px",
        overflow: "hidden",
        padding: "20px",
    },
    bannerPlaceholder: {
        backgroundColor: "#77dd77",
        padding: "40px 0",
        textAlign: "center" as const,
        borderRadius: "8px",
    },
    bannerText: {
        color: "#fff",
        fontSize: "24px",
        fontWeight: "bold" as const,
    },
    titleSection: {
        textAlign: "center" as const,
        margin: "20px 0",
    },
    title: {
        fontSize: "24px",
        color: "#77dd77",
    },
    subtitle: {
        fontSize: "18px",
        marginBottom: "8px",
    },
    eventInfo: {
        fontSize: "14px",
        lineHeight: "22px",
        marginBottom: "20px",
    },
    ticketSection: {
        textAlign: "center" as const,
        border: "1px dashed #ccc",
        borderRadius: "8px",
        padding: "15px",
        marginBottom: "20px",
    },
    ticketTitle: {
        fontSize: "16px",
        fontWeight: "bold" as const,
        marginBottom: "10px",
    },
    footer: {
        textAlign: "center" as const,
        fontSize: "13px",
        color: "#888",
        marginTop: "30px",
    },
    footerNote: {
        fontSize: "12px",
        color: "#999",
        marginTop: "5px",
    },
};
