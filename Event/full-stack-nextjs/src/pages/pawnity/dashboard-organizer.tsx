import { Metadata } from "next";
import PawnityDashboardOrganizer from "@/components/pawnity/dashboard-organizer/PawnityDashboardOrganizer";

export const metadata: Metadata = {
    title: "Pawnity - Eventos para Mascotas",
    description: "Organiza eventos para mascotas y vende entradas para tus eventos",
};

const DashboardOrganizerPage = () => {
    return <PawnityDashboardOrganizer />;
};

export default DashboardOrganizerPage;
