import { djangoAPI_E, symfonyAPI_E } from "@/services/api";
import { Event } from "@/types/Event";
import { GetEventsParams } from "@/types/GetEventParams";

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
    categorySlug,
    location,
    order_by_date,
}: GetEventsParams): Promise<{
    events: Event[];
    total_pages: number;
    count: number;
}> => {
    const params = new URLSearchParams({
        page: pageParam.toString(),
        page_size: pageSize.toString(),
    });
    if (categorySlug) params.append("categorySlug", categorySlug);
    if (location) params.append("location", location);
    if (order_by_date) params.append("order_by_date", order_by_date);

    const response = await djangoAPI_E.get(`/events/listEvents?${params.toString()}`);
    const data = response.data as {
        results: Event[];
        total_pages: number;
        count: number;
    };

    return {
        events: data.results,
        total_pages: data.total_pages,
        count: data.count,
    };
};

export const getEventBySlug = async (eventslug: string): Promise<Event> => {
    try {
        const response = await djangoAPI_E.get(`/events/details/${eventslug}`);
        return response.data as Event;
    } catch (error) {
        console.error("Error fetching event details:", error);
        throw new Error("Failed to fetch event details.");
    }
};

export const getEventsByOrganizer = async (): Promise<Event[]> => {
    try {
        const accesstoken = Cookies.get("accesstoken");
        if (!accesstoken) throw new Error("No access token available");

        const headers = { Authorization: `Bearer ${accesstoken}` };

        const response = await symfonyAPI_E.get("/organizer/events", { headers });
        return response.data as Event[];
    } catch (error) {
        console.error("Error fetching events:", error);
        throw new Error("Failed to fetch events.");
    }
};
