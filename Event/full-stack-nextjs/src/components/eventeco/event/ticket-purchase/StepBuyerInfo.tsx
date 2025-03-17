"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import AuthModal from "./AuthModal";
import { Client } from "@/types/User";
import styles from "@/styles/eventeco/TicketPurchase.module.css";
import { updateUser } from "@/store/eventeco/slices/userSlice";
import { AppDispatch } from "@/store/eventeco";

const StepBuyerInfo: React.FC<{ onNext: () => void; onPrev: () => void }> = ({ onNext, onPrev }) => {
    const isAuthenticated = useSelector((state: any) => state.user.isAuthenticated);
    const userData = useSelector((state: any) => state.user.user);
    const dispatch = useDispatch<AppDispatch>();
    const toast = useRef<Toast>(null);
    console.log("userData", userData);
    const [authModalVisible, setAuthModalVisible] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            setAuthModalVisible(true);
        }
    }, [isAuthenticated]);

    const fillForm = () => {
        if (userData) {
            const form = document.querySelector(".buyerInfoForm") as HTMLFormElement;
            if (form) {
                form.firstname.value = userData.firstname || "";
                form.lastname.value = userData.lastname || "";
                form.dni.value = userData.dni || "";
                form.email.value = userData.email || "";
            }
        }
    };

    const validateForm = () => {
        const form = document.querySelector(".buyerInfoForm") as HTMLFormElement;
        if (form) {
            const fields = ["firstname", "lastname", "dni", "email", "phonenumber"];
            for (const field of fields) {
                if (!form[field].value) {
                    return false;
                }
            }
        }
        return true;
    };

    const handleNext = async () => {
        if (!isAuthenticated) {
            setAuthModalVisible(true);
            return;
        }
        if (!validateForm()) {
            toast.current?.show({
                severity: "warn",
                summary: "Campos incompletos",
                detail: "Por favor, complete todos los campos del formulario.",
                life: 3000,
            });
            return;
        }

        const form = document.querySelector(".buyerInfoForm") as HTMLFormElement;
        const updatedData = {
            firstname: form.firstname.value,
            lastname: form.lastname.value,
            dni: form.dni.value,
            email: form.email.value,
            phonenumber: form.phonenumber.value,
        } as Partial<Client>;

        console.log("updatedData", updatedData);

        try {
            await dispatch(updateUser(updatedData));
            toast.current?.show({
                severity: "success",
                summary: "Datos actualizados",
                detail: "Los datos del usuario han sido actualizados correctamente.",
                life: 3000,
            });
            onNext();
        } catch (error) {
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Hubo un error al actualizar los datos del usuario.",
                life: 3000,
            });
        }
    };

    return (
        <div className={styles.stepContainer}>
            <Toast ref={toast} />
            <div className="d-flex justify-content-start">
                <h2>Datos del Comprador</h2>
                <Button label="Llenar con datos del usuario" className="p-button-info" onClick={fillForm} />
            </div>

            <form className={`${styles.buyerInfoForm} buyerInfoForm`}>
                <div className={styles.formGroup}>
                    <label htmlFor="firstname">Nombre</label>
                    <input type="text" id="firstname" name="firstname" required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="lastname">Apellidos</label>
                    <input type="text" id="lastname" name="lastname" required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="dni">DNI</label>
                    <input type="text" id="dni" name="dni" required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required disabled />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="phonenumber">Número de Teléfono</label>
                    <input type="tel" id="phonenumber" name="phonenumber" required />
                </div>
            </form>

            <div className={styles.navigationButtons}>
                <Button label="Atrás" icon="pi pi-chevron-left" className="p-button-secondary" onClick={onPrev} />
                <Button label="Siguiente" icon="pi pi-chevron-right" className="p-button-primary" onClick={handleNext} />
            </div>

            <AuthModal visible={authModalVisible} onHide={() => setAuthModalVisible(false)} />
        </div>
    );
};

export default StepBuyerInfo;
