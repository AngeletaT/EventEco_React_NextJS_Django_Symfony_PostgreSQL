"use client";

import React from "react";
import { useCategories } from "@/hooks/pawnity/useCategories";
import { useEvents } from "@/hooks/pawnity/useEvents";
import { Category } from "@/types/Category";
import { Event } from "@/types/Event";
import PawnityLayout from "@/layouts/pawnity/PawnityLayout";
import Hero from "@/components/pawnity/home/Hero";
import PetGallery from "@/components/pawnity/home/PetGallery";
import CategorySkeleton from "./skeletons/CategorySkeleton";
import CategoryCarousel from "@/components/pawnity/home/CategoryCarousel";
import EventSkeleton from "./skeletons/EventSkeleton";
import PopularEvents from "@/components/pawnity/home/PopularEvents";

const PawnityHomePage = () => {
    const { data: categories, isLoading: loadingCategories } = useCategories<Category[]>();
    const { data: events, isLoading: loadingEvents } = useEvents<Event[]>();

    return (
        <PawnityLayout>
            <Hero />
            {loadingCategories ? <CategorySkeleton /> : <CategoryCarousel categories={categories as Category[]} />}
            <PetGallery />
            {loadingEvents ? <EventSkeleton /> : <PopularEvents events={events as Event[]} />}
        </PawnityLayout>
    );
};

export default PawnityHomePage;
