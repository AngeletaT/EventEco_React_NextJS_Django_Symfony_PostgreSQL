import { djangoAPI_P, symfonyAPI_P } from "../../api";
import { Organizer } from "@/types/Organizer";

export const getOrganizers = async (): Promise<Organizer[]> => {
    try {
        const response = await djangoAPI_P.get("organizers/listAll");
        return response.data as Organizer[];
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw new Error("Failed to fetch categories.");
    }
};
