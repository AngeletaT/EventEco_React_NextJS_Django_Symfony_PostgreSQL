"use client";

import React from "react";
import { useAdoptions } from "@/hooks/pawnity/usePets";
import styles from "@/styles/pawnity/Organizer/DashboardPets.module.css";
import { Card } from "primereact/card";
import { Image } from "primereact/image";
import { FaHeart } from "react-icons/fa";

const Adoptions = ({ idOrg }: { idOrg: number }) => {
    const { data, isLoading, error } = useAdoptions(idOrg);

    if (isLoading) return <p className={styles.message}>🐾 Cargando adopciones... 🐾</p>;
    if (error) return <p className={styles.message}>⚠️ Error al cargar las adopciones. Intenta recargar la página.</p>;
    if (!data || !data.adoptions || data.adoptions.length === 0)
        return <p className={styles.message}>😿 No hay adopciones registradas.</p>;

    const adoptions = data.adoptions;

    return (
        <div className={styles.adoptionsContainer}>
            <h1 className={styles.adoptionsTitle}>🐶 Adopciones 🐶</h1>
            <div className={styles.adoptionsGrid}>
                {adoptions.map((adoption: any) => (
                    <Card
                        key={adoption.id}
                        title={`Adopción #${adoption.id}`}
                        className={styles.adoptionCard}
                    >
                        <div className={styles.cardContent}>
                            <div className={styles.imageBlock}>
                                <Image
                                    src={adoption.pet.image.replace("\\", "/")}
                                    alt={adoption.pet.name}
                                    width="100"
                                    height="100"
                                    imageStyle={{ borderRadius: "1rem", objectFit: "cover" }}
                                />
                                <p className={styles.imageLabel}>{adoption.pet.name}</p>
                            </div>

                            <div className={styles.heartBlock}>
                                <FaHeart className={styles.heartIcon} />
                            </div>

                            <div className={styles.imageBlock}>
                                <Image
                                    src={adoption.client.avatarUrl}
                                    alt={adoption.client.firstName}
                                    width="100"
                                    height="100"
                                    imageStyle={{ borderRadius: "50%", objectFit: "cover" }}
                                />
                                <p className={styles.imageLabel}>{adoption.client.firstName} {adoption.client.lastName}</p>
                            </div>
                        </div>

                        <div className={styles.contactInfo}>
                            <span className={styles.contactLabel}>📞 Contacto:</span>
                            <span className={styles.phone}>{adoption.client.phoneNumber}</span>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Adoptions;