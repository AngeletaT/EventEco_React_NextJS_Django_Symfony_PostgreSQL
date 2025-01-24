"use client";

import React from "react";
import CategoryGrid from "@/components/shared/CategoryGrid";
import EventGrid from "@/components/shared/EventGrid";
import { Category } from "@/types/Category";
import { Event } from "@/types/Event";
import styles from "../../../styles/pawnity/Home.module.css";

interface PawnityHomeClientProps {
    categories: Category[];
    events: Event[];
}

const PawnityHomeClient: React.FC<PawnityHomeClientProps> = ({ categories, events }) => {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Descubre eventos sostenibles cerca de ti</h1>
                <p>Con Pawnity, los mejores eventos eco-friendly están a un clic.</p>
            </header>
            <main>
                <section className={styles.section}>
                    <h2>Categorías</h2>
                    <CategoryGrid categories={categories} />
                </section>
                <section className={styles.section}>
                    <h2>Eventos</h2>
                    <EventGrid events={events} />
                </section>
            </main>
        </div>
    );
};

export default PawnityHomeClient;
