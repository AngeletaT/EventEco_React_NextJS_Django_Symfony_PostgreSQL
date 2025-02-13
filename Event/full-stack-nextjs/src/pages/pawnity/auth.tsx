import { Metadata } from "next";
import PawnityAuthClient from "@/components/pawnity/auth/PawnityAuthClient";

export const metadata: Metadata = {
    title: "Pawnity - Eventos con Mascotas",
    description: "Descubre y participa en eventos con mascotas que marcan la diferencia.",
};

const PawnityAuthPage = () => {
    return <PawnityAuthClient />;
};

export default PawnityAuthPage;
