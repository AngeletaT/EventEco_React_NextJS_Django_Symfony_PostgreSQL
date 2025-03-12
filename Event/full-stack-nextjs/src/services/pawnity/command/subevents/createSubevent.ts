import { djangoAPI_P, symfonyAPI_P } from "@/services/api";
import Cookies from "js-cookie";
import { Subevent } from "@/types/Subevent";

export const createSubevent = async ({ idevent, subeventData }: { idevent: number; subeventData: Object }) => {
    try {
        const accesstoken = Cookies.get("accesstoken");
        if (!accesstoken) throw new Error("No access token available");

        const headers = { Authorization: `Bearer ${accesstoken}` };

        const response = await symfonyAPI_P.post(`organizer/event/${idevent}/subevent`, subeventData, { headers });
        return response.data;
    } catch (error) {
        console.error("Error creating ticket:", error);
        throw new Error("Failed to create ticket.");
    }
};
