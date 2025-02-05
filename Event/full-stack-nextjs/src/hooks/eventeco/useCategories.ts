"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/eventeco/queries/getCategories";
import { Category } from "@/types/Category";

export const useCategories = <T extends Category[] = Category[]>() => {
    return useQuery<T>({
        queryKey: ["categories"],
        queryFn: getCategories as () => Promise<T>,
        staleTime: 1000 * 60 * 5,
    });
};
