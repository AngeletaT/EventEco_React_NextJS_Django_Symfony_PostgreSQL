"use client";

import React from "react";
import { Button } from "primereact/button";
import styles from "@/styles/pawnity/Header.module.css";

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                {/* Logo */}
                <div className={styles.logo}>
                    <a href="/">
                        <img src="/assets/p_logo/LogoPawnity_Img.png" alt="Pawnity Logo" />
                    </a>
                </div>

                {/* Navigation Menu */}
                <nav className={styles.nav}>
                    <a href="/" className={styles.link}>
                        Inicio
                    </a>
                    <a href="/pawnity/events" className={styles.link}>
                        Eventos
                    </a>
                    <a href="/pawnity/adoptions" className={styles.link}>
                        Adopciones
                    </a>
                    <a href="/pawnity/about" className={styles.link}>
                        Sobre Nosotros
                    </a>
                    <a href="/pawnity/contact" className={styles.link}>
                        Contacto
                    </a>
                </nav>

                {/* Right Section */}
                <div className={styles.actions}>
                    <Button label="Iniciar Sesión" className="p-button-primary" />
                </div>
            </div>
        </header>
    );
};

export default Header;
