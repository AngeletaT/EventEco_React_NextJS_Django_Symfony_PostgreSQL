"use client";

import React from "react";
import { Card } from "@/utils/PrimeReactComponents";
import { Category } from "@/types/Category";
import styles from "../../styles/eventeco/Home.module.css";

interface CategoryGridProps {
    categories: Category[];
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ categories }) => {
    return (
        <div className={styles.grid}>
            {categories.map((category) => (
                <Card key={category.idcategory} title={category.categoryname} className="p-shadow-2">
                    <p>Explora eventos relacionados con {category.categoryname}.</p>
                </Card>
            ))}
        </div>
    );
};

export default CategoryGrid;
