import React from "react";
import { GetServerSideProps } from "next";
import { fetchCategories } from "@/services/pawnity/actions/getCategories";
import { fetchEvents } from "@/services/pawnity/actions/getEvents";
import PawnityShopClient from "@/components/pawnity/shop/PawnityShopClient";
import { Category } from "@/types/Category";
import { Event } from "@/types/Event";

interface PawnityShopPageProps {
    categories: Category[];
    events: Event[];
}

const PawnityShopPage: React.FC<PawnityShopPageProps> = ({ categories, events }) => {
    return <PawnityShopClient categories={categories} events={events} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
    const categories = await fetchCategories();
    const events = await fetchEvents();

    return {
        props: {
            categories,
            events,
        },
    };
};

export default PawnityShopPage;
