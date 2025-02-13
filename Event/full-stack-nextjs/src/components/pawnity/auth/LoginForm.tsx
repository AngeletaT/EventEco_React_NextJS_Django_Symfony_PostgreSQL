"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginClientService, loginOrganizerService, loginAdminService } from "@/services/pawnity/command/loginService";
import { LoginFormProps } from "@/types/Auth";
import { InputText } from "@/utils/PrimeReactComponents";
import { FloatLabel } from "@/utils/PrimeReactComponents";
import { Password } from "@/utils/PrimeReactComponents";
import { Button } from "@/utils/PrimeReactComponents";
import { loginSuccess } from "@/store/pawnity/slices/authSlice";
import styles from "@/styles/pawnity/Auth.module.css";

const LoginForm: React.FC<LoginFormProps> = ({ userType }) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (userType === "client") {
                const user = await loginClientService({ email, password });
                dispatch(loginSuccess({ user }));
                window.location.href = "/pawnity/home";
            } else if (userType === "organizer") {
                const user = await loginOrganizerService({ email, password });
                dispatch(loginSuccess({ user }));
                window.location.href = "/pawnity/home";
            } else if (userType === "admin") {
                const user = await loginAdminService({ email, password });
                dispatch(loginSuccess({ user }));
                window.location.href = "/pawnity/home";
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
                <Button type="button" label="Iniciar Sesión" className="p-button-primary" onClick={handleLogin} />
            </div>
        </div>
    );
};

export default LoginForm;
