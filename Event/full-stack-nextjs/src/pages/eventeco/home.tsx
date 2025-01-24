import React from "react";
import { GetServerSideProps } from "next";
import { fetchCategories } from "@/services/eventeco/actions/getCategories";
import { fetchEvents } from "@/services/eventeco/actions/getEvents";
import EventecoHomeClient from "@/components/eventeco/home/EventecoHomeClient";
import { Category } from "@/types/Category";
import { Event } from "@/types/Event";

interface EventecoHomePageProps {
    categories: Category[];
    events: Event[];
}

const EventecoHomePage: React.FC<EventecoHomePageProps> = ({ categories, events }) => {
    return <EventecoHomeClient categories={categories} events={events} />;
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

export default EventecoHomePage;
