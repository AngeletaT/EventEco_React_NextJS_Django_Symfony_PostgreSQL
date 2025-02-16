import React from "react";
import Header from "@/layouts/eventeco/header/Header";
import Footer from "@/layouts/eventeco/footer/Footer";
import styles from "@/styles/eventeco/Header.module.css";

const EventecoLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className={styles.pageContainer}>
            <Header />
            <main style={{ paddingTop: "80px", paddingBottom: "80px", overflow: "hidden" }}>{children}</main>
            <Footer />
        </div>
    );
};

export default EventecoLayout;
