"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/eventeco/Home.module.css";
import { Button } from "@/utils/PrimeReactComponents";
import { Event } from "@/types/Event";

interface PopularEventsProps {
    events: Event[];
}

const PopularEvents: React.FC<PopularEventsProps> = ({ events }) => {
    useEffect(() => {
        const shuffled = [...events].sort(() => 0.5 - Math.random());
        setPopularEvents(shuffled.slice(0, 8));
    }, [events]);

    const [popularEvents, setPopularEvents] = React.useState<Event[]>([]);

    return (
        <section className={styles.popularSection}>
            <h2>Eventos Más Populares</h2>
            <div className={styles.eventgrid}>
                {popularEvents.map((event) => (
                    <div key={event.idevent} className={styles.eventcard}>
                        <img src={event.urlposter} alt={event.name} className={styles.eventimage} />
                        <div className={styles.eventinfo}>
                            <h3>{event.name}</h3>
                            <p>{new Date(event.startdate).toLocaleDateString("es-ES")}</p>
                            <p>{event.location}</p>
                        </div>
                        <Button
                            label="Ver más"
                            onClick={() => (window.location.href = `/eventeco/shop/event/${event.name}`)}
                            className="p-button-success"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PopularEvents;
