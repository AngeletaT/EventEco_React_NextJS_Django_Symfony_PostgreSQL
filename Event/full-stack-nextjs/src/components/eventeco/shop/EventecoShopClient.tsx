"use client";

import React from "react";
import EventecoLayout from "@/layouts/eventeco/EventecoLayout";
import { Category } from "@/types/Category";
import { Event } from "@/types/Event";
import ListEvents from "./ListEvent";

interface EventecoHomeClientProps {
    categories: Category[];
    events: Event[];
}

const EventecoHomeClient: React.FC<EventecoHomeClientProps> = ({ categories, events }) => {
    return (
        <EventecoLayout>
            <ListEvents events={events} />
        </EventecoLayout>
    );
};

export default EventecoHomeClient;
