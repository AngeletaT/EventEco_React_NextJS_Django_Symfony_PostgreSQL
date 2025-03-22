"use client";

import React from "react";
import { useSuscriptions } from "@/hooks/pawnity/usePets";
import styles from "@/styles/pawnity/Organizer/DashboardPets.module.css";
import { Card } from "primereact/card";
import { Image } from "primereact/image";
import { FaEuroSign } from "react-icons/fa";

const Suscriptions = ({ idOrg }: { idOrg: number }) => {
    const { data, isLoading, error } = useSuscriptions(idOrg);

    if (isLoading) return <p className={styles.message}>🐾 Cargando apadrinamientos... 🐾</p>;
    if (error) return <p className={styles.message}>⚠️ Error al cargar las suscripciones. Intenta recargar la página.</p>;
    if (!data || !data.sponsorships || data.sponsorships.length === 0)
        return <p className={styles.message}>😿 No hay apadrinamientos registrados.</p>;

    const suscriptions = data.sponsorships;

    const getRandomAmount = () => {
        const amounts = [5, 10, 25];
        return amounts[Math.floor(Math.random() * amounts.length)];
    };

    const generateEmail = (firstName: string, lastName: string) => {
        const clean = (str: string) =>
            str
                .normalize("NFD") // Descompone letras acentuadas en base + tilde
                .replace(/[\u0300-\u036f]/g, "") // Elimina los signos diacríticos (tildes, diéresis...)
                .toLowerCase()
                .replace(/[^a-z]/g, ""); // Elimina cualquier otro carácter no alfabético

        return `${clean(firstName)}.${clean(lastName)}@gmail.com`;
    };

    return (
        <div className={styles.adoptionsContainer}>
            <h1 className={styles.adoptionsTitle}>🌟 Apadrinamientos 🌟</h1>
            <div className={styles.adoptionsGrid}>
                {suscriptions.map((sponsorship: any) => {
                    const monthlyAmount = getRandomAmount();
                    const email = generateEmail(sponsorship.client.firstName, sponsorship.client.lastName);

                    return (
                        <Card
                            key={sponsorship.id}
                            title={`Apadrinamiento #${sponsorship.id}`}
                            className={styles.adoptionCard}
                        >
                            <div className={styles.cardContent}>
                                <div className={styles.imageBlock}>
                                    <Image
                                        src={sponsorship.pet.image.replace("\\", "/")}
                                        alt={sponsorship.pet.name}
                                        width="120"
                                        height="120"
                                        imageStyle={{ borderRadius: "1rem", objectFit: "cover" }}
                                    />
                                    <p className={styles.imageLabel}>{sponsorship.pet.name}</p>
                                </div>

                                <div className={styles.heartBlock}>
                                    <FaEuroSign className={styles.euroIcon} />
                                </div>

                                <div className={styles.imageBlock}>
                                    <Image
                                        src={sponsorship.client.avatarUrl}
                                        alt={sponsorship.client.firstName}
                                        width="120"
                                        height="120"
                                        imageStyle={{ borderRadius: "50%", objectFit: "cover" }}
                                    />
                                    <p className={styles.imageLabel}>{sponsorship.client.firstName} {sponsorship.client.lastName}</p>
                                </div>
                            </div>

                            <div className={styles.contactInfo}>
                                <span className={styles.contactLabel}>📧 Email:</span>
                                <span className={styles.phone}>{email}</span>
                            </div>
                            <div className={styles.contactInfo}>
                                <span className={styles.contactLabel}>💰 Aportación mensual:</span>
                                <span className={styles.phone}>{monthlyAmount} €/mes</span>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default Suscriptions;