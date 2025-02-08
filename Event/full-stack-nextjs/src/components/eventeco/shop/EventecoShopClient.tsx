"use client";

import React, { useState, useEffect } from "react";
import { useCategories } from "@/hooks/eventeco/useCategories";
import { useEventsPerPage } from "@/hooks/eventeco/useEvents";
import { Category } from "@/types/Category";
import EventecoLayout from "@/layouts/eventeco/EventecoLayout";
import Filters from "./Filters";
import { EventSkeletonShop } from "../skeletons/EventSkeleton";
import ListEvents from "./ListEvent";
import Pagination from "./Pagination";

const EventecoShopClient = () => {
    const [currentPage, setCurrentPage] = useState(1);
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

    const { data, isLoading, isFetching } = useEventsPerPage({
        page: currentPage,
        pageSize,
        categorySlug,
        location,
        order_by_date: orderByDate,
    });

    const events = data?.events || [];
    const totalPages = data?.total_pages || 1;

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage]);
    useEffect(() => {
        setCurrentPage(1);
    }, [pageSize, categorySlug, location, orderByDate]);

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
            {isLoading || isFetching ? <EventSkeletonShop /> : <ListEvents events={events} />}

            {/* Paginación */}
            {pageSize !== 25 && (
                <Pagination
                    hasNextPage={currentPage < totalPages}
                    hasPreviousPage={currentPage > 1}
                    fetchNextPage={handleNextPage}
                    fetchPreviousPage={handlePreviousPage}
                    currentPage={currentPage}
                />
            )}
        </EventecoLayout>
    );
};

export default EventecoShopClient;
