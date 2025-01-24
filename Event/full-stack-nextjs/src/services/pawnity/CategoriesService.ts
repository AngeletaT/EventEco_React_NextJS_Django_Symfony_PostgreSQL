import { djangoAPI, symfonyAPI } from "../api";

export const fetchCategories = async () => {
    const response = await djangoAPI.get("/categories/");
    return response.data;
};
