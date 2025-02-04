"use client";

import { useParams } from "next/navigation";
import React from "react";

const CategoryPage: React.FC = () => {
    const params = useParams();
    const categoryName = params.categoryName;

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Eventos de la Categoría: {categoryName}</h1>
            <p>Mostrando eventos de la categoría seleccionada.</p>
        </div>
    );
};

export default CategoryPage;
