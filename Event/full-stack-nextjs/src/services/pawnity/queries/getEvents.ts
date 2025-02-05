import { djangoAPI_P, symfonyAPI_P } from "../../api";
import { Event } from "@/types/Event";

export const getEvents = async (): Promise<Event[]> => {
    try {
        const response = await djangoAPI_P.get("/events/listEvents?page_size=25");
        const data = response.data as { results: Event[] };
        const events = data.results;
        return events;
    } catch (error) {
        console.error("Error fetching events:", error);
        throw new Error("Failed to fetch events.");
    }
};
