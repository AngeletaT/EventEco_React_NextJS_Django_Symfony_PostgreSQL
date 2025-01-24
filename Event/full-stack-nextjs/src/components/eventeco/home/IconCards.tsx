"use client";

import React from "react";
import styles from "@/styles/eventeco/Home.module.css";
import { Card } from "@/utils/PrimeReactComponents";

const IconCards: React.FC = () => {
    const cards = [
        { icon: "pi pi-calendar", title: "Eventos Sostenibles", description: "Encuentra eventos alineados con tus valores ecológicos." },
        { icon: "pi pi-users", title: "Conexiones Únicas", description: "Conoce a personas con intereses similares en eventos eco-friendly." },
        { icon: "pi pi-globe", title: "Impacto Global", description: "Participa en iniciativas que apoyan un cambio positivo en el planeta." },
    ];

    return (
        <section className={styles.cards}>
            {cards.map((card, index) => (
                <Card key={index} className={styles.card}>
                    <div className={styles.cardHeader}>
                        <i className={`${card.icon} ${styles.icon}`} />
                        <h3>{card.title}</h3>
                    </div>
                    <div className={styles.cardContent}>
                        <p>{card.description}</p>
                    </div>
                </Card>
            ))}
        </section>
    );
};

export default IconCards;
