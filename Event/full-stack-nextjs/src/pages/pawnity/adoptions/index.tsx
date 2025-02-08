import { Metadata } from "next";
import PawnityAdoptionClient from "@/components/pawnity/adoptions/PawnityAdoptionClient";

export const metadata: Metadata = {
    title: "Pawnity - Adopciones",
    description: "Adopta a una mascota y dale un hogar lleno de amor.",
};

const PawnityAdoptionPage = () => {
    return <PawnityAdoptionClient />;
};

export default PawnityAdoptionPage;
