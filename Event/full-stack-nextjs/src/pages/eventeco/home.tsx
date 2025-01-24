import React, { useEffect, useState } from "react";
import { fetchCategories } from "@/services/eventeco/actions/getCategories";
import CategoryList from "@/components/shared/CategoryList";
import { Category } from "@/types/Category";

const EventecoHomePage: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const fetchedCategories = await fetchCategories();
                console.log(fetchedCategories);
                setCategories(fetchedCategories);
            } catch (err) {
                setError("Failed to fetch categories.");
            } finally {
                setLoading(false);
            }
        };

        loadCategories();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Bienvenido a EventEco</h1>
            <CategoryList categories={categories} />
        </div>
    );
};

export default EventecoHomePage;
