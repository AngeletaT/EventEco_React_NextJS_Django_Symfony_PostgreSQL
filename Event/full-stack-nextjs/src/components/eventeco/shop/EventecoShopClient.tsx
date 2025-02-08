"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useCategories } from "@/hooks/eventeco/useCategories";
import { useEventsPerPage } from "@/hooks/eventeco/useEvents";
import { Category } from "@/types/Category";
import EventecoLayout from "@/layouts/eventeco/EventecoLayout";
import Filters from "./Filters";
import { EventSkeletonShop } from "../skeletons/EventSkeleton";
import ListEvents from "./ListEvent";
import Pagination from "./Pagination";

const EventecoShopClient = () => {
    const [pageSize, setPageSize] = useState(5);
    const [categorySlug, setCategorySlug] = useState("");
    const [location, setLocation] = useState("");
    const [orderByDate, setOrderByDate] = useState<"asc" | "desc">("asc");

    const { data: categories, isLoading: loadingCategories } = useCategories<Category[]>();

    const resetFilters = () => {
        setPageSize(5);
        setCategorySlug("");
        setLocation("");
        setOrderByDate("asc");
    };

    const {
        data,
        isLoading: loadingEvents,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        hasPreviousPage,
        refetch,
    } = useEventsPerPage({ pageSize, categorySlug, location, order_by_date: orderByDate });

    const currentPage = data?.pages[data.pages.length - 1]?.current_page || 1;

    const currentPageEvents = data?.pages.find((page) => page.current_page === currentPage)?.events || [];

    const handlePreviousPage = async () => {
        await fetchPreviousPage();
        refetch();
    };

    return (
        <EventecoLayout>
            {/* Filtros */}
            {loadingCategories ? null : (
                <Filters
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    categorySlug={categorySlug}
                    setCategorySlug={setCategorySlug}
                    location={location}
                    setLocation={setLocation}
                    orderByDate={orderByDate}
                    setOrderByDate={setOrderByDate}
                    categories={categories || []}
                    resetFilters={resetFilters}
                />
            )}

            {/* Lista de Eventos */}
            {loadingEvents ? <EventSkeletonShop /> : <ListEvents events={currentPageEvents} />}

            {/* Paginación */}
            <Pagination
                hasNextPage={!!hasNextPage}
                hasPreviousPage={!!hasPreviousPage}
                fetchNextPage={fetchNextPage}
                fetchPreviousPage={fetchPreviousPage}
                current_page={currentPage}
                handlePreviousPage={handlePreviousPage}
            />
        </EventecoLayout>
    );
};

export default EventecoShopClient;
