import { djangoAPI_E, symfonyAPI_E } from "@/services/api";
import Cookies from "js-cookie";
import { Complement } from "@/types/Complement";

export const updateComplement = async ({ idComplement, complementData }: { idComplement: number; complementData: Partial<Complement> }) => {
    try {
        const accesstoken = Cookies.get("accesstoken");
        if (!accesstoken) throw new Error("No access token available");

        const headers = { Authorization: `Bearer ${accesstoken}` };

        const response = await symfonyAPI_E.put(`/organizer/complement/${idComplement}`, complementData, { headers });
        return response.data;
    } catch (error) {
        console.error("Error updating Complement:", error);
        throw new Error("Failed to update Complement.");
    }
};

export const toggleComplement = async ({ idComplement, complementData }: { idComplement: number; complementData: Partial<Complement> }) => {
    try {
        const accesstoken = Cookies.get("accesstoken");
        if (!accesstoken) throw new Error("No access token available");

        const headers = { Authorization: `Bearer ${accesstoken}` };

        const response = await symfonyAPI_E.post(`/organizer/complement/${idComplement}`, {}, { headers });
        return response.data;
    } catch (error) {
        console.error("Error toggling Complement:", error);
        throw new Error("Failed to toggle Complement.");
    }
};
