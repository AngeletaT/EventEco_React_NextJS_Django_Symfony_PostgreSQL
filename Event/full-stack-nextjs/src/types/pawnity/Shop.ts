import { Category } from "../Category";

export interface FiltersProps {
    pageSize: number;
    setPageSize: (value: number) => void;
    categorySlug: string;
    setCategorySlug: (value: string) => void;
    location: string;
    setLocation: (value: string) => void;
    orderByDate: "asc" | "desc";
    setOrderByDate: (value: "asc" | "desc") => void;
    categories: Category[];
    resetFilters: () => void;
}

export interface PaginationProps {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    fetchNextPage: () => void;
    fetchPreviousPage: () => void;
    currentPage: number;
}
