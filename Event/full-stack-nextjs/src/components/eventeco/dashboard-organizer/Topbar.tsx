"use client";

import React from "react";
import { Organizer } from "@/types/User";
import { Avatar } from "@/utils/PrimeReactComponents";
import styles from "@/styles/eventeco/Organizer/DashboardOrganizer.module.css";

interface TopbarProps {
    user: Organizer | null;
    isLoading: boolean;
}

const Topbar: React.FC<TopbarProps> = ({ user, isLoading }) => {
    return (
        <header className={styles.topbar}>
            <h2>Dashboard del Organizador</h2>
            {isLoading ? (
                <p>Cargando usuario...</p>
            ) : (
                <div className={styles.userInfo}>
                    <Avatar image={user?.urlLogo} shape="circle" className={styles.avatar} />
                    <span>{user?.name}</span>
                </div>
            )}
        </header>
    );
};

export default Topbar;
