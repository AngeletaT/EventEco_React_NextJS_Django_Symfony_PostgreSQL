"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginClientService, loginOrganizerService, loginAdminService } from "@/services/eventeco/command/user/loginService";
import { LoginFormProps } from "@/types/Auth";
import { InputText } from "@/utils/PrimeReactComponents";
import { FloatLabel } from "@/utils/PrimeReactComponents";
import { Password } from "@/utils/PrimeReactComponents";
import { Button } from "@/utils/PrimeReactComponents";
import { loginSuccess } from "@/store/eventeco/slices/authSlice";
import { fetchUser } from "@/store/eventeco/slices/userSlice";
import styles from "@/styles/eventeco/Auth.module.css";

interface ExtendedLoginFormProps extends LoginFormProps {
    isModal?: boolean;
    onClose?: () => void;
}

const LoginForm: React.FC<ExtendedLoginFormProps> = ({ userType, isModal, onClose }) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError("El correo electrónico no es válido. Por favor, introduce un correo válido.");
            return;
        } else {
            setEmailError("");
        }

        if (password === "") {
            setPasswordError("La contraseña no puede estar vacía.");
            return;
        } else {
            setPasswordError("");
        }

        try {
            setIsLoading(true);
            let user;
            if (userType === "client") {
                user = await loginClientService({ email, password });
            } else if (userType === "organizer") {
                user = await loginOrganizerService({ email, password });
            } else if (userType === "admin") {
                user = await loginAdminService({ email, password });
            }
            if (user) {
                dispatch(loginSuccess({ user }));
                dispatch(fetchUser() as any);
            } else {
                setError("Error al iniciar sesión. Verifica tus credenciales.");
            }
            if (isModal && onClose) {
                onClose();
            } else {
                window.location.href =
                    userType === "client"
                        ? "/eventeco/home"
                        : userType === "organizer"
                          ? "/eventeco/dashboard-organizer"
                          : "/eventeco/dashboard-admin";
            }
        } catch (err) {
            setError("Error al iniciar sesión. Verifica tus credenciales.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="card flex justify-content-center">
            <div className={styles.formLoginContainer}>
                <FloatLabel className={styles.floatLabelContainer}>
                    <InputText
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Introduce tu correo"
                        className="w-full"
                        invalid={emailError || error ? true : false}
                        required
                    />
                    <label htmlFor="email">Email</label>
                </FloatLabel>
                {emailError && <p className={styles.errorMessage}>{emailError}</p>}

                <FloatLabel className={styles.floatLabelContainer}>
                    <Password
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Introduce tu contraseña"
                        feedback={false}
                        className="w-full"
                        toggleMask
                        invalid={passwordError || error ? true : false}
                        required
                    />
                    <label htmlFor="password">Contraseña</label>
                </FloatLabel>
                {passwordError && <p className={styles.errorMessage}>{passwordError}</p>}

                {error && <p className={styles.errorMessage}>{error}</p>}

                <Button
                    type="button"
                    label={isLoading ? "Cargando..." : "Iniciar Sesión"}
                    className="p-button-success"
                    onClick={handleLogin}
                    disabled={isLoading}
                />
            </div>
        </div>
    );
};

export default LoginForm;
