"use client";

import React from "react";
import styles from "@/styles/pawnity/Home.module.css";

const pets = [
    { id: 1, name: "Luna", age: "2 años", status: "Adopción", image: "/assets/p_logo/LogoPawnity.png" },
    { id: 2, name: "Max", age: "3 años", status: "Apadrinamiento", image: "/assets/p_logo/LogoPawnity.png" },
    { id: 3, name: "Bella", age: "1 año", status: "Adopción", image: "/assets/p_logo/LogoPawnity.png" },
    { id: 4, name: "Rocky", age: "4 años", status: "Adopción", image: "/assets/p_logo/LogoPawnity.png" },
];

const PetGallery: React.FC = () => {
    return (
        <section className={styles.petGallery}>
            <h2 className={styles.sectionTitle}>Conoce a las Mascotas</h2>
            <div className={styles.petGrid}>
                {pets.map((pet) => (
                    <div key={pet.id} className={styles.petCard}>
                        <img src={pet.image} alt={pet.name} className={styles.petImage} />
                        <h3>{pet.name}</h3>
                        <p>{pet.age}</p>
                        <p>{pet.status}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PetGallery;
