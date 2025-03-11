"use client";

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getEvents, getEventsPerPage, getEventBySlug, getEventsByOrganizer } from "@/services/eventeco/queries/getEvents";
import { createEvent } from "@/services/eventeco/command/event/createEvent";
import { updateEvent, toggleEventStatusActive } from "@/services/eventeco/command/event/updateEvent";
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

export const useEventDetails = (eventslug: string | null) => {
    const queryClient = useQueryClient();

    const cachedEvents: Event[] | undefined = queryClient.getQueryData(["eventsByOrganizer"]);

    const cachedEvent = cachedEvents?.find((event) => event.eventslug === eventslug) || null;

    const refetch = () => queryClient.invalidateQueries({ queryKey: ["eventsByOrganizer"] });

    return { data: cachedEvent, isLoading: false, isError: false, refetch };
};

export const useEventsByOrganizer = () =>
    useQuery<Event[]>({
        queryKey: ["eventsByOrganizer"],
        queryFn: getEventsByOrganizer as () => Promise<Event[]>,
        staleTime: 1000 * 60 * 30,
    });

export const useCreateEvent = () => {
    const queryClient = useQueryClient();

    return useMutation<Event, Error, Partial<Event>>({
        mutationFn: (eventData: Partial<Event>) => createEvent(eventData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["events"] });
        },
    });
};

export const useUpdateEvent = () => {
    const queryClient = useQueryClient();

    return useMutation<number, Error, { id: number; data: Partial<Event> }>({
        mutationFn: async ({ id, data }: { id: number; data: Partial<Event> }) => {
            await updateEvent(id, data);
            return id;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["events"] });
        },
    });
};

export const useToggleEvent = () => {
    const queryClient = useQueryClient();

    return useMutation<number, Error, { id: number }>({
        mutationFn: async ({ id }: { id: number }) => {
            await toggleEventStatusActive(id);
            return id;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["events"] });
        },
    });
};
