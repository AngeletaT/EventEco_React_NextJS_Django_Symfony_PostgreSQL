import { Metadata } from "next";
import EventecoProfileClient from "@/components/eventeco/profile/EventecoProfileClient";

export const metadata: Metadata = {
    title: "Perfil del Cliente - Eventeco",
    description: "Gestiona tus entradas, compras y preferencias en Eventeco.",
};

const ProfilePage = () => {
    return <EventecoProfileClient />;
};

export default ProfilePage;
