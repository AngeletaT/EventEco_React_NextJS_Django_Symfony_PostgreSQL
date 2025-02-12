"use client";

import React, { useState } from "react";
import { InputText } from "@/utils/PrimeReactComponents";
import { FloatLabel } from "@/utils/PrimeReactComponents";
import { Password } from "@/utils/PrimeReactComponents";
import { Button } from "@/utils/PrimeReactComponents";
import styles from "@/styles/pawnity/Auth.module.css";

interface RegisterFormProps {
    userType: "client" | "organization" | "admin";
}

const RegisterForm: React.FC<RegisterFormProps> = ({ userType }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== repeatPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        console.log(`Registrando como ${userType}:`, { email, password });
        setError("");
        // Aquí se llamará al servicio de registro
    };

    return (
        <div className={styles.formRegisterContainer}>
            <FloatLabel>
                <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label htmlFor="email">Email</label>
            </FloatLabel>

            <FloatLabel>
                <Password
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Introduce tu contraseña"
                    feedback={false}
                    toggleMask
                    required
                />
                <label htmlFor="password">Contraseña</label>
            </FloatLabel>

            <FloatLabel>
                <Password
                    id="repeatPassword"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    placeholder="Repite tu contraseña"
                    feedback={false}
                    toggleMask
                    required
                />
                <label htmlFor="repeatPassword">Repite la Contraseña</label>
            </FloatLabel>

            {error && <p className={styles.errorMessage}>{error}</p>}

            <Button type="button" label="Registrarse" className="p-button-primary" onClick={handleRegister} />
        </div>
    );
};

export default RegisterForm;
