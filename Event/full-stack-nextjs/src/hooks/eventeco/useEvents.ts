"use client";

import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { getEvents, getEventsPerPage } from "@/services/eventeco/queries/getEvents";
import { Event } from "@/types/Event";
import { GetEventHook } from "@/types/GetEventParams";

export const useEvents = () =>
    useQuery<Event[]>({
        queryKey: ["events"],
        queryFn: getEvents as () => Promise<Event[]>,
        staleTime: 1000 * 60 * 30,
    });

export const useEventsPerPage = ({ pageSize, categorySlug, location, order_by_date }: GetEventHook) =>
    useInfiniteQuery<{
        events: Event[];
        total_pages: number;
        count: number;
        next: number | null;
        previous: number | null;
        current_page: number;
    }>({
        queryKey: ["eventsPerPage", pageSize, categorySlug, location, order_by_date],
        initialPageParam: 1,
        queryFn: ({ pageParam = 1 }) =>
            getEventsPerPage({
                pageParam: (pageParam as number) ?? 1,
                pageSize,
                categorySlug,
                location,
                order_by_date,
            }),
        getNextPageParam: (lastPage) => lastPage.next,
        getPreviousPageParam: (firstPage) => firstPage.previous,
        staleTime: 1000 * 60,
    });
