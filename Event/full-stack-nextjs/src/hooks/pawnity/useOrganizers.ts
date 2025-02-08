"use client";

import { useQuery } from "@tanstack/react-query";
import { getOrganizers } from "@/services/pawnity/queries/getOrganizers";
import { Organizer } from "@/types/Organizer";

export const useOrganizers = <T extends Organizer[] = Organizer[]>() =>
    useQuery({
        queryKey: ["categories"],
        queryFn: getOrganizers as () => Promise<T>,
        staleTime: 1000 * 60 * 30,
    });
