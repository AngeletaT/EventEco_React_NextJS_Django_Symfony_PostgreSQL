import { djangoAPI_E, symfonyAPI_E } from "../../api";
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
    next: number | null;
    previous: number | null;
    current_page: number;
}> => {
    try {
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
            count: number;
            total_pages: number;
            current_page: number;
            next: number | null;
            previous: number | null;
        };

        return {
            events: data.results,
            total_pages: data.total_pages,
            count: data.count,
            next: data.next,
            previous: data.previous,
            current_page: data.current_page,
        };
    } catch (error) {
        console.error("Error fetching events:", error);
        throw new Error("Failed to fetch events.");
    }
};
