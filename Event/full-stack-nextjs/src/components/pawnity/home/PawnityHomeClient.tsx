import React from "react";
import PawnityLayout from "@/layouts/pawnity/PawnityLayout";
import Hero from "@/components/pawnity/home/Hero";
import CategoryCarousel from "@/components/pawnity/home/CategoryCarousel";
import PetGallery from "@/components/pawnity/home/PetGallery";
import PopularEvents from "./PopularEvents";
import { Category } from "@/types/Category";
import { Event } from "@/types/Event";

interface PawnityHomeClientProps {
    categories: Category[];
    events: Event[];
}

const PawnityHomePage: React.FC<PawnityHomeClientProps> = ({ categories, events }) => {
    return (
        <PawnityLayout>
            <Hero />
            <CategoryCarousel categories={categories} />
            <PetGallery />
            <PopularEvents events={events} />
        </PawnityLayout>
    );
};

export default PawnityHomePage;
