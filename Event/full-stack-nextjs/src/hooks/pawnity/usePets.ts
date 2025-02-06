"use client";

import { useQuery } from "@tanstack/react-query";
import { getPets } from "@/services/pawnity/queries/getPets";
import { Pet } from "@/types/pawnity/Pet";

export const usePets = <T extends Pet[] = Pet[]>() =>
    useQuery({
        queryKey: ["pets"],
        queryFn: getPets as () => Promise<T>,
        staleTime: 1000 * 60 * 30,
    });
