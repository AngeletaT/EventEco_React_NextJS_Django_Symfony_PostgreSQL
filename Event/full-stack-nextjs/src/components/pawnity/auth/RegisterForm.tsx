"use client";

import React, { useState } from "react";
import { registerClientService, registerOrganizerService, registerAdminService } from "@/services/pawnity/command/user/registerService";
import { RegisterFormProps } from "@/types/Auth";
import { InputText } from "@/utils/PrimeReactComponents";
import { FloatLabel } from "@/utils/PrimeReactComponents";
import { Password } from "@/utils/PrimeReactComponents";
import { Button } from "@/utils/PrimeReactComponents";
import SuccessModal from "@/components/shared/SuccessModal";
import styles from "@/styles/pawnity/Auth.module.css";

const RegisterForm: React.FC<RegisterFormProps> = ({ userType, onSwitchToLogin }) => {
    const [email, setEmail] = useState("");
    const [nif, setNif] = useState("");
    const [password, setPassword] = useState("");
    const [repeatpassword, setRepeatPassword] = useState("");
    const [error, setError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [nifError, setNifError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError("El correo electrónico no es válido. Por favor, introduce un correo válido.");
            return;
        } else {
            setEmailError("");
        }

        const nifRegex = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
        if (userType === "organizer" && !nifRegex.test(nif)) {
            setNifError("El NIF no es válido. Por favor, introduce un NIF válido.");
            return;
        } else {
            setNifError("");
        }

        if (password === "") {
            setPasswordError("La contraseña no puede estar vacía.");
            return;
        } else if (password !== repeatpassword) {
            setPasswordError("Las contraseñas no coinciden.");
            return;
        } else {
            setPasswordError("");
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
                    invalid={emailError || error ? true : false}
                    required
                />
                <label htmlFor="email">Email</label>
            </FloatLabel>
            {emailError && <p className={styles.errorMessage}>{emailError}</p>}

            {userType === "organizer" && (
                <>
                    <FloatLabel className={styles.floatLabelContainer}>
                        <InputText
                            id="nif"
                            value={nif}
                            onChange={(e) => setNif(e.target.value)}
                            placeholder="Introduce tu NIF"
                            className="w-full"
                            invalid={nifError || error ? true : false}
                            required
                        />
                        <label htmlFor="nif">NIF</label>
                    </FloatLabel>
                    {nifError && <p className={styles.errorMessage}>{nifError}</p>}
                </>
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
                    invalid={passwordError || error ? true : false}
                    required
                />
                <label htmlFor="password">Contraseña</label>
            </FloatLabel>
            {passwordError && <p className={styles.errorMessage}>{passwordError}</p>}

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
                    invalid={passwordError || error ? true : false}
                    required
                />
                <label htmlFor="repeatpassword">Repite la Contraseña</label>
            </FloatLabel>
            {passwordError && <p className={styles.errorMessage}>{passwordError}</p>}

            {error && <p className={styles.errorMessage}>{error}</p>}

            <Button type="button" label="Registrarse" className="p-button-primary" onClick={handleRegister} />

            <SuccessModal
                visible={showSuccessModal}
                onHide={handleModalClose}
                header="Registro Exitoso"
                message="Te has registrado exitosamente."
                buttonLabel="Aceptar"
                buttonClass="p-button-success"
            />
        </div>
    );
};

export default RegisterForm;
