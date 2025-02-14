"use client";

import React from "react";
import { useCategories } from "@/hooks/pawnity/useCategories";
import { useEvents } from "@/hooks/pawnity/useEvents";
import { usePets } from "@/hooks/pawnity/usePets";
import { Category } from "@/types/Category";
import { Event } from "@/types/Event";
import { Pet } from "@/types/pawnity/Pet";
import PawnityLayout from "@/layouts/pawnity/PawnityLayout";
import Hero from "@/components/pawnity/home/Hero";
import { PetsSkeleton } from "@/components/pawnity/skeletons/PetsSkeleton";
import PetGallery from "@/components/pawnity/home/PetGallery";
import CategorySkeleton from "@/components/pawnity/skeletons/CategorySkeleton";
import CategoryCarousel from "@/components/pawnity/home/CategoryCarousel";
import { EventSkeleton } from "@/components/pawnity/skeletons/EventSkeleton";
import PopularEvents from "@/components/pawnity/home/PopularEvents";

const PawnityHomePage = () => {
    const { data: categories, isLoading: loadingCategories } = useCategories<Category[]>();
    const { data: events, isLoading: loadingEvents } = useEvents();
    const { data: pets, isLoading: loadingPets } = usePets();

    return (
        <PawnityLayout>
            <Hero />
            {loadingCategories ? <CategorySkeleton /> : <CategoryCarousel categories={categories as Category[]} />}
            {loadingPets ? <PetsSkeleton /> : <PetGallery pets={pets as Pet[]} />}
            {loadingEvents ? <EventSkeleton /> : <PopularEvents events={events as Event[]} />}
        </PawnityLayout>
    );
};

export default PawnityHomePage;
