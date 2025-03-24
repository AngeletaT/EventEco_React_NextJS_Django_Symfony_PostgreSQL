import { Metadata } from "next";
import EventecoContactClient from "@/components/eventeco/contact/EventecoContactClient";

export const metadata: Metadata = {
    title: "EventEco - Contacto",
    description: "Contacta con nosotros para cualquier duda o sugerencia.",
};

const EventecoContactPage = () => {
    return <EventecoContactClient />;
};

export default EventecoContactPage;
