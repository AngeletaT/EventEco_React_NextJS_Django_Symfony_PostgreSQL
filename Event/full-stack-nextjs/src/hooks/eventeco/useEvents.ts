"use client";

import { useQuery } from "@tanstack/react-query";
import { getEvents } from "@/services/eventeco/queries/getEvents";
import { Event } from "@/types/Event";

export const useEvents = <T extends Event[] = Event[]>() =>
    useQuery({
        queryKey: ["events"],
        queryFn: getEvents as () => Promise<T>,
        staleTime: 1000 * 60 * 30,
    });
