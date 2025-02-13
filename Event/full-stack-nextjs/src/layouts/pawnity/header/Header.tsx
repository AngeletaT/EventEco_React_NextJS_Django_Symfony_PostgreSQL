"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { RootState } from "@/store/pawnity";
import { fetchUser, logoutUser } from "@/store/pawnity/slices/authSlice";
import { Button, Sidebar, Avatar } from "@/utils/PrimeReactComponents";
import { GiHamburgerMenu } from "react-icons/gi";
import styles from "@/styles/pawnity/Header.module.css";

const Header: React.FC = () => {
    const pathname = usePathname();
    const [visible, setVisible] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const dispatch = useDispatch();
    const { user, isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (!user) {
            dispatch(fetchUser() as any);
        }
    }, [dispatch, user]);

    const menuItems = [
        {
            label: "Perfil",
            icon: "pi pi-user",
            command: () => (window.location.href = "/pawnity/profile"),
        },
        {
            label: "Cerrar Sesión",
            icon: "pi pi-sign-out",
            command: () => dispatch(logoutUser() as any),
        },
    ];

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <a href="/pawnity/home">
                        <img src="/assets/p_logo/LogoPawnity_Img.png" alt="Pawnity Logo" />
                    </a>
                </div>

                {/* Botón de menú hamburguesa para pantallas pequeñas */}
                <button className={styles.menuButton} onClick={() => setVisible(!visible)}>
                    <GiHamburgerMenu size={24} />
                </button>

                {/* Menú para pantallas grandes */}
                <nav className={styles.nav}>
                    <a href="/pawnity/home" className={`${styles.link} ${pathname === "/pawnity/home" ? styles.active : ""}`}>
                        Inicio
                    </a>
                    <a href="/pawnity/shop" className={`${styles.link} ${pathname === "/pawnity/shop" ? styles.active : ""}`}>
                        Eventos
                    </a>
                    <a href="/pawnity/adoptions" className={`${styles.link} ${pathname === "/pawnity/adoptions" ? styles.active : ""}`}>
                        Adopciones
                    </a>
                    <a href="/pawnity/contact" className={`${styles.link} ${pathname === "/pawnity/contact" ? styles.active : ""}`}>
                        Contacto
                    </a>
                </nav>

                {/* Sección de Usuario / Autenticación */}
                <div className={`${styles.userSection} ${styles.hideOnSmallScreens}`}>
                    {isLoading ? (
                        <p>Cargando...</p>
                    ) : isAuthenticated && user ? (
                        <div className={styles.userDropdown}>
                            <Avatar
                                image={user.avatarurl || "https://i.pravatar.cc/300"}
                                shape="circle"
                                className={styles.avatar}
                                onClick={() => setMenuVisible(!menuVisible)}
                            />
                            <span className={styles.userName} onClick={() => setMenuVisible(!menuVisible)}>
                                {user.firstname}
                            </span>

                            {/* Dropdown del usuario */}
                            {menuVisible && (
                                <div className={styles.dropdownMenu}>
                                    {menuItems.map((item, index) => (
                                        <div key={index} className={styles.dropdownItem} onClick={item.command}>
                                            <i className={item.icon}></i> {item.label}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <Button label="Iniciar Sesión" className="p-button-primary" onClick={() => (window.location.href = "/pawnity/auth")} />
                    )}
                </div>
            </div>

            {/* Sidebar para el menú en pantallas pequeñas */}
            <Sidebar visible={visible} onHide={() => setVisible(false)} className={styles.sidebar}>
                <nav className={styles.mobileNav}>
                    <a href="/pawnity/home" className={`${styles.link} ${pathname === "/pawnity/home" ? styles.active : ""}`}>
                        Inicio
                    </a>
                    <a href="/pawnity/shop" className={`${styles.link} ${pathname === "/pawnity/shop" ? styles.active : ""}`}>
                        Eventos
                    </a>
                    <a href="/pawnity/adoptions" className={`${styles.link} ${pathname === "/pawnity/adoptions" ? styles.active : ""}`}>
                        Adopciones
                    </a>
                    <a href="/pawnity/contact" className={`${styles.link} ${pathname === "/pawnity/contact" ? styles.active : ""}`}>
                        Contacto
                    </a>
                    {user ? (
                        <>
                            <a href="/pawnity/profile" className={`${styles.link} ${pathname === "/pawnity/contact" ? styles.active : ""}`}>
                                {user.firstname}
                            </a>
                            <Button label="Cerrar Sesión" className="p-button-secondary" onClick={() => dispatch(logoutUser() as any)} />
                        </>
                    ) : (
                        <Button label="Iniciar Sesión" className="p-button-primary" onClick={() => (window.location.href = "/pawnity/auth")} />
                    )}
                </nav>
            </Sidebar>
        </header>
    );
};

export default Header;
