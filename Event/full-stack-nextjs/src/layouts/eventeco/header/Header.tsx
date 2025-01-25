"use client";

import React from "react";
import { Button } from "primereact/button";
import styles from "@/styles/eventeco/Header.module.css";

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                {/* Logo */}
                <div className={styles.logo}>
                    <a href="/">
                        <img src="/assets/e_logo/LogoEventEco_Img.png" alt="EventEco Logo" />
                    </a>
                </div>

                {/* Navigation Menu */}
                <nav className={styles.nav}>
                    <a href="/eventeco/home" className={styles.link}>
                        Inicio
                    </a>
                    <a href="/eventeco/events" className={styles.link}>
                        Eventos
                    </a>
                    <a href="/eventeco/about" className={styles.link}>
                        Sobre Nosotros
                    </a>
                    <a href="/eventeco/contact" className={styles.link}>
                        Contacto
                    </a>
                </nav>

                {/* Right Section */}
                <div className={styles.actions}>
                    <Button label="Iniciar Sesión" className="p-button-outlined p-button-success" />
                </div>
            </div>
        </header>
    );
};

export default Header;
