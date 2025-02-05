"use client";

import React from "react";
import styles from "@/styles/eventeco/Home.module.css";
import { Button } from "@/utils/PrimeReactComponents";

const Hero: React.FC = () => {
    return (
        <section className={styles.hero}>
            <video className={styles.video} autoPlay loop muted>
                <source src="\assets\e_video\heroVideo.mp4" type="video/mp4" />
                Tu navegador no soporta el video de fondo.
            </video>
            <div className={styles.overlay}>
                <h1 className={styles.slogan}>Donde la música y la sostenibilidad se encuentran</h1>
                <p className={styles.subtitle}>Música, deporte, cultura y mucho más</p>
                <Button label="Explorar Eventos" className="p-button-success" onClick={() => (window.location.href = "/eventeco/shop")} />
            </div>
        </section>
    );
};

export default Hero;
