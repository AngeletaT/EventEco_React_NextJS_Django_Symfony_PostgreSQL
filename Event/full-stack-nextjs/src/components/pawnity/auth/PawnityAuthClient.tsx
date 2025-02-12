"use client";

import React, { useState } from "react";
import UserTypeSelector from "./UserTypeSelector";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import styles from "@/styles/pawnity/Auth.module.css";
import PawnityLayout from "@/layouts/pawnity/PawnityLayout";

const PawnityAuthClient: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);

    const [userType, setUserType] = useState<"client" | "organization" | "admin">("client");

    return (
        <PawnityLayout>
            <div className={styles.authContainer}>
                <h1 className={styles.authtitle}>{isLogin ? "Iniciar Sesión" : "Registrarse"}</h1>

                <UserTypeSelector userType={userType} setUserType={setUserType} />

                {isLogin ? <LoginForm userType={userType} /> : <RegisterForm userType={userType} />}

                <p className={styles.authtoggleMessage}>
                    {isLogin ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
                    <span className={styles.authtoggleLink} onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? "Regístrate aquí" : "Inicia sesión aquí"}
                    </span>
                </p>
            </div>
        </PawnityLayout>
    );
};

export default PawnityAuthClient;
