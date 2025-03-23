"use client";

import React from "react";
import styles from "@/styles/eventeco/Footer.module.css";

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <nav className={styles.nav}>
                    <a href="https://github.com/AngeletaT" className={styles.link}>
                        <i className="pi pi-github"></i> Àngela Torró
                    </a>
                    {/* <a href="https://github.com/AlvaroGarCam" className={styles.link}>
                        <i className="pi pi-github"></i> Álvaro Garrido
                    </a>
                    <a href="https://github.com/CainMartinez" className={styles.link}>
                        <i className="pi pi-github"></i> Caín Martínez
                    </a> */}
                </nav>
            </div>
            <div className={styles.copy}>&copy; {new Date().getFullYear()} EventEco. Todos los derechos reservados.</div>
        </footer>
    );
};

export default Footer;
