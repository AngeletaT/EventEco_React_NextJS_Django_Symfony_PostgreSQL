import React from "react";
import Hero from "@/components/pawnity/home/Hero";
import CategoryCarousel from "@/components/pawnity/home/CategoryCarousel";
import PetGallery from "@/components/pawnity/home/PetGallery";
import { Category } from "@/types/Category";
import PawnityLayout from "@/layouts/pawnity/PawnityLayout";

interface PawnityHomeClientProps {
    categories: Category[];
}

const PawnityHomePage: React.FC<PawnityHomeClientProps> = ({ categories }) => {
    return (
        <PawnityLayout>
            <Hero />
            <CategoryCarousel categories={categories} />
            <PetGallery />
        </PawnityLayout>
    );
};

export default PawnityHomePage;
