"use client";

import React from "react";
import { useCategories } from "@/hooks/eventeco/useCategories";
import { useEvents, useEventsPerPage } from "@/hooks/eventeco/useEvents";
import { Category } from "@/types/Category";
import { Event } from "@/types/Event";
import EventecoLayout from "@/layouts/eventeco/EventecoLayout";
// filtros
import EventSkeleton from "../skeletons/EventSkeleton";
import ListEvents from "./ListEvent";
// paginacion

const EventecoShopClient = () => {
    const { data: categories, isLoading: loadingCategories } = useCategories<Category[]>();
    const { data: events, isLoading: loadingEvents, isError, refetch } = useEventsPerPage(25);
    console.log("events:", events);

    return (
        <EventecoLayout>
            {/* filtros */}
            <EventSkeleton />
            {/* {loadingEvents ? <EventSkeleton /> : <ListEvents events={events as Event[]} />} */}
            {/* paginacion */}
        </EventecoLayout>
    );
};

export default EventecoShopClient;
