import React from "react";
import Header from "@/layouts/eventeco/header/Header";
import Footer from "@/layouts/eventeco/footer/Footer";

const EventecoLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <Header />
            <main style={{ paddingTop: "80px", paddingBottom: "80px", overflow: "hidden" }}>{children}</main>
            <Footer />
        </>
    );
};

export default EventecoLayout;
