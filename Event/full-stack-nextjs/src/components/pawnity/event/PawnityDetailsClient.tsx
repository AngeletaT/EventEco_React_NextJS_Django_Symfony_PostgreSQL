"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Event } from "@/types/Event";
import PawnityLayout from "@/layouts/pawnity/PawnityLayout";
import { EventSkeleton } from "@/components/pawnity/skeletons/EventSkeleton";
import styles from "@/styles/pawnity/EventDetails.module.css";
const EventMap = dynamic(() => import("@/components/pawnity/event/EventMap"), { ssr: false });

const PawnityDetailsClient = ({ event }: { event: Event }) => {
    const [activeTab, setActiveTab] = useState("entradas");
    const position = event.position.slice(1, -1).split(",").map(Number) as [number, number];
    const coordinates: [number, number] = [position[0] || 0, position[1] || 0];

    if (!event) return <EventSkeleton />;

    return (
        <PawnityLayout>
            <div className={styles.container}>
                {/* Header con Imagen */}
                <div
                    className={styles.eventHeader}
                    style={{
                        backgroundImage: `url(${event.urlposter.replace(/\\/g, "/")})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div
                        className={styles.overlay}
                        style={{
                            backgroundImage: `url(${event.urlposter.replace(/\\/g, "/")})`,
                            backgroundSize: "200%",
                            backgroundPosition: "center",
                        }}
                    >
                        <div className={styles.eventInfo}>
                            <img src={event.urlposter} alt={event.name} className={styles.eventLogo} />
                            <div className={styles.eventDetails}>
                                <h1>{event.name}</h1>
                                <p className={styles.location}>{event.location}</p>
                                <p className={styles.date}>
                                    {event.startdate} - {event.enddate}
                                </p>
                            </div>
                        </div>
                        <div className={styles.breadcrumbs}>
                            <ul className="list-none p-0 m-0 flex align-items-center font-medium mb-3">
                                <li>
                                    <a className="no-underline line-height-3 cursor-pointer" onClick={() => (window.location.href = "/pawnity/shop")}>
                                        Eventos
                                    </a>
                                </li>
                                <li className="px-2">
                                    <i className="pi pi-angle-right text-500 line-height-3"></i>
                                </li>
                                <li>
                                    <span className=" line-height-3" style={{ color: "#d4d4d4" }}>
                                        {event.name}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Navegación de Tabs */}
                <nav className={styles.tabs}>
                    <button className={activeTab === "entradas" ? styles.active : ""} onClick={() => setActiveTab("entradas")}>
                        Entradas
                    </button>
                    <button className={activeTab === "info" ? styles.active : ""} onClick={() => setActiveTab("info")}>
                        Información
                    </button>
                </nav>

                {/* Contenido de la Página */}
                <div className={styles.content}>
                    {activeTab === "entradas" ? (
                        <div className={styles.ticketSection}>
                            <h2>Entradas</h2>
                            <p>Entradas a la venta próximamente.</p>
                        </div>
                    ) : (
                        <div className={styles.eventInfoSection}>
                            <h2>Detalles</h2>
                            <p>{event.description}</p>
                            <h2>Ubicación</h2>
                            <p>{event.location}</p>
                            <EventMap location={event.location} coordinates={coordinates} />
                            <h2>Actividades propuestas</h2>
                            {event.subevents && event.subevents.length > 0 ? (
                                event.subevents.map((sub, index) => (
                                    <div key={index} className={styles.eventCard}>
                                        <div className={styles.eventCardHeader}>
                                            <h3>{sub.name}</h3>
                                            <p>{sub.startdate}</p>
                                        </div>
                                        <div className={styles.eventCardBody}>
                                            <p>{sub.description}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>Se darán a conocer más adelante.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </PawnityLayout>
    );
};

export default PawnityDetailsClient;
