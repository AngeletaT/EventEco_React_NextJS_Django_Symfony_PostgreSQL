import { djangoAPI_E, symfonyAPI_E } from "@/services/api";
import Cookies from "js-cookie";
import { Subevent } from "@/types/Subevent";

export const updateSubevent = async ({ idsubevents, subeventData }: { idsubevents: number; subeventData: Object }) => {
    try {
        const accesstoken = Cookies.get("accesstoken");
        if (!accesstoken) throw new Error("No access token available");

        const headers = { Authorization: `Bearer ${accesstoken}` };

        const response = await symfonyAPI_E.put(`organizer/subevent/${idsubevents}`, subeventData, { headers });
        return response.data;
    } catch (error) {
        console.error("Error creating subevent:", error);
        throw new Error("Failed to create subevent.");
    }
};

export const toggleSubevent = async ({ idsubevents }: { idsubevents: number }) => {
    try {
        const accesstoken = Cookies.get("accesstoken");
        if (!accesstoken) throw new Error("No access token available");

        const headers = { Authorization: `Bearer ${accesstoken}` };

        const response = await symfonyAPI_E.post(`organizer/subevent/${idsubevents}`, {}, { headers });
        return response.data;
    } catch (error) {
        console.error("Error toggling Subevent:", error);
        throw new Error("Failed to toggle Subevent.");
    }
};
