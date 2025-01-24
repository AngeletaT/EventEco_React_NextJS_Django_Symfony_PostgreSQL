import { djangoAPI } from "../../api";
import { Category } from "@/types/eventeco/Category";

export const fetchCategories = async (): Promise<Category[]> => {
    const response = await djangoAPI.get("/categories/");
    return response.data as Category[];
};
