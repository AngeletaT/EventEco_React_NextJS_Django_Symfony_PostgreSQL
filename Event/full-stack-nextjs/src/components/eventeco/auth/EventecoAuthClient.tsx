"use client";

import React, { useState } from "react";
import UserTypeSelector from "./UserTypeSelector";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import styles from "@/styles/eventeco/Auth.module.css";
import EventecoLayout from "@/layouts/eventeco/EventecoLayout";

const EventecoAuthClient: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);

    const [userType, setUserType] = useState<"client" | "organizer" | "admin">("client");

    return (
        <EventecoLayout>
            <div className={styles.authContainer}>
                <h1 className={styles.authtitle}>{isLogin ? "Iniciar Sesión" : "Registrarse"}</h1>

                <UserTypeSelector userType={userType} setUserType={setUserType} />

                {isLogin ? <LoginForm userType={userType} /> : <RegisterForm userType={userType} onSwitchToLogin={() => setIsLogin(true)} />}

                <p className={styles.authtoggleMessage}>
                    {isLogin ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
                    <span className={styles.authtoggleLink} onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? "Regístrate aquí" : "Inicia sesión aquí"}
                    </span>
                </p>
            </div>
        </EventecoLayout>
    );
};

export default EventecoAuthClient;
