"use client";

import React from "react";
import EventecoLayout from "@/layouts/eventeco/EventecoLayout";
import Hero from "@/components/eventeco/home/Hero";
import IconCards from "@/components/eventeco/home/IconCards";
import CategoryCarousel from "@/components/eventeco/home/CategoryCarousel";
import PopularEvents from "@/components/eventeco/home/PopularEvents";
import { Category } from "@/types/Category";
import { Event } from "@/types/Event";

interface EventecoHomeClientProps {
    categories: Category[];
    events: Event[];
}

const EventecoHomeClient: React.FC<EventecoHomeClientProps> = ({ categories, events }) => {
    return (
        <EventecoLayout>
            <Hero />
            <IconCards />
            <CategoryCarousel categories={categories} />
            <PopularEvents events={events} />
        </EventecoLayout>
    );
};

export default EventecoHomeClient;
