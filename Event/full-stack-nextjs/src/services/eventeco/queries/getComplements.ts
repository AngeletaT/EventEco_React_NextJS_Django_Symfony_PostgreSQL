import { djangoAPI_E, symfonyAPI_E } from "@/services/api";
import Cookies from "js-cookie";
import { Complement } from "@/types/Complement";

export const getComplements = async (eventSlug: string): Promise<Complement[]> => {
    try {
        const accesstoken = Cookies.get("accesstoken");
        if (!accesstoken) throw new Error("No access token available");

        const headers = { Authorization: `Bearer ${accesstoken}` };

        const response = await symfonyAPI_E.get(`/event/${eventSlug}/complement`, { headers });
        return response.data as Complement[];
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw new Error("Failed to fetch categories.");
    }
};
