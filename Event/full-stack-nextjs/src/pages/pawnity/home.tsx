import { Metadata } from "next";
import PawnityHomeClient from "@/components/pawnity/home/PawnityHomeClient";

export const metadata: Metadata = {
    title: "Pawnity - Eventos Sostenibles",
    description: "Descubre y participa en eventos eco-friendly que marcan la diferencia.",
};

const PawnityHomePage = () => {
    return <PawnityHomeClient />;
};

export default PawnityHomePage;
