"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Button } from "primereact/button";
import styles from "@/styles/pawnity/Header.module.css";

const Header: React.FC = () => {
    const pathname = usePathname();
    const user = null;

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <a href="/pawnity/home">
                        <img src="/assets/p_logo/LogoPawnity_Img.png" alt="Pawnity Logo" />
                    </a>
                </div>
                <nav className={styles.nav}>
                    <a href="/pawnity/home" className={`${styles.link} ${pathname === "/pawnity/home" ? styles.active : ""}`}>
                        Inicio
                    </a>
                    <a href="/pawnity/events" className={`${styles.link} ${pathname === "/pawnity/events" ? styles.active : ""}`}>
                        Eventos
                    </a>
                    <a href="/pawnity/adoptions" className={`${styles.link} ${pathname === "/pawnity/adoptions" ? styles.active : ""}`}>
                        Adopciones
                    </a>
                    <a href="/pawnity/contact" className={`${styles.link} ${pathname === "/pawnity/contact" ? styles.active : ""}`}>
                        Contacto
                    </a>
                </nav>
                <div className={styles.actions}>
                    {user ? (
                        <Button label="Cerrar Sesión" className="p-button-error" />
                    ) : (
                        <Button label="Iniciar Sesión" className="p-button-primary" />
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
