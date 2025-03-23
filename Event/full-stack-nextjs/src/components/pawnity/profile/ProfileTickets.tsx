"use client";

import React from "react";
import { useOrdersByClient } from "@/hooks/pawnity/useOrders";
import styles from "@/styles/pawnity/Profile.module.css";

const ProfileTickets: React.FC = () => {
    const orders = useOrdersByClient().data as any;
    const activeTickets = orders.active_orders;
    console.log(activeTickets);

    return <h1>ProfileTickets</h1>;
};

export default ProfileTickets;
