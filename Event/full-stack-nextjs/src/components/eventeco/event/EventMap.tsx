"use client";

import React from "react";
import { LatLngExpression, Icon } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "@/styles/eventeco/EventDetails.module.css";

// Resolve marker icons as URLs
const markerIcon = new URL("leaflet/dist/images/marker-icon.png", import.meta.url).toString();
const markerShadow = new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).toString();
const markerRetina = new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).toString();

// Configure the default icon
import L from "leaflet";
const DefaultIcon = new L.Icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconRetinaUrl: markerRetina,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

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
