"use client";

import React from "react";
import Link from "next/link";
import styles from "@/styles/eventeco/Shop.module.css";
import { Button } from "@/utils/PrimeReactComponents";
import { Event } from "@/types/Event";

interface ListEventsProps {
    events: Event[];
}

const ListEvents: React.FC<ListEventsProps> = ({ events }) => {
    return (
        <section className={styles.ShopSection}>
            <h2>Descubre nuestros Eventos</h2>
            {events.length === 0 ? (
                <h1 className={styles.noEvents}>No hay eventos disponibles por el momento</h1>
            ) : (
                <div className={styles.eventgrid}>
                    {events.map((event: Event) => (
                        <Link key={event.idevent} href={`/eventeco/shop/event/${event.eventslug}`} className={styles.eventCard}>
                            <div key={event.idevent} className={styles.eventcard}>
                                <img src={event.urlposter} alt={event.name} className={styles.eventimage} />
                                <div className={styles.eventdetails}>
                                    <h3>{event.name}</h3>
                                    <p>{event.description}</p>
                                    <p>
                                        <i className="pi pi-calendar"></i> {new Date(event.startdate).toLocaleDateString("es-ES")}
                                    </p>
                                    <p>
                                        <i className="pi pi-map-marker"></i> {event.location}
                                    </p>
                                </div>
                                <Button label="Ver más" className={`p-button-success ${styles.eventbutton}`} />
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </section>
    );
};

export default ListEvents;
