import React from "react";
import { GetServerSideProps } from "next";
import { fetchCategories } from "@/services/pawnity/actions/getCategories";
import { fetchEvents } from "@/services/pawnity/actions/getEvents";
import PawnityHomeClient from "@/components/pawnity/home/PawnityHomeClient";
import { Category } from "@/types/Category";
import { Event } from "@/types/Event";

interface PawnityHomePageProps {
    categories: Category[];
    events: Event[];
}

const PawnityHomePage: React.FC<PawnityHomePageProps> = ({ categories, events }) => {
    return <PawnityHomeClient categories={categories} events={events} />;
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

export default PawnityHomePage;
