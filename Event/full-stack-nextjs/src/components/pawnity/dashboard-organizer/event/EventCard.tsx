import React from "react";
import { Event } from "@/types/Event";
import { Button } from "@/utils/PrimeReactComponents";
import ToggleEvent from "./ToggleEvent";
import styles from "@/styles/pawnity/DashboardEvent.module.css";

const EventCard = ({ event, onEdit }: { event: Event; onEdit: () => void }) => {
    return (
        <div className={styles.cardEvent}>
            <img src={event.urlposter} alt={event.name} className={styles.image} />
            <div className={styles.info}>
                <h3>{event.name}</h3>
                <p>{event.location}</p>
                <p>
                    {event.startdate} - {event.enddate}
                </p>
                <div className={styles.actions}>
                    <Button label="Editar" className="p-button-warning" onClick={onEdit} />
                    <ToggleEvent eventId={event.idevent} isactive={event.isactive} />
                </div>
            </div>
        </div>
    );
};

export default EventCard;
