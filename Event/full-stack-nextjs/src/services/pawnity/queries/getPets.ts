import { djangoAPI_P, symfonyAPI_P } from "../../api";
import { Pet } from "@/types/pawnity/Pet";

export const getPets = async (): Promise<Pet[]> => {
    try {
        const response = await djangoAPI_P.get("/pets/listPets?page_size=40");
        const data = response.data as { results: Pet[] };
        const pets = data.results;
        console.log("Pets fetched:", pets);
        return pets;
    } catch (error) {
        console.error("Error fetching events:", error);
        throw new Error("Failed to fetch events.");
    }
};
