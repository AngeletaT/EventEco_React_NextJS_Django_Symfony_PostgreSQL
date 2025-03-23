"use client";

import React from "react";
import { useOrdersByClient } from "@/hooks/pawnity/useOrders";
import styles from "@/styles/pawnity/Profile.module.css";

const ProfileOrders: React.FC = () => {
    const orders = useOrdersByClient().data as any;
    const oldTickets = orders.old_orders;
    console.log(oldTickets);

    return <h1>ProfileOrders</h1>;
};

export default ProfileOrders;
