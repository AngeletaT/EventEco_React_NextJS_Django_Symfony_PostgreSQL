import React from "react";
import { GetServerSideProps } from "next";
import { fetchCategories } from "@/services/eventeco/actions/getCategories";
import { fetchEvents } from "@/services/eventeco/actions/getEvents";
import EventecoShopClient from "@/components/eventeco/shop/EventecoShopClient";
import { Category } from "@/types/Category";
import { Event } from "@/types/Event";

interface EventecoShopPageProps {
    categories: Category[];
    events: Event[];
}

const EventecoShopPage: React.FC<EventecoShopPageProps> = ({ categories, events }) => {
    return <EventecoShopClient categories={categories} events={events} />;
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

export default EventecoShopPage;
