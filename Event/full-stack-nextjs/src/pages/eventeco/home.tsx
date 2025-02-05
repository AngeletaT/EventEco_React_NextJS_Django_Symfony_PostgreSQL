import { Metadata } from "next";
import EventecoHomeClient from "@/components/eventeco/home/EventecoHomeClient";

export const metadata: Metadata = {
    title: "EventEco - Eventos Sostenibles",
    description: "Descubre y participa en eventos eco-friendly que marcan la diferencia.",
};

const EventecoHomePage = () => {
    return <EventecoHomeClient />;
};

export default EventecoHomePage;
