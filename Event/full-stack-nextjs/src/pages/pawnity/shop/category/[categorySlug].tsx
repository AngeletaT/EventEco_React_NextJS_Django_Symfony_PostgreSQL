"use client";

import { useParams } from "next/navigation";
import React from "react";

const CategoryPage: React.FC = () => {
    const params = useParams();
    const categorySlug = params.categorySlug;

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Eventos de la Categoría: {categorySlug}</h1>
            <p>Mostrando eventos de la categoría seleccionada.</p>
        </div>
    );
};

export default CategoryPage;
