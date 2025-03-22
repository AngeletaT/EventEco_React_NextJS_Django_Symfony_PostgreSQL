"use client";

import React from "react";
import { useAdoptions } from "@/hooks/pawnity/usePets";
import styles from "@/styles/pawnity/DashboardPets.module.css";

const Adoptions = ({ idOrg }: { idOrg: number }) => {
    const adoptions = useAdoptions(idOrg).data.adoptions;
    console.log(adoptions);
    return (
        <div style={{ color: "black" }}>
            <h1>Adopciones</h1>
            <ul></ul>
        </div>
    );
};

export default Adoptions;
