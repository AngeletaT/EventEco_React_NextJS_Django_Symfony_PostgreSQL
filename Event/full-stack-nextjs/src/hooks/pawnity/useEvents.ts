"use client";

import { useQuery } from "@tanstack/react-query";
import { getEvents, getEventsPerPage } from "@/services/pawnity/queries/getEvents";
import { Event } from "@/types/Event";

export const useEvents = () =>
    useQuery<Event[]>({
        queryKey: ["events"],
        queryFn: getEvents as () => Promise<Event[]>,
        staleTime: 1000 * 60 * 30,
    });

export const useEventsPerPage = ({
    page,
    pageSize,
    categorySlug,
    location,
    order_by_date,
}: {
    page: number;
    pageSize: number;
    categorySlug?: string;
    location?: string;
    order_by_date?: "asc" | "desc";
}) =>
    useQuery({
        queryKey: ["eventsPerPage", page, pageSize, categorySlug, location, order_by_date],
        queryFn: () =>
            getEventsPerPage({
                pageParam: page,
                pageSize,
                categorySlug,
                location,
                order_by_date,
            }),
        staleTime: 1000 * 60,
    });

export const useEventDetails = (slug: string) => {
    return useQuery<Event>({
        queryKey: ["eventDetails", slug],
        queryFn: () => getEventBySlug(slug),
        staleTime: 1000 * 60 * 5,
        retry: 2,
        refetchOnWindowFocus: false,
    });
};
