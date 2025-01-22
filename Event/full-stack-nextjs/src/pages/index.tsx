import React from "react";
import ButtonLink from "@/components/shared/ButtonLink";
import styles from "@/styles/WebPage.module.css";

const WebPage: React.FC = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Bienvenido a nuestras plataformas</h1>
            <div className={styles.buttons}>
                <ButtonLink label="Pawnity" href="/pawnity/home" styleClass="p-button-primary" />
                <ButtonLink label="EventEco" href="/eventeco/home" styleClass="p-button-success" />
            </div>
        </div>
    );
};

export default WebPage;
