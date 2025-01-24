"use client";

import React from "react";
import { Category } from "@/types/Category";

interface CategoryListProps {
    categories: Category[];
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
    return (
        <ul>
            {categories.map((category) => (
                <li key={category.idcategory}>{category.categoryname}</li>
            ))}
        </ul>
    );
};

export default CategoryList;
