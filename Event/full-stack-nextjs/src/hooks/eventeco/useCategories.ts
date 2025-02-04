"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/services/eventeco/actions/getCategories";

export const useCategories = () => {
    return useQuery({
        queryKey: ["getCategories"],
        queryFn: fetchCategories,
        staleTime: 5 * 60 * 1000,
        retry: 2,
    });
};
