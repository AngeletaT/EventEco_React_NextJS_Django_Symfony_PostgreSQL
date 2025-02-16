import { Metadata } from "next";
import EventecoDashboardOrganizer from "@/components/eventeco/dashboard-organizer/EventecoDashboardOrganizer";

export const metadata: Metadata = {
    title: "Eventeco - Eventos Sostenibles",
    description: "Descubre y participa en eventos eco-friendly que marcan la diferencia.",
};

const DashboardOrganizerPage = () => {
    return <EventecoDashboardOrganizer />;
};

export default DashboardOrganizerPage;
