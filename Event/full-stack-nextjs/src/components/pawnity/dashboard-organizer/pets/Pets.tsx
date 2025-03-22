import React from "react";
import { usePetsByOrganizer } from "@/hooks/pawnity/usePets";
import { Pet } from "@/types/pawnity/Pet";
import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import { InputSwitch } from "primereact/inputswitch";
import styles from "@/styles/pawnity/Organizer/DashboardPets.module.css";

const Pets = ({ idOrg }: { idOrg: number }) => {
    const { data, isLoading, error } = usePetsByOrganizer(idOrg);

    if (isLoading) return <p className={styles.message}>🐾 Cargando mascotas adorables... 🐾</p>;
    if (error) return <p className={styles.message}>⚠️ Error al cargar las mascotas. Intenta recargar la página.</p>;
    if (!data || !data.pets) return <p className={styles.message}>😿 No hay mascotas disponibles en este momento.</p>;

    const pets = data.pets;

    const getStatusSeverity = (status: string) => {
        switch (status) {
            case "available":
                return "success";
            case "sponsored":
                return "info";
            case "adopted":
                return "warning";
            default:
                return null;
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>🐾 Mascotas disponibles 🐾</h1>
            <div className={styles.headerActions}>
                <Button icon="pi pi-plus" label="Añadir mascota" className={styles.addButton} rounded />
            </div>
            <div className={styles.grid}>
                {pets.map((pet: Pet) => (
                    <Card
                        key={pet.uuid}
                        title={pet.name}
                        className={styles.card}
                        subTitle={`${pet.species} • ${pet.breed}`}
                        footer={
                            <div className={styles.cardFooter}>
                                <Tag value={pet.status} severity={getStatusSeverity(pet.status)} />
                                <div className={styles.actions}>
                                    <span className={styles.toggleWrapper}>
                                        <InputSwitch
                                            checked={pet.tempIsActive = pet.tempIsActive ?? pet.isActive}
                                            onChange={(e) => {
                                                pet.tempIsActive = !pet.tempIsActive;
                                            }}
                                        />
                                    </span>
                                    <Button icon="pi pi-refresh" label="Actualizar" className={styles.updateButton} rounded text />
                                </div>
                            </div>
                        }
                    >
                        <div className={styles.imageWrapper}>
                            <Image
                                src={pet.image.replace("\\", "/")}
                                alt={pet.name}
                                width="100%"
                                height="200px"
                                imageStyle={{ objectFit: "cover", borderRadius: "1rem" }}
                                preview
                            />
                        </div>
                        <p><strong>Género:</strong> {pet.gender}</p>
                        <p><strong>Fecha de nacimiento:</strong> {new Date(pet.birthDate).toLocaleDateString()}</p>
                        <p><strong>Descripción:</strong> {pet.description}</p>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Pets;