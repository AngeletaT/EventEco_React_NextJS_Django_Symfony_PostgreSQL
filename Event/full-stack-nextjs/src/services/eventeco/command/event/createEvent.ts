import { djangoAPI_E, symfonyAPI_E } from "@/services/api";
import Cookies from "js-cookie";
import { Event } from "@/types/Event";

export const createEvent = async (eventData: Partial<Event>): Promise<Event> => {
    try {
        const accesstoken = Cookies.get("accesstoken");
        if (!accesstoken) throw new Error("No access token available");

        const headers = { Authorization: `Bearer ${accesstoken}` };

        const response = await symfonyAPI_E.post("/organizer/event", eventData, { headers });
        return response.data as Event;
    } catch (error) {
        console.error("Error creating event:", error);
        throw new Error("Failed to create event.");
    }
};
