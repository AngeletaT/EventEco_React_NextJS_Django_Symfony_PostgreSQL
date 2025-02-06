"use client";

import React from "react";
import { useEffect } from "react";
import { Pet } from "@/types/pawnity/Pet";
import styles from "@/styles/pawnity/Home.module.css";

interface PetGalleryProps {
    pets: Pet[];
}

const PetGallery: React.FC<PetGalleryProps> = ({ pets }) => {
    useEffect(() => {
        const shuffled = [...pets].sort(() => 0.5 - Math.random());
        setPetGallery(shuffled.slice(0, 4));
    }, [pets]);

    const [petGallery, setPetGallery] = React.useState<Pet[]>([]);
    const calculateAge = (birthdate: string) => {
        const today = new Date();
        const birthdateDate = new Date(birthdate);
        const age = today.getFullYear() - birthdateDate.getFullYear();
        const month = today.getMonth() - birthdateDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthdateDate.getDate())) {
            return age - 1;
        }
        return age;
    };

    return (
        <section className={styles.petGallery}>
            <h2>Conoce a las Mascotas</h2>
            <div className={styles.petGrid}>
                {petGallery.map((pet) => (
                    <div key={pet.idpet} className={styles.petCard}>
                        <img src={pet.image || "/assets/p_logo/LogoPawnity_Img.png"} alt={pet.name} className={styles.petImage} />
                        <h3>{pet.name}</h3>
                        <p>
                            {pet.species} - {pet.breed}
                        </p>
                        <p>{calculateAge(pet.birthdate)} años</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PetGallery;
