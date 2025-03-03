import { djangoAPI_E, symfonyAPI_E } from "@/services/api";
import Cookies from "js-cookie";
import { Complement } from "@/types/Complement";

export const createComplement = async ({ eventSlug, complementData }: { eventSlug: string; complementData: Partial<Complement> }) => {
    try {
        const accesstoken = Cookies.get("accesstoken");
        if (!accesstoken) throw new Error("No access token available");

        const headers = { Authorization: `Bearer ${accesstoken}` };

        const response = await symfonyAPI_E.post(`/organizer/event/${eventSlug}/complement`, complementData, { headers });
        return response.data;
    } catch (error) {
        console.error("Error creating ticket:", error);
        throw new Error("Failed to create ticket.");
    }
};
