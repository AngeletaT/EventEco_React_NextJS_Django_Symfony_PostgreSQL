import { djangoAPI_E, symfonyAPI_E } from "../../api";
import { Category } from "@/types/Category";

export const getCategories = async (): Promise<Category[]> => {
    try {
        console.log("Fetching categories...");
        const response = await djangoAPI_E.get("/categories/listAll/");
        return response.data as Category[];
    } catch (error) {
        return [];
        console.error("Error fetching categories:", error);
        throw new Error("Failed to fetch categories.");
    }
};
