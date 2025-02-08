"use client";

import React from "react";
import { Dropdown } from "@/utils/PrimeReactComponents";
import { Button } from "@/utils/PrimeReactComponents";
import styles from "@/styles/eventeco/Shop.module.css";
import type { FiltersProps } from "@/types/eventeco/Shop";

const Filters: React.FC<FiltersProps> = ({
    pageSize,
    setPageSize,
    categorySlug,
    setCategorySlug,
    location,
    setLocation,
    orderByDate,
    setOrderByDate,
    categories,
    resetFilters,
}) => {
    const pageSizeOptions = [5, 12, 25];
    const orderOptions = [
        { label: "Fecha Ascendente", value: "asc" },
        { label: "Fecha Descendente", value: "desc" },
    ];

    const locationOptions = ["Madrid", "Barcelona", "Valencia", "Sevilla", "Bilbao"];

    return (
        <div className={styles.filtersContainer}>
            {/* Filtro por Categoría */}
            <Dropdown
                value={categorySlug}
                options={categories.map((cat) => ({ label: cat.categoryname, value: cat.categoryslug }))}
                onChange={(e) => setCategorySlug(e.value)}
                placeholder="Seleccionar Categoría"
                className={styles.dropdown}
            />

            {/* Filtro por Localización */}
            <Dropdown
                value={location}
                options={locationOptions.map((loc) => ({ label: loc, value: loc }))}
                onChange={(e) => setLocation(e.value)}
                placeholder="Seleccionar Localización"
                className={styles.dropdown}
            />

            {/* Orden por Fecha */}
            <Dropdown
                value={orderByDate}
                options={orderOptions}
                onChange={(e) => setOrderByDate(e.value)}
                placeholder="Ordenar por Fecha"
                className={styles.dropdown}
            />

            {/* Ítems por Página */}
            <Dropdown
                value={pageSize}
                options={pageSizeOptions.map((size) => ({ label: `${size} por página`, value: size }))}
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
