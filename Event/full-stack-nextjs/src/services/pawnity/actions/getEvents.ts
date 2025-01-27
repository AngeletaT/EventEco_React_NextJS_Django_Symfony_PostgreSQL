import { djangoAPI_P, symfonyAPI_P } from "../../api";
import { Event } from "@/types/Event";

export const fetchEvents = async (): Promise<Event[]> => {
    try {
        const response = await djangoAPI_P.get("/events/listAll");
        console.log("fetchEvents response.data:", response.data);
        return response.data as Event[];
    } catch (error) {
        return [];
        console.error("Error fetching events:", error);
        throw new Error("Failed to fetch events.");
    }
};
