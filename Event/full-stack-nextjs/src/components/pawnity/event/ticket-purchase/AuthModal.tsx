"use client";

import React, { useState } from "react";
import { Dialog, Button } from "@/utils/PrimeReactComponents";
import LoginForm from "../../auth/LoginForm";
import RegisterForm from "../../auth/RegisterForm";
import styles from "@/styles/pawnity/TicketPurchase.module.css";

const AuthModal: React.FC<{ visible: boolean; onHide: () => void }> = ({ visible, onHide }) => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <Dialog visible={visible} onHide={onHide} modal className={styles.modalContainer}>
            <div className={styles.modalHeader}>{isLogin ? "Iniciar Sesión" : "Registrarse"}</div>
            {isLogin ? (
                <LoginForm userType="client" isModal={true} onClose={onHide} />
            ) : (
                <RegisterForm userType="client" onSwitchToLogin={() => setIsLogin(true)} />
            )}

            <div className={styles.buttonContainer}>
                <Button
                    label={isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
                    className={`p-button-link ${styles.switchButton}`}
                    onClick={() => setIsLogin(!isLogin)}
                />
                <Button label="Cerrar" className={`p-button-secondary ${styles.closeButton}`} onClick={onHide} />
            </div>
        </Dialog>
    );
};

export default AuthModal;
