"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCategories } from "@/hooks/eventeco/useCategories";
import { useEventsPerPage } from "@/hooks/eventeco/useEvents";
import { Category } from "@/types/Category";
import EventecoLayout from "@/layouts/eventeco/EventecoLayout";
import Filters from "./Filters";
import { EventSkeletonShop } from "../skeletons/EventSkeleton";
import ListEvents from "./ListEvent";
import Pagination from "./Pagination";

const EventecoShopClient = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const initialPageParam = parseInt(searchParams.get("page") || "1", 10);
    const initialPageSize = parseInt(searchParams.get("page_size") || "5", 10);
    const initialCategorySlug = searchParams.get("categorySlug") || "";
    const initialLocation = searchParams.get("location") || "";
    const initialOrderByDate = (searchParams.get("order_by_date") as "asc" | "desc") || "asc";

    const [currentPage, setCurrentPage] = useState(initialPageParam);
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [categorySlug, setCategorySlug] = useState(initialCategorySlug);
    const [location, setLocation] = useState(initialLocation);
    const [orderByDate, setOrderByDate] = useState<"asc" | "desc">(initialOrderByDate);

    useEffect(() => {
        const params = new URLSearchParams({
            page: currentPage.toString(),
            page_size: pageSize.toString(),
            ...(categorySlug && { categorySlug }),
            ...(location && { location }),
            order_by_date: orderByDate,
        });
        router.push(`/eventeco/shop?${params.toString()}`);
    }, [currentPage, pageSize, categorySlug, location, orderByDate, router]);

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
