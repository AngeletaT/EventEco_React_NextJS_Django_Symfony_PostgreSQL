"use client";

import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { getEvents, getEventsPerPage } from "@/services/eventeco/queries/getEvents";
import { Event } from "@/types/Event";

export const useEvents = () =>
    useQuery<Event[]>({
        queryKey: ["events"],
        queryFn: getEvents as () => Promise<Event[]>,
        staleTime: 1000 * 60 * 30,
    });

export const useEventsPerPage = (pageSize: number) =>
    useInfiniteQuery<{ events: Event[]; count: number; nextPage: number | null; previousPage: number | null }>({
        queryKey: ["eventsPerPage", pageSize],
        initialPageParam: 1,
        queryFn: ({ pageParam = 1 }) => getEventsPerPage({ pageParam: pageParam as number, pageSize }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
        getPreviousPageParam: (firstPage, pages) => firstPage.previousPage,
        staleTime: 1000 * 60,
    });
