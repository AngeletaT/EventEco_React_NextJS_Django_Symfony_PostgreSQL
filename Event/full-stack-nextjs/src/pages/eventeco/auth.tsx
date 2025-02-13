import { Metadata } from "next";
import EventecoAuthClient from "@/components/eventeco/auth/EventecoAuthClient";

export const metadata: Metadata = {
    title: "Eventeco - Eventos Sostenibles",
    description: "Descubre y participa en eventos eco-friendly que marcan la diferencia.",
};

const EventecoAuthPage = () => {
    return <EventecoAuthClient />;
};

export default EventecoAuthPage;
