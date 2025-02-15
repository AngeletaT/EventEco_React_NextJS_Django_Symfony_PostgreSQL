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
import styles from "@/styles/eventeco/Auth.module.css";

const LoginForm: React.FC<LoginFormProps> = ({ userType }) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("El correo electrónico no es válido. Por favor, introduce un correo válido.");
            return;
        }

        try {
            if (userType === "client") {
                const user = await loginClientService({ email, password });
                dispatch(loginSuccess({ user }));
                window.location.href = "/eventeco/home";
            } else if (userType === "organizer") {
                const user = await loginOrganizerService({ email, password });
                dispatch(loginSuccess({ user }));
                window.location.href = "/eventeco/dashboard-organizer";
            } else if (userType === "admin") {
                const user = await loginAdminService({ email, password });
                dispatch(loginSuccess({ user }));
                window.location.href = "/eventeco/dashboard-admin";
            }
        } catch (err) {
            setError("Error al iniciar sesión. Verifica tus credenciales.");
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
                        required
                    />
                    <label htmlFor="email">Email</label>
                </FloatLabel>

                <FloatLabel className={styles.floatLabelContainer}>
                    <Password
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Introduce tu contraseña"
                        feedback={false}
                        className="w-full"
                        toggleMask
                        required
                    />
                    <label htmlFor="password">Contraseña</label>
                </FloatLabel>

                {error && <p className={styles.errorMessage}>{error}</p>}

                <Button type="button" label="Iniciar Sesión" className="p-button-success" onClick={handleLogin} />
            </div>
        </div>
    );
};

export default LoginForm;
