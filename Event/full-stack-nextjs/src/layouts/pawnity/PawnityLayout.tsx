import React from "react";
import Header from "@/layouts/pawnity/header/Header";
import Footer from "@/layouts/pawnity/footer/Footer";
import styles from "@/styles/pawnity/Header.module.css";

const PawnityLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className={styles.pageContainer}>
            <Header />
            <main style={{ paddingTop: "80px", paddingBottom: "80px", overflow: "hidden" }}>{children}</main>
            <Footer />
        </div>
    );
};

export default PawnityLayout;
