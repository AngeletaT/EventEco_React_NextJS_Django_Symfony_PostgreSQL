"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import styles from "@/styles/eventeco/Header.module.css";

const Header: React.FC = () => {
    const pathname = usePathname();
    const [visible, setVisible] = useState(false);
    const user = null;

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <a href="/eventeco/home">
                        <img src="/assets/e_logo/LogoEventEco_Img.png" alt="EventEco Logo" />
                    </a>
                </div>

                {/* Botón de menú hamburguesa para pantallas pequeñas */}
                <button className={styles.menuButton} onClick={() => setVisible(!visible)}>
                    <GiHamburgerMenu size={24} />
                </button>

                {/* Menú para pantallas grandes */}
                <nav className={styles.nav}>
                    <a href="/eventeco/home" className={`${styles.link} ${pathname === "/eventeco/home" ? styles.active : ""}`}>
                        Inicio
                    </a>
                    <a href="/eventeco/shop" className={`${styles.link} ${pathname === "/eventeco/shop" ? styles.active : ""}`}>
                        Eventos
                    </a>
                    <a href="/eventeco/contact" className={`${styles.link} ${pathname === "/eventeco/contact" ? styles.active : ""}`}>
                        Contacto
                    </a>
                </nav>

                <div className={styles.actions}>
                    {user ? (
                        <Button label="Cerrar Sesión" className="p-button-error" />
                    ) : (
                        <Button label="Iniciar Sesión" className="p-button-success" />
                    )}
                </div>
            </div>

            {/* Sidebar para el menú en pantallas pequeñas */}
            <Sidebar visible={visible} onHide={() => setVisible(false)} className={styles.sidebar}>
                <nav className={styles.mobileNav}>
                    <a href="/eventeco/home" className={`${styles.link} ${pathname === "/eventeco/home" ? styles.active : ""}`}>
                        Inicio
                    </a>
                    <a href="/eventeco/shop" className={`${styles.link} ${pathname === "/eventeco/shop" ? styles.active : ""}`}>
                        Eventos
                    </a>
                    <a href="/eventeco/contact" className={`${styles.link} ${pathname === "/eventeco/contact" ? styles.active : ""}`}>
                        Contacto
                    </a>
                    {user ? (
                        <Button label="Cerrar Sesión" className="p-button-error" />
                    ) : (
                        <Button label="Iniciar Sesión" className="p-button-success" />
                    )}
                </nav>
            </Sidebar>
        </header>
    );
};

export default Header;
