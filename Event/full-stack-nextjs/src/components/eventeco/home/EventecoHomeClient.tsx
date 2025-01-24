"use client";

import React from "react";
import Hero from "@/components/eventeco/home/Hero";
import IconCards from "@/components/eventeco/home/IconCards";
import CategoryCarousel from "@/components/eventeco/home/CategoryCarousel";
import { Category } from "@/types/Category";
import { Event } from "@/types/Event";
import styles from "../../../styles/eventeco/Home.module.css";

interface EventecoHomeClientProps {
    categories: Category[];
    events: Event[];
}

const EventecoHomeClient: React.FC<EventecoHomeClientProps> = ({ categories, events }) => {
    return (
        <div style={{ overflow: "hidden" }}>
            <Hero />
            <IconCards />
            <CategoryCarousel categories={categories} />
        </div>
    );
};

export default EventecoHomeClient;
