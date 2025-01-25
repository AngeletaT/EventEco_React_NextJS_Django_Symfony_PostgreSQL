"use client";

import React from "react";
import styles from "@/styles/eventeco/Footer.module.css";

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* About Section */}
                <div className={styles.about}>
                    <h4>Sobre EventEco</h4>
                    <p>Organizamos eventos sostenibles para un futuro mejor. Únete a nuestra misión eco-friendly.</p>
                </div>

                {/* Quick Links */}
                <div className={styles.links}>
                    <h4>Enlaces Rápidos</h4>
                    <ul>
                        <li>
                            <a href="/terms">Términos y Condiciones</a>
                        </li>
                        <li>
                            <a href="/privacy">Política de Privacidad</a>
                        </li>
                        <li>
                            <a href="/faq">Preguntas Frecuentes</a>
                        </li>
                    </ul>
                </div>

                {/* Social Media */}
                <div className={styles.social}>
                    <h4>Síguenos</h4>
                    <ul className={styles.icons}>
                        <li>
                            <a href="https://github.com/AngeletaT" target="_blank" rel="noreferrer">
                                <i className="pi pi-github"></i> Àngela Torró
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/AlvaroGarCam" target="_blank" rel="noreferrer">
                                <i className="pi pi-github"></i> Álvaro Garrido
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/CainMartinez" target="_blank" rel="noreferrer">
                                <i className="pi pi-github"></i> Caín Martínez
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={styles.copy}>
                <p>&copy; {new Date().getFullYear()} EventEco. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;
