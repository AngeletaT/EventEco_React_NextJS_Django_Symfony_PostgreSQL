"use client";

import React from "react";
import { useSuscriptions } from "@/hooks/pawnity/usePets";
import styles from "@/styles/pawnity/DashboardPets.module.css";

const Suscriptions = ({ idOrg }: { idOrg: number }) => {
    const suscriptions = useSuscriptions(idOrg).data.sponsorships;
    console.log(suscriptions);
    return (
        <div style={{ color: "black" }}>
            <h1>Suscripciones</h1>
            <ul></ul>
        </div>
    );
};

export default Suscriptions;
