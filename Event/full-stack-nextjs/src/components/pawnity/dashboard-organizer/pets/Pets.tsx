"use client";

import React, { use } from "react";
import styles from "@/styles/pawnity/DashboardPets.module.css";
import { usePetsByOrganizer } from "@/hooks/pawnity/usePets";
import { Pet } from "@/types/pawnity/Pet";

const Pets = ({ idOrg }: { idOrg: number }) => {
    const pets = usePetsByOrganizer(idOrg).data.pets;
    console.log(pets);
    return (
        <div style={{ color: "black" }}>
            <h1>Mascotas</h1>
            <ul>
                {pets.map((pet: Pet) => (
                    <li key={pet.uuid}>{pet.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Pets;
