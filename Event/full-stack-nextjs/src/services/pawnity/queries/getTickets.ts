import { djangoAPI_P, symfonyAPI_P } from "@/services/api";
import Cookies from "js-cookie";
import { Ticket } from "@/types/Ticket";

export const getTickets = async (eventslug: string): Promise<Ticket[]> => {
    try {
        const accesstoken = Cookies.get("accesstoken");
        if (!accesstoken) throw new Error("No access token available");

        const headers = { Authorization: `Bearer ${accesstoken}` };

        const response = await symfonyAPI_P.get(`/event/${eventslug}/ticketinfo`, { headers });
        return response.data as Ticket[];
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw new Error("Failed to fetch categories.");
    }
};
