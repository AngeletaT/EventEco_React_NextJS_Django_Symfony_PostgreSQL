"use client";

import React from "react";
import PawnityLayout from "@/layouts/pawnity/PawnityLayout";
import { Category } from "@/types/Category";
import { Event } from "@/types/Event";
import ListEvents from "./ListEvent";

interface PawnityHomeClientProps {
    categories: Category[];
    events: Event[];
}

const PawnityHomeClient: React.FC<PawnityHomeClientProps> = ({ categories, events }) => {
    return (
        <PawnityLayout>
            <ListEvents events={events} />
        </PawnityLayout>
    );
};

export default PawnityHomeClient;
