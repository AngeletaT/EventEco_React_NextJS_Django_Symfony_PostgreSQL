"use client";

import React from "react";
import { useCategories } from "@/hooks/eventeco/useCategories";
import { useEvents } from "@/hooks/eventeco/useEvents";
import { Category } from "@/types/Category";
import { Event } from "@/types/Event";
import EventecoLayout from "@/layouts/eventeco/EventecoLayout";
import Hero from "@/components/eventeco/home/Hero";
import IconCards from "@/components/eventeco/home/IconCards";
import CategorySkeleton from "../skeletons/CategorySkeleton";
import CategoryCarousel from "@/components/eventeco/home/CategoryCarousel";
import EventSkeleton from "../skeletons/EventSkeleton";
import PopularEvents from "@/components/eventeco/home/PopularEvents";

const EventecoHomeClient = () => {
    const { data: categories, isLoading: loadingCategories } = useCategories<Category[]>();
    const { data: events, isLoading: loadingEvents } = useEvents<Event[]>();

    return (
        <EventecoLayout>
            <Hero />
            <IconCards />
            {loadingCategories ? <CategorySkeleton /> : <CategoryCarousel categories={categories as Category[]} />}
            {loadingEvents ? <EventSkeleton /> : <PopularEvents events={events as Event[]} />}
        </EventecoLayout>
    );
};

export default EventecoHomeClient;
