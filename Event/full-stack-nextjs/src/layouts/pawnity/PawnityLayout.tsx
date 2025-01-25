import React from "react";
import Header from "@/layouts/pawnity/header/Header";
import Footer from "@/layouts/pawnity/footer/Footer";

const PawnityLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <Header />
            <main style={{ paddingTop: "80px", paddingBottom: "80px", overflow: "hidden" }}>{children}</main>
            <Footer />
        </>
    );
};

export default PawnityLayout;
