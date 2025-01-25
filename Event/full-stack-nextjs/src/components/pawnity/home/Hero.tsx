"use client";

import React from "react";
import { Button, InputText } from "@/utils/PrimeReactComponents";
import styles from "@/styles/pawnity/Home.module.css";

const Hero: React.FC = () => {
    return (
        <section className={styles.hero}>
            <img src="/assets/p_img/hero_Pawnity.webp" alt="Mascotas felices" className={styles.background} />
            <div className={styles.overlay}>
                <h1 className={styles.title}>Haz la Diferencia, Adopta una Vida</h1>
                <p className={styles.subtitle}>Explora eventos que promueven la adopción y el apadrinamiento de mascotas.</p>
                <div className={`p-inputgroup ${styles.search}`}>
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-search"></i>
                    </span>
                    <InputText placeholder="Encuentra tu ciudad" />
                </div>
                <Button label="Explorar Eventos" className="p-button-primary" />
            </div>
        </section>
    );
};

export default Hero;
