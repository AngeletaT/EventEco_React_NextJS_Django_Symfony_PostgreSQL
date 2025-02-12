import { Metadata } from "next";
import PawnityAuthClient from "@/components/pawnity/auth/PawnityAuthClient";

export const metadata: Metadata = {
    title: "Pawnity - Eventos Sostenibles",
    description: "Descubre y participa en eventos eco-friendly que marcan la diferencia.",
};

const PawnityAuthPage = () => {
    return <PawnityAuthClient />;
};

export default PawnityAuthPage;
