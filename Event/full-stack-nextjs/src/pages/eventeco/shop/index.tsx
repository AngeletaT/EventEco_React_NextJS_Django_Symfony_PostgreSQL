import { Metadata } from "next";
import EventecoShopClient from "@/components/eventeco/shop/EventecoShopClient";

export const metadata: Metadata = {
    title: "EventEco - Tienda",
    description: "Descubre y adquiere entradas para los mejores eventos eco-friendly.",
};

const EventecoShopPage = () => {
    return <EventecoShopClient />;
};

export default EventecoShopPage;
