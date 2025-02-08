import { Metadata } from "next";
import PawnityShopClient from "@/components/pawnity/shop/PawnityShopClient";

export const metadata: Metadata = {
    title: "Pawnity - Tienda",
    description: "Descubre y adquiere entradas para los mejores eventos con Mascotas.",
};

const PawnityShopPage = () => {
    return <PawnityShopClient />;
};

export default PawnityShopPage;
