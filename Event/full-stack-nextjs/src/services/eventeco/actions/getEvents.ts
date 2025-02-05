import { djangoAPI_E, symfonyAPI_E } from "../../api";
import { Event } from "@/types/Event";

export const fetchEvents = async (): Promise<Event[]> => {
    try {
        const response = await djangoAPI_E.get("/events/listAll");
        console.log("Events fetched:", response.data);
        return response.data as Event[];
    } catch (error) {
        console.error("Error fetching events:", error);
        throw new Error("Failed to fetch events.");
    }
};
