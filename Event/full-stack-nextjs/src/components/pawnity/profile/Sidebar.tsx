"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/pawnity";
import { RootState } from "@/store/pawnity";
import { fetchUser } from "@/store/pawnity/slices/userSlice";
import { Button } from "@/utils/PrimeReactComponents";
import { Client } from "@/types/User";
import { logoutUser } from "@/store/pawnity/slices/authSlice";
import styles from "@/styles/pawnity/Profile.module.css";

interface SidebarProps {
    selectedTab: "tickets" | "orders" | "settings" | "preferences";
    setSelectedTab: (tab: "tickets" | "orders" | "settings" | "preferences") => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedTab, setSelectedTab }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { user, isLoading, error } = useSelector((state: RootState) => state.user as { user: Client; isLoading: boolean; error: string });

    useEffect(() => {
        if (!user) {
            dispatch(fetchUser() as any);
        }
    }, [dispatch, user]);

    const handleLogout = () => {
        dispatch(logoutUser() as any);
    };

    if (isLoading) return <p>Cargando perfil...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <aside className={styles.sidebar}>
            <div className={styles.profileInfo}>
                {user && (
                    <>
                        <img src={user.avatarurl || `https://i.pravatar.cc/150?u=${user.email}`} alt="User Avatar" className={styles.avatar} />
                        <h3>{user.firstname}</h3>
                    </>
                )}
            </div>
            <nav className={styles.nav}>
                <button className={selectedTab === "settings" ? styles.active : ""} onClick={() => setSelectedTab("settings")}>
                    <i className="pi pi-cog"></i> &nbsp;&nbsp;
                    <span>Cuenta</span>
                </button>
                <button className={selectedTab === "tickets" ? styles.active : ""} onClick={() => setSelectedTab("tickets")}>
                    <i className="pi pi-ticket"></i> &nbsp;&nbsp;
                    <span>Tickets</span>
                </button>
                <button className={selectedTab === "orders" ? styles.active : ""} onClick={() => setSelectedTab("orders")}>
                    <i className="pi pi-shopping-cart"></i> &nbsp;&nbsp;
                    <span>Historial de Compras</span>
                </button>
                <button className={selectedTab === "preferences" ? styles.active : ""} onClick={() => setSelectedTab("preferences")}>
                    <i className="pi pi-sliders-h"></i> &nbsp;&nbsp;
                    <span>Preferencias</span>
                </button>
            </nav>
            <div className={styles.profileActions}>
                <Button
                    label={window.innerWidth > 769 ? "Cerrar Sesión" : ""}
                    icon={window.innerWidth <= 769 ? "pi pi-sign-out" : ""}
                    className="p-button-secondary"
                    onClick={handleLogout}
                />
            </div>{" "}
        </aside>
    );
};

export default Sidebar;
