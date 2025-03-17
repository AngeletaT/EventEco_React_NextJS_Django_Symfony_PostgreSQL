"use client";

import React from "react";
import { Dropdown } from "@/utils/PrimeReactComponents";
import { Button } from "@/utils/PrimeReactComponents";
import styles from "@/styles/pawnity/Shop.module.css";
import type { FiltersProps } from "@/types/pawnity/Adoptions";

const Filters: React.FC<FiltersProps> = ({
    pageSize,
    setPageSize,
    gender,
    setGender,
    idorg,
    setidOrganizer,
    species,
    setSpecies,
    organizers,
    resetFilters,
}) => {
    const pageSizeOptions = [5, 40];
    const genderOptions = [
        { label: "Macho", value: "macho" },
        { label: "Hembra", value: "hembra" },
    ];

    const speciesOptions = [
        { label: "Perro", value: "perro" },
        { label: "Gato", value: "gato" },
    ];

    return (
        <div className={styles.filtersContainer}>
            {/* Filtro por Organizacion */}
            <Dropdown
                value={idorg}
                options={organizers.map((org) => ({ label: org.name, value: org.idorg }))}
                onChange={(e) => setidOrganizer(e.value)}
                placeholder="Seleccionar protectora"
                className={styles.dropdown}
            />

            {/* Filtro por Genero */}
            <Dropdown
                value={gender}
                options={genderOptions}
                onChange={(e) => setGender(e.value)}
                placeholder="Seleccionar Género"
                className={styles.dropdown}
            />

            {/* Filtro por Especie */}
            <Dropdown
                value={species}
                options={speciesOptions}
                onChange={(e) => setSpecies(e.value)}
                placeholder="Seleccionar Especie"
                className={styles.dropdown}
            />

            {/* Ítems por Página */}
            <Dropdown
                value={pageSize}
                options={pageSizeOptions.map((size) => ({ label: size === 40 ? "Ver Todo" : `${size} por página`, value: size }))}
                onChange={(e) => setPageSize(e.value)}
                placeholder="Ítems por página"
                className={styles.dropdown}
            />

            {/* Botón para Borrar Filtros */}
            <Button label="Borrar Filtros" icon="pi pi-filter-slash" className="p-button-danger" onClick={resetFilters} />
        </div>
    );
};

export default Filters;
