"use client";

import React, { useState } from "react";
import { registerClientService, registerOrganizerService, registerAdminService } from "@/services/pawnity/command/registerService";
import { RegisterFormProps } from "@/types/Auth";
import { InputText } from "@/utils/PrimeReactComponents";
import { FloatLabel } from "@/utils/PrimeReactComponents";
import { Password } from "@/utils/PrimeReactComponents";
import { Button } from "@/utils/PrimeReactComponents";
import SuccessModal from "./SuccessModal";
import styles from "@/styles/pawnity/Auth.module.css";

const RegisterForm: React.FC<RegisterFormProps> = ({ userType, onSwitchToLogin }) => {
    const [email, setEmail] = useState("");
    const [nif, setNif] = useState("");
    const [password, setPassword] = useState("");
    const [repeatpassword, setRepeatPassword] = useState("");
    const [error, setError] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== repeatpassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        try {
            if (userType === "client") {
                await registerClientService({ email, password, nif, repeatpassword });
                setError("");
                setShowSuccessModal(true);
                console.log("Registro exitoso");
            } else if (userType === "organizer") {
                await registerOrganizerService({ email, password, nif, repeatpassword });
                setError("");
                setShowSuccessModal(true);
                console.log("Registro exitoso");
            } else if (userType === "admin") {
                await registerAdminService({ email, password, nif, repeatpassword });
                setError("");
                setShowSuccessModal(true);
                console.log("Registro exitoso");
            }
        } catch (err) {
            setError("Error al registrarse. Inténtalo de nuevo.");
        }
    };

    const handleModalClose = () => {
        setShowSuccessModal(false);
        onSwitchToLogin();
    };

    return (
        <div className={styles.formRegisterContainer}>
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
            {userType === "organizer" && (
                <FloatLabel className={styles.floatLabelContainer}>
                    <InputText
                        id="nif"
                        value={nif}
                        onChange={(e) => setNif(e.target.value)}
                        placeholder="Introduce tu NIF"
                        className="w-full"
                        required
                    />
                    <label htmlFor="nif">NIF</label>
                </FloatLabel>
            )}
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

            <FloatLabel className={styles.floatLabelContainer}>
                <Password
                    id="repeatpassword"
                    value={repeatpassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    placeholder="Repite tu contraseña"
                    feedback={false}
                    className="w-full"
                    pt={{ input: { className: "w-full" } }}
                    toggleMask
                    required
                />
                <label htmlFor="repeatpassword">Repite la Contraseña</label>
            </FloatLabel>

            {error && <p className={styles.errorMessage}>{error}</p>}

            <Button type="button" label="Registrarse" className="p-button-primary" onClick={handleRegister} />

            <SuccessModal visible={showSuccessModal} onHide={handleModalClose} />
        </div>
    );
};

export default RegisterForm;
