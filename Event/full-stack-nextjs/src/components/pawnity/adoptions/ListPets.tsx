"use client";

import React from "react";
import styles from "@/styles/pawnity/Pets.module.css";
import { Button } from "@/utils/PrimeReactComponents";
import { Pet } from "@/types/pawnity/Pet";

interface ListPetsProps {
    pets: Pet[];
}

const ListPets: React.FC<ListPetsProps> = ({ pets }) => {
    return (
        <section className={styles.ShopSection}>
            <h2>Descubre nuestras Mascotas</h2>
            <div className={styles.petgrid}>
                {pets.map((pet: Pet) => (
                    <div key={pet.idpet} className={styles.petcard}>
                        <img src={pet.image} alt={pet.name} className={styles.petimage} />
                        <div className={styles.petdetails}>
                            <h3>{pet.name}</h3>
                            <p>{pet.description}</p>
                            <p>
                                <i className={`pi ${pet.gender.toLowerCase() === "macho" ? "pi-mars" : "pi-venus"}`}></i>{" "}
                                {pet.gender.charAt(0).toUpperCase() + pet.gender.slice(1)}
                            </p>
                            <p>
                                <i className="pi pi-tag"></i> {pet.breed}
                            </p>
                            <p>
                                <i className="pi pi-calendar"></i>{" "}
                                {new Date(pet.birthdate).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}
                            </p>
                        </div>
                        {/* <Button
                            label="Ver más"
                            onClick={() => (window.location.href = `/pawnity/shop/pet/${pet.name}`)}
                            className={`p-button-info ${styles.petbutton}`}
                        /> */}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ListPets;
