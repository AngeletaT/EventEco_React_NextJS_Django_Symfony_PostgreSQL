"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import styles from "@/styles/pawnity/Header.module.css";

const Header: React.FC = () => {
    const pathname = usePathname();
    const [visible, setVisible] = useState(false);
    const user = null;

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <a href="/pawnity/home">
                        <img src="/assets/p_logo/LogoPawnity_Img.png" alt="Pawnity Logo" />
                    </a>
                </div>

                {/* Botón de menú hamburguesa para pantallas pequeñas */}
                <button className={styles.menuButton} onClick={() => setVisible(!visible)}>
                    <GiHamburgerMenu size={24} />
                </button>

                {/* Menú para pantallas grandes */}
                <nav className={styles.nav}>
                    <a href="/pawnity/home" className={`${styles.link} ${pathname === "/pawnity/home" ? styles.active : ""}`}>
                        Home
                    </a>
                    <a href="/pawnity/events" className={`${styles.link} ${pathname === "/pawnity/events" ? styles.active : ""}`}>
                        Events
                    </a>
                    <a href="/pawnity/adoptions" className={`${styles.link} ${pathname === "/pawnity/adoptions" ? styles.active : ""}`}>
                        Adopciones
                    </a>
                    <a href="/pawnity/contact" className={`${styles.link} ${pathname === "/pawnity/contact" ? styles.active : ""}`}>
                        Contact
                    </a>
                </nav>

                <div className={styles.actions}>
                    {user ? (
                        <Button label="Cerrar Sesión" className="p-button-secondary" />
                    ) : (
                        <Button label="Iniciar Sesión" className="p-button-primary" />
                    )}
                </div>
            </div>

            {/* Sidebar para el menú en pantallas pequeñas */}
            <Sidebar visible={visible} onHide={() => setVisible(false)} className={styles.sidebar}>
                <nav className={styles.mobileNav}>
                    <a href="/pawnity/home" className={`${styles.link} ${pathname === "/pawnity/home" ? styles.active : ""}`}>
                        Home
                    </a>
                    <a href="/pawnity/events" className={`${styles.link} ${pathname === "/pawnity/events" ? styles.active : ""}`}>
                        Events
                    </a>
                    <a href="/pawnity/adoptions" className={`${styles.link} ${pathname === "/pawnity/adoptions" ? styles.active : ""}`}>
                        Adopciones
                    </a>
                    <a href="/pawnity/contact" className={`${styles.link} ${pathname === "/pawnity/contact" ? styles.active : ""}`}>
                        Contact
                    </a>
                    {user ? (
                        <Button label="Cerrar Sesión" className="p-button-secondary" />
                    ) : (
                        <Button label="Iniciar Sesión" className="p-button-primary" />
                    )}
                </nav>
            </Sidebar>
        </header>
    );
};

export default Header;
