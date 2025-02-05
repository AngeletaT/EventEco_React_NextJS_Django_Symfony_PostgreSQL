"use client";

import { useParams } from "next/navigation";
import React from "react";

const EventDetailPage: React.FC = () => {
    const params = useParams();
    const eventSlug = params.eventSlug;

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Detalles del Evento: {eventSlug}</h1>
            <p>Aquí se mostrarán los detalles del evento seleccionado.</p>
        </div>
    );
};

export default EventDetailPage;
