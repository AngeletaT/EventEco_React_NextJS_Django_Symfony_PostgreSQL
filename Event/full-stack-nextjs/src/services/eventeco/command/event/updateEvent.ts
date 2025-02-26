import { djangoAPI_E, symfonyAPI_E } from "@/services/api";
import { Event } from "@/types/Event";

export const updateEvent = async (id: number, data: Partial<Event>): Promise<Event> => {
    try {
        const accesstoken = Cookies.get("accesstoken");
        if (!accesstoken) throw new Error("No access token available");

        const headers = { Authorization: `Bearer ${accesstoken}` };

        const response = await symfonyAPI_E.put(`/organizer/event/${id}`, data, { headers });
        return response.data as Event;
    } catch (error) {
        console.error("Error updating event:", error);
        throw new Error("Failed to update event.");
    }
};

export const toggleEventStatusActive = async (id: number) => {
    try {
        const accesstoken = Cookies.get("accesstoken");
        if (!accesstoken) throw new Error("No access token available");

        const headers = { Authorization: `Bearer ${accesstoken}` };
        const response = await symfonyAPI_E.post(`/organizer/event/${id}/active`, {}, { headers });

        return response.data;
    } catch (error) {
        console.error("Error toggling event:", error);
        throw new Error("Failed to toggle event.");
    }
};
