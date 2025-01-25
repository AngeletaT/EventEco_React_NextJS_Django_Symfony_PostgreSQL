"use client";

import React from "react";
import Hero from "@/components/eventeco/home/Hero";
import IconCards from "@/components/eventeco/home/IconCards";
import CategoryCarousel from "@/components/eventeco/home/CategoryCarousel";
import { Category } from "@/types/Category";

interface EventecoHomeClientProps {
    categories: Category[];
}

const EventecoHomeClient: React.FC<EventecoHomeClientProps> = ({ categories }) => {
    return (
        <div style={{ overflow: "hidden" }}>
            <Hero />
            <IconCards />
            <CategoryCarousel categories={categories} />
        </div>
    );
};

export default EventecoHomeClient;
