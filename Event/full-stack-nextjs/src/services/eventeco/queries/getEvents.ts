import { djangoAPI_E, symfonyAPI_E } from "../../api";
import { Event } from "@/types/Event";

export const getEvents = async (): Promise<Event[]> => {
    try {
        const response = await djangoAPI_E.get("/events/listEvents?page_size=25");
        const data = response.data as { results: Event[] };
        const events = data.results;
        return events;
    } catch (error) {
        console.error("Error fetching events:", error);
        throw new Error("Failed to fetch events.");
    }
};

export const getEventsPerPage = async ({
    pageParam = 1,
    pageSize = 5,
}: {
    pageParam?: number;
    pageSize?: number;
}): Promise<{ events: Event[]; count: number; nextPage: number | null; previousPage: number | null }> => {
    try {
        console.log("pageParam:", pageParam);
        console.log("pageSize:", pageSize);
        const response = await djangoAPI_E.get(`/events/listEvents?page=${pageParam}&page_size=${pageSize}`);
        const data = response.data as { results: Event[]; count: number; next: number | null; previous: number | null };
        const eventsPerPage: { events: Event[]; count: number; nextPage: number | null; previousPage: number | null } = {
            events: data.results,
            count: data.count,
            nextPage: data.next,
            previousPage: data.previous,
        };
        console.log("eventsPerPage:", eventsPerPage);
        return eventsPerPage;
    } catch (error) {
        console.error("Error fetching events:", error);
        throw new Error("Failed to fetch events.");
    }
};
