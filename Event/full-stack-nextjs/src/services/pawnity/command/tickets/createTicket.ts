import { djangoAPI_P, symfonyAPI_P } from "@/services/api";
import Cookies from "js-cookie";
import { Ticket } from "@/types/Ticket";

export const createTicket = async ({ eventSlug, ticketData }: { eventSlug: string; ticketData: Partial<Ticket> }) => {
    console.log("Creating ticket:", ticketData);
    try {
        const accesstoken = Cookies.get("accesstoken");
        if (!accesstoken) throw new Error("No access token available");

        const headers = { Authorization: `Bearer ${accesstoken}` };

        const response = await symfonyAPI_P.post(`/organizer/event/${eventSlug}/ticketinfo`, ticketData, { headers });
        return response.data;
    } catch (error) {
        console.error("Error creating ticket:", error);
        throw new Error("Failed to create ticket.");
    }
};
