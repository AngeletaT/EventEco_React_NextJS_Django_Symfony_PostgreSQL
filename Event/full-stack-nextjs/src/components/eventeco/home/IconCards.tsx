"use client";

import React from "react";
import styles from "@/styles/eventeco/Home.module.css";
import { Card } from "@/utils/PrimeReactComponents";

const IconCards: React.FC = () => {
    const cards = [
        {
            icon: "pi pi-sun",
            title: "Energia propia",
            description: "Nuestros eventos utilizan infraestructuras alimentadas con energía 100% renovable.",
        },
        {
            icon: "pi pi-car",
            title: "Movilidad Compartida",
            description: "Ofrecemos transporte en autobús compartido para reducir emisiones y facilitar el acceso.",
        },
        {
            icon: "pi pi-ticket",
            title: "Entradas Digitales",
            description: "Accede a todos tus eventos desde la app sin imprimir, de forma segura y ecológica.",
        },
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
