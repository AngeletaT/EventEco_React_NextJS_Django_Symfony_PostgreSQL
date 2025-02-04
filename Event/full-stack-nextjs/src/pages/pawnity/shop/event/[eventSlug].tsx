"use client";

import { useParams } from "next/navigation";
import React from "react";

const EventDetailPage: React.FC = () => {
    const params = useParams();
    const eventName = params.name;

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Detalles del Evento: {eventName}</h1>
            <p>Aquí se mostrarán los detalles del evento seleccionado.</p>
        </div>
    );
};

export default EventDetailPage;
