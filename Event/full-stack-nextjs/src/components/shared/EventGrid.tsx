"use client";

import React from "react";
import { Event } from "@/types/Event";
import { Card, Button } from "@/utils/PrimeReactComponents";
import styles from "@/styles/pawnity/Home.module.css";

interface EventGridProps {
    events: Event[];
}

const EventGrid: React.FC<EventGridProps> = ({ events }) => {
    return (
        <div className={styles.grid}>
            {events.map((event) => (
                <Card
                    key={event.idevent}
                    title={event.name}
                    className="p-shadow-2"
                    header={<img src={event.urlposter} alt={event.name} style={{ width: "100%" }} />}
                >
                    <p>{event.description}</p>
                    <Button label="Ver más" className="p-button-secondary" />
                </Card>
            ))}
        </div>
    );
};

export default EventGrid;
