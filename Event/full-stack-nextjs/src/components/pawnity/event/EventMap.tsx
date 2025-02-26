"use client";

import React from "react";
import { LatLngExpression } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "@/styles/pawnity/EventDetails.module.css";

interface EventMapProps {
    location: string;
    coordinates: [number, number];
}

const EventMap: React.FC<EventMapProps> = ({ location, coordinates }) => {
    const position: LatLngExpression = coordinates;

    return (
        <div className={styles.mapContainer}>
            <MapContainer center={position} zoom={13} className={styles.map}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position}>
                    <Popup>📍 {location}</Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default EventMap;
