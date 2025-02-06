"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/pawnity/queries/getCategories";
import { Category } from "@/types/Category";

export const useCategories = <T extends Category[] = Category[]>() =>
    useQuery({
        queryKey: ["categories"],
        queryFn: getCategories as () => Promise<T>,
        staleTime: 1000 * 60 * 30,
    });
