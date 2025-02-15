import { Metadata } from "next";
import PawnityProfileClient from "@/components/pawnity/profile/PawnityProfileClient";

export const metadata: Metadata = {
    title: "Perfil del Cliente - Pawnity",
    description: "Gestiona tus entradas, tus mascotas, compras y preferencias en Pawnity.",
};

const ProfilePage = () => {
    return <PawnityProfileClient />;
};

export default ProfilePage;
