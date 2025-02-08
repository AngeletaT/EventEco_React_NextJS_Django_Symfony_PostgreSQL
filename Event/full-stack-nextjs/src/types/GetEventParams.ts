export interface GetEventsParams {
    pageParam: number;
    pageSize?: number;
    categorySlug?: string;
    location?: string;
    order_by_date?: "asc" | "desc";
}

export interface GetEventHook {
    pageSize?: number;
    categorySlug?: string;
    location?: string;
    order_by_date?: "asc" | "desc";
}
