"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "@/services/eventeco/actions/getEvents";

export const useEvents = () => {
    return useQuery({
        queryKey: ["getEvents"],
        queryFn: fetchEvents,
        staleTime: 5 * 60 * 1000, // Data is "fresh" for 5 minutes
        retry: 2, // Retry the request 2 times in case of failure
    });
};
